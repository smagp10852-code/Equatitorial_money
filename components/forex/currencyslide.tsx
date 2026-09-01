"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { currencyList } from "@/lib/currencyList";

export default function CurrencySlide() {

  const [currencies, setCurrencies] = useState<any[]>([]);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const pauseRef = useRef(false);

  /* ================= FETCH DATA ================= */

  useEffect(() => {

    async function loadRates() {

      try {

        const res = await fetch("/api/rates?from=USD");
        const data = await res.json();

        if (!data.success) return;

        const rates = data.rates || {};
        const markups = data.markups || {};

        const merged: any[] = [];
        const usdToInr = rates["INR"] || 0;

        currencyList.forEach((currency) => {

          if (currency.code === "INR") return;

          const rate = rates[currency.code];
          if (!rate) return;

          const inrValue = usdToInr / rate;
          const markup = markups[currency.code];

          const buy = inrValue + (markup?.buyMarkup || 0);
          const sell = inrValue - (markup?.sellMarkup || 0);

          merged.push({
            name: currency.name,
            buy: buy.toFixed(2),
            sell: sell.toFixed(2),
          });

        });

        setCurrencies(merged);

      } catch (err) {
        console.error("Slider rate error:", err);
      }

    }

    loadRates();

  }, []);

  const items = [...currencies, ...currencies];

  /* ================= AUTO SLIDE ================= */

  useEffect(() => {

    const track = trackRef.current;
    if (!track) return;

    const animate = () => {

      if (!pauseRef.current && trackRef.current) {

        trackRef.current.scrollLeft += 0.6;

        if (trackRef.current.scrollLeft >= trackRef.current.scrollWidth / 2) {
          trackRef.current.scrollLeft = 0;
        }

      }

      animationRef.current = requestAnimationFrame(animate);

    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };

  }, [currencies]);

  /* ================= BUTTONS ================= */

  const scrollLeft = () => {

    const track = trackRef.current;
    if (!track) return;

    pauseRef.current = true;

    track.scrollBy({
      left: -350,
      behavior: "smooth",
    });

    setTimeout(() => pauseRef.current = false, 800);

  };

  const scrollRight = () => {

    const track = trackRef.current;
    if (!track) return;

    pauseRef.current = true;

    track.scrollBy({
      left: 350,
      behavior: "smooth",
    });

    setTimeout(() => pauseRef.current = false, 800);

  };

  return (

    <div className="relative max-w-7xl mx-auto mt-4">

      {/* BUTTONS */}

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#1f6f8b] text-white p-3 rounded-full shadow"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#1f6f8b] text-white p-3 rounded-full shadow"
      >
        <ChevronRight size={20} />
      </button>

      {/* TRACK */}

      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-scroll scrollbar-none px-12"
      >

        {items.map((item, i) => (

          <div
            key={i}
            onMouseEnter={() => pauseRef.current = true}
            onMouseLeave={() => pauseRef.current = false}
            className="min-w-[220px] bg-white rounded-xl shadow-md p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border"
          >

            <h3 className="font-semibold text-[#1f4f82] text-lg">
              {item.name}
            </h3>

            <div className="mt-4 space-y-2">

              <p className="text-sm text-gray-500">
                Buy
                <span className="ml-2 bg-yellow-200 px-2 py-1 rounded font-medium">
                  {item.buy}
                </span>
              </p>

              <p className="text-sm text-gray-500">
                Sell
                <span className="ml-2 bg-yellow-200 px-2 py-1 rounded font-medium">
                  {item.sell}
                </span>
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}
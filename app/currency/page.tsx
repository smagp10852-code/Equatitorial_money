"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { currencyList } from "@/lib/currencyList";
import CurrencySection from "@/components/sections/CurrencySection";
import CurrencySlide from "@/components/forex/currencyslide";

export default function CurrencyPage() {

  const [tab, setTab] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState<string>("");

  const [from, setFrom] = useState<string>("INR");
  const [to, setTo] = useState<string>("USD");

  const [rates, setRates] = useState<Record<string, number>>({});
  const [markups, setMarkups] = useState<Record<string, any>>({});

  const [converted, setConverted] = useState<number | null>(null);

  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);

  const [loading, setLoading] = useState(false);

  const fromRef = useRef<HTMLDivElement>(null);
  const toRef = useRef<HTMLDivElement>(null);

  const selectedFrom = currencyList.find((c) => c.code === from);
  const selectedTo = currencyList.find((c) => c.code === to);

  const flagUrl = (code: string) =>
    `https://flagcdn.com/w40/${code}.png`;

  /* CLOSE DROPDOWN */

  useEffect(() => {

    function handleClickOutside(e: MouseEvent) {

      if (fromRef.current && !fromRef.current.contains(e.target as Node)) {
        setOpenFrom(false);
      }

      if (toRef.current && !toRef.current.contains(e.target as Node)) {
        setOpenTo(false);
      }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);

  }, []);

  /* FETCH RATES */

  useEffect(() => {

    async function fetchRates() {

      const baseCurrency = tab === "buy" ? to : from;

      try {

        const res = await fetch(`/api/rates?from=${baseCurrency}`);
        const data = await res.json();

        if (data.success) {

          setRates(data.rates || {});
          setMarkups(data.markups || {});

        }

      } catch (err) {

        console.error("Rate fetch error", err);

      }

    }

    fetchRates();

  }, [from, to, tab]);

  /* RATE CALCULATION */

  let finalRate: number | null = null;

const baseRate = rates["INR"];

const selectedCurrency = tab === "buy" ? to : from;

const currencyMarkup = markups[selectedCurrency];

if (baseRate) {

  if (tab === "buy") {

    finalRate = baseRate + (currencyMarkup?.buyMarkup || 0);

  } else {

    finalRate = baseRate - (currencyMarkup?.sellMarkup || 0);

  }

}

  /* CONVERT */

  const handleConvert = () => {

    if (!finalRate || !amount) return;

    setLoading(true);

    setTimeout(() => {

      setConverted(Number(amount) * finalRate);
      setLoading(false);

    }, 200);

  };

  /* TAB CHANGE */

  useEffect(() => {

    if (tab === "buy") {

      setFrom("INR");
      setTo("USD");

    } else {

      setFrom("USD");
      setTo("INR");

    }

    setConverted(null);

  }, [tab]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#0b1b5a] to-[#1e2f9f]">

      {/* HERO */}

      <section className="pt-32 pb-16 text-center text-white">

        <h1 className="text-4xl font-bold mb-4">
          Currency Exchange
        </h1>

        <p className="text-blue-200">
          Live currency conversion with real forex rates
        </p>

      </section>

      {/* CONVERTER CARD */}

      <section className="px-6 pb-20">

        <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-xl border-2 border-orange-400">

          {/* Tabs */}

          <div className="flex border-b mb-6">

            <button
              onClick={() => setTab("buy")}
              className={`flex-1 py-3 font-semibold ${
                tab === "buy"
                  ? "border-b-4 border-orange-400 text-blue-800"
                  : "text-gray-500"
              }`}
            >
              Buy Forex Cards & Currency
            </button>

            <button
              onClick={() => setTab("sell")}
              className={`flex-1 py-3 font-semibold ${
                tab === "sell"
                  ? "border-b-4 border-orange-400 text-blue-800"
                  : "text-gray-500"
              }`}
            >
              Sell Foreign Currency Notes
            </button>

          </div>

          {/* CITY */}

          <select className="w-full border rounded-lg p-3 mb-6">
            <option>Select City</option>
            <option>Kolkata</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Agartala</option>
          </select>

          {/* CURRENCY SELECT */}

          <div className="grid grid-cols-2 gap-4 mb-6">

            {/* FROM */}

            <div ref={fromRef} className="relative">

              <label className="text-sm text-gray-500">
                Currency You Have
              </label>

              <div
                onClick={() => {
                  if (tab === "sell") setOpenFrom(!openFrom);
                }}
                className={`mt-2 border rounded-lg p-3 flex justify-between ${
                  tab === "buy"
                    ? "cursor-not-allowed bg-gray-100"
                    : "cursor-pointer"
                }`}
              >

                <div className="flex items-center gap-2">

                  <img
                    src={flagUrl(selectedFrom?.countryCode || "in")}
                    className="w-5 h-4"
                  />

                  {selectedFrom?.code}

                </div>

                {tab === "sell" && <ChevronDown size={18} />}

              </div>

              {openFrom && tab === "sell" && (

                <div className="absolute w-full bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto z-50">

                  {currencyList
                    .filter((c) => c.code !== "INR")
                    .map((c) => (

                      <div
                        key={c.code}
                        onClick={() => {
                          setFrom(c.code);
                          setOpenFrom(false);
                        }}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      >

                        <img
                          src={flagUrl(c.countryCode)}
                          className="w-5 h-4"
                        />

                        {c.code}

                      </div>

                    ))}

                </div>

              )}

            </div>

            {/* TO */}

            <div ref={toRef} className="relative">

              <label className="text-sm text-gray-500">
                Currency You Want
              </label>

              <div
                onClick={() => {
                  if (tab === "buy") setOpenTo(!openTo);
                }}
                className={`mt-2 border rounded-lg p-3 flex justify-between ${
                  tab === "sell"
                    ? "cursor-not-allowed bg-gray-100"
                    : "cursor-pointer"
                }`}
              >

                <div className="flex items-center gap-2">

                  <img
                    src={flagUrl(selectedTo?.countryCode || "us")}
                    className="w-5 h-4"
                  />

                  {selectedTo?.code}

                </div>

                {tab === "buy" && <ChevronDown size={18} />}

              </div>

              {openTo && tab === "buy" && (

                <div className="absolute w-full bg-white border rounded-lg mt-1 max-h-60 overflow-y-auto z-50">

                  {currencyList
                    .filter((c) => c.code !== "INR")
                    .map((c) => (

                      <div
                        key={c.code}
                        onClick={() => {
                          setTo(c.code);
                          setOpenTo(false);
                        }}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      >

                        <img
                          src={flagUrl(c.countryCode)}
                          className="w-5 h-4"
                        />

                        {c.code}

                      </div>

                    ))}

                </div>

              )}

            </div>

          </div>

          {/* AMOUNT */}

          <input
            type="number"
            placeholder="Forex Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded-lg p-3 mb-4"
          />

          {finalRate && (

            <div className="text-sm text-gray-500 mb-4">
              Rate = ₹ {finalRate.toFixed(4)}
            </div>

          )}

          <button
            onClick={handleConvert}
            disabled={loading || !finalRate}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Calculating..." : "Convert"}
          </button>

          {converted !== null && (

            <div className="mt-6 border-t pt-4">

              <h2 className="text-xl font-bold">
                Total Amount = ₹ {converted.toFixed(2)}
              </h2>

            </div>

          )}

        </div>

      </section>

      {/* CURRENCY SLIDER */}

      <div className="mt-12 mb-12">
        <CurrencySlide />
      </div>

      {/* LIVE RATES SECTION */}

      <section className="bg-gray-100 py-20">
        <CurrencySection />
      </section>

    </div>

  );
}
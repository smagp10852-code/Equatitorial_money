"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import { currencyList, CurrencyType } from "@/lib/currencyList";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface Props {
  currency: CurrencyType;
  buyRate: number;
  sellRate: number;
  cardRate?: number;
  amount: number;
  onClose: () => void;
}

export default function ExchangeModal({
  currency,
  buyRate,
  sellRate,
  cardRate = 0,
  onClose,
}: Props) {

  const [transactionType, setTransactionType] =
    useState<"buy" | "sell" | "card">("buy");

  const [city, setCity] = useState("");

  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState(currency.code);

  const [liveRate, setLiveRate] = useState(buyRate);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    amount: "",
    address: "",
  });

  /* MOUNT GUARD — createPortal needs `document`, which doesn't
     exist during SSR. Only render the portal after the component
     has mounted in the browser. */

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* LOCK BACKGROUND SCROLL WHILE MODAL IS OPEN */

  useEffect(() => {

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };

  }, []);

  /* CLOSE ON ESC */

  useEffect(() => {

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);

  }, [onClose]);

  /* BUY / SELL / CARD LOGIC */

  useEffect(() => {

    if (transactionType === "buy") {
      setFrom("INR");
      setTo(currency.code);
      setLiveRate(buyRate);
    } else if (transactionType === "sell") {
      setFrom(currency.code);
      setTo("INR");
      setLiveRate(sellRate);
    } else {
      // card — customer pays INR to load this currency onto the card
      setFrom("INR");
      setTo(currency.code);
      setLiveRate(cardRate);
    }

  }, [transactionType, currency.code, buyRate, sellRate, cardRate]);

  /* FORM CHANGE */

  const handleChange = (e: any) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  /* SUBMIT */

  const handleSubmit = async (e: any) => {

    e.preventDefault();
    setSubmitting(true);

    /* Open a blank tab SYNCHRONOUSLY, right when the user clicks —
       before any `await`. Browsers only allow window.open() without
       being blocked when it happens directly inside a click handler.
       We fill in the real WhatsApp URL once the API responds. */

    const whatsappWindow = window.open("", "_blank");

    try {

      const res = await fetch("/api/exchange", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...formData,
          city,
          from,
          to,
          rate: liveRate,
          type: transactionType,
        }),

      });

      const data = await res.json();

      if (data.success && data.whatsapp) {

        if (whatsappWindow) {
          // reuse the tab we already opened — this one won't be blocked
          whatsappWindow.location.href = data.whatsapp;
        } else {
          // popup was blocked before we even got a handle to it —
          // fall back to redirecting the current tab instead
          window.location.href = data.whatsapp;
        }

        onClose();

      } else {

        whatsappWindow?.close();

      }

    } finally {
      setSubmitting(false);
    }

  };

  /* CURRENCY OPTIONS */

  const currencyOptions = currencyList
    .filter((c) => c.code !== "INR")
    .map((c) => ({
      value: c.code,
      label: `${c.code} - ${c.name}`,
    }));

  const cities = [
    { value: "Kolkata", label: "Kolkata" },
    { value: "Mumbai", label: "Mumbai" },
    { value: "Bengalore", label: "Bengalore" },
    { value: "Agartala", label: "Agartala" },
  ];

  if (!mounted) return null;

  const modal = (

    /* OUTER OVERLAY — rendered via portal directly under <body>,
       so it can NEVER be clipped/offset by any parent's
       overflow-hidden, transform, or positioning. */

    <div
      className="fixed inset-0 bg-black/50 z-[9999] overflow-y-auto flex justify-center items-start sm:items-center px-4 py-8"
      onClick={onClose}
    >

      {/* MODAL CARD
          - max-h-[90vh] + overflow-y-auto so a long form scrolls
            INSIDE the card instead of pushing content off-screen
          - onClick stopPropagation so clicking inside doesn't close it */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-lg relative flex flex-col max-h-[90vh] shadow-2xl"
      >

        {/* STICKY HEADER */}

        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white rounded-t-2xl z-10">

          <h3 className="text-lg font-bold">
            Currency Exchange Request
          </h3>

          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-red-500 text-xl leading-none"
          >
            ✕
          </button>

        </div>

        {/* SCROLLABLE BODY */}

        <div className="overflow-y-auto px-6 py-5">

          {/* BUY / SELL / CARD */}

          <div className="flex gap-2 mb-4">

            <button
              type="button"
              onClick={() => setTransactionType("buy")}
              className={`flex-1 py-2 rounded-lg text-sm ${
                transactionType === "buy"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Buy Currency
            </button>

            <button
              type="button"
              onClick={() => setTransactionType("sell")}
              className={`flex-1 py-2 rounded-lg text-sm ${
                transactionType === "sell"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Sell Currency
            </button>

            {cardRate > 0 && (

              <button
                type="button"
                onClick={() => setTransactionType("card")}
                className={`flex-1 py-2 rounded-lg text-sm ${
                  transactionType === "card"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Forex Card
              </button>

            )}

          </div>

          <form id="exchange-form" onSubmit={handleSubmit} className="space-y-4">

            {/* CITY */}

            <Select
              options={cities}
              placeholder="Select City"
              onChange={(s: any) => setCity(s.value)}
              menuPortalTarget={typeof window !== "undefined" ? document.body : null}
              menuPosition="fixed"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 99999 }),
              }}
            />

            {/* NAME */}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            {/* EMAIL */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            {/* MOBILE */}

            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              required
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            {/* CURRENCY SELECT */}

            <div className="grid grid-cols-2 gap-3">

              {/* FROM */}

              <div>

                {transactionType === "sell" ? (

                  <Select
                    options={currencyOptions}
                    value={currencyOptions.find(
                      (o) => o.value === from
                    )}
                    onChange={(s: any) => setFrom(s.value)}
                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                    menuPosition="fixed"
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                    }}
                  />

                ) : (

                  <div className="border p-3 rounded-lg bg-gray-100 text-gray-600">
                    INR - Indian Rupee
                  </div>

                )}

              </div>

              {/* TO */}

              <div>

                {transactionType === "buy" ? (

                  <Select
                    options={currencyOptions}
                    value={currencyOptions.find(
                      (o) => o.value === to
                    )}
                    onChange={(s: any) => setTo(s.value)}
                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                    menuPosition="fixed"
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 99999 }),
                    }}
                  />

                ) : transactionType === "sell" ? (

                  <div className="border p-3 rounded-lg bg-gray-100 text-gray-600">
                    INR - Indian Rupee
                  </div>

                ) : (

                  // card — locked to this currency, since the card
                  // rate shown is specific to it
                  <div className="border p-3 rounded-lg bg-gray-100 text-gray-600">
                    {currency.code} - {currency.name}
                  </div>

                )}

              </div>

            </div>

            {/* LIVE RATE */}

            <div className="bg-gray-100 p-3 rounded-lg text-sm">

              {transactionType === "buy" &&
                `Live Rate: 1 ${currency.code} = ₹${buyRate.toFixed(2)}`}

              {transactionType === "sell" &&
                `Live Rate: 1 ${currency.code} = ₹${sellRate.toFixed(2)}`}

              {transactionType === "card" &&
                `Forex Card Rate: 1 ${currency.code} = ₹${cardRate.toFixed(2)}`}

            </div>

            {/* AMOUNT */}

            <input
              type="number"
              name="amount"
              placeholder={
                transactionType === "card"
                  ? "How much recharge you want?"
                  : "How Much Forex Amount you want ?"
              }
              required
              onChange={handleChange}
              className="w-full border rounded-lg p-3"
            />

            {/* ADDRESS */}

            <textarea
              name="address"
              placeholder="Address"
              required
              onChange={handleChange}
              rows={3}
              className="w-full border rounded-lg p-3"
            />

          </form>

        </div>

        {/* STICKY FOOTER — submit stays reachable even on tall forms */}

        <div className="px-6 py-4 border-t sticky bottom-0 bg-white rounded-b-2xl">

          <button
            type="submit"
            form="exchange-form"
            disabled={submitting}
            className="w-full bg-green-600 text-white py-3 rounded-xl cursor-pointer hover:bg-green-700 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Submit & Send via WhatsApp"}
          </button>

        </div>

      </div>

    </div>

  );

  return createPortal(modal, document.body);

}
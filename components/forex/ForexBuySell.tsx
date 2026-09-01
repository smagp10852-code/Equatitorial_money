"use client";

import { useEffect, useState } from "react";
import { currencyList } from "@/lib/currencyList";
import { getRates } from "@/lib/currencyApi";

const cities = ["Kolkata", "Mumbai", "Hyderabad", "Other"];

type MarkupType = {
  buyMarkup: number;
  sellMarkup: number;
};

export default function ForexBuySell() {

  const [tab, setTab] = useState<"buy" | "sell">("buy");

  const [city, setCity] = useState("");

  const [from, setFrom] = useState("INR");
  const [to, setTo] = useState("USD");

  const [forexAmount, setForexAmount] = useState("");

  /* Rates are always fetched with base = INR, so both Buy & Sell
     tabs can look up any foreign currency's INR value from the
     same response — no need to refetch when tab/currency changes. */
  const [rates, setRates] = useState<Record<string, number>>({});
  const [markups, setMarkups] = useState<Record<string, MarkupType>>({});
  const [loading, setLoading] = useState(true);

  /* FETCH RATES (once, on mount) */

  useEffect(() => {

    async function fetchRates() {

      setLoading(true);

      const data = await getRates("INR");

      if (!data || !data.success) {
        setLoading(false);
        return;
      }

      setRates(data.rates);
      setMarkups(data.markups || {});
      setLoading(false);

    }

    fetchRates();

  }, []);

  /* TAB SWITCH
     Buy  -> customer gives INR, wants foreign currency (INR -> to)
     Sell -> customer gives foreign currency, wants INR (from -> INR) */

  function handleTabChange(nextTab: "buy" | "sell") {

    setTab(nextTab);
    setForexAmount("");

    if (nextTab === "buy") {
      setFrom("INR");
      setTo((prev) => (prev === "INR" ? "USD" : prev));
    } else {
      setTo("INR");
      setFrom((prev) => (prev === "INR" ? "USD" : prev));
    }

  }

  /* DERIVED RATE (with markup) — computed directly, no effect needed */

  const foreignCode = tab === "buy" ? to : from;
  const marketRate = rates[foreignCode];

  let rate = 0;

  if (marketRate) {

    // INR value of 1 unit of the foreign currency, before markup
    const baseRate = 1 / marketRate;
    const markup = markups[foreignCode];

    rate =
      tab === "buy"
        ? baseRate + (markup?.buyMarkup || 0) // customer buys -> we sell -> rate UP
        : baseRate - (markup?.sellMarkup || 0); // customer sells -> we buy -> rate DOWN

  }

  /* DERIVED TOTAL */

  const inrAmount =
    forexAmount && rate
      ? (Number(forexAmount) * rate).toFixed(2)
      : "";

  return (

    <div className="max-w-3xl mx-auto bg-white border-2 border-orange-400 rounded-xl p-6">

      {/* TABS */}

      <div className="flex border-b mb-6">

        <button
          onClick={() => handleTabChange("buy")}
          className={`flex-1 py-3 font-semibold ${
            tab === "buy"
              ? "border-b-4 border-orange-400 text-blue-800"
              : "text-gray-500"
          }`}
        >
          Buy Forex Cards & Currency
        </button>

        <button
          onClick={() => handleTabChange("sell")}
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

      <select
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4"
      >
        <option>Select City</option>

        {cities.map((c) => (
          <option key={c}>{c}</option>
        ))}

      </select>

      {/* CURRENCY ROW */}

      <div className="grid grid-cols-2 gap-4 mb-4">

        <div>

          <label className="text-sm text-gray-600">
            Currency You Have
          </label>

          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            disabled={tab === "buy"}
            className="w-full border rounded-lg p-3 mt-1 disabled:bg-gray-100"
          >

            {tab === "buy" ? (
              <option value="INR">INR - Indian Rupee</option>
            ) : (
              currencyList
                .filter((c) => c.code !== "INR")
                .map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))
            )}

          </select>

        </div>

        <div>

          <label className="text-sm text-gray-600">
            Currency You Want
          </label>

          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            disabled={tab === "sell"}
            className="w-full border rounded-lg p-3 mt-1 disabled:bg-gray-100"
          >

            {tab === "buy" ? (
              currencyList
                .filter((c) => c.code !== "INR")
                .map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} - {c.name}
                  </option>
                ))
            ) : (
              <option value="INR">INR - Indian Rupee</option>
            )}

          </select>

        </div>

      </div>

      {/* FOREX AMOUNT */}

      <input
        type="number"
        placeholder="Forex Amount"
        value={forexAmount}
        onChange={(e) => setForexAmount(e.target.value)}
        className="w-full border rounded-lg p-3 mb-4"
      />

      {/* RATE */}

      <div className="flex justify-between items-center mb-4">

        <span className="text-gray-500">
          Rate {loading && "(loading...)"}
        </span>

        <span className="font-semibold">
          ₹ {rate ? rate.toFixed(4) : "0.0000"}
        </span>

      </div>

      {/* INR AMOUNT */}

      <input
        type="text"
        placeholder="INR Amount"
        value={inrAmount}
        readOnly
        className="w-full border rounded-lg p-3 mb-4"
      />

      {/* TOTAL */}

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-4">

        <span>Total Amount</span>

        <span className="text-xl font-bold">
          ₹ {inrAmount || "0.00"}
        </span>

      </div>

      <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold">
        BOOK THIS ORDER →
      </button>

    </div>

  );

}
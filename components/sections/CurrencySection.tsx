"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getRates } from "@/lib/currencyApi";
import { currencyList } from "@/lib/currencyList";
import CurrencyRow from "@/components/ui/CurrencyRow";

const Select = dynamic(() => import("react-select"), { ssr: false });

type RatesResponse = {
  success: boolean;
  base: string;
  rates: Record<string, number>;
  markups?: Record<string, { buyMarkup: number; sellMarkup: number }>;
  lastUpdated?: string;
};

export default function CurrencySection() {

  const baseCurrency = "INR";
  const [amount] = useState(1);

  const [rates, setRates] = useState<Record<string, number>>({});
  const [markups, setMarkups] = useState<
    Record<string, { buyMarkup: number; sellMarkup: number }>
  >({});

  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const [selectedCurrencies, setSelectedCurrencies] = useState([
    "USD",
    "EUR",
    "JPY",
    "RUB",
  ]);

  /* FETCH RATES */

  useEffect(() => {
    async function fetchData() {

      const data: RatesResponse = await getRates("INR");

      if (!data || !data.success) return;

      setRates(data.rates ?? {});
      setMarkups(data.markups ?? {});
      setLastUpdated(data.lastUpdated ?? null);
    }

    fetchData();
  }, []);

  /* ADD CURRENCY */

  const handleAddCurrency = (code: string) => {

    if (
      !selectedCurrencies.includes(code) &&
      code !== baseCurrency
    ) {

      setSelectedCurrencies((prev) => [...prev, code]);

    }

  };

  /* DROPDOWN OPTIONS */

  const options = currencyList
    .filter(
      (c) =>
        !selectedCurrencies.includes(c.code) &&
        c.code !== baseCurrency
    )
    .map((currency) => ({
      value: currency.code,
      label: `${currency.name} (${currency.code})`,
      code: currency.code,
      countryCode: currency.countryCode,
    }));

  return (

    <section className="py-16 bg-[#f5f7fa] relative z-0">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl font-bold">
          Live exchange rates
        </h2>

        <p className="text-gray-500 mt-2">
          Compare 100+ currencies in real time
        </p>

        {/* TABLE HEADER */}

        <div className="grid grid-cols-4 mt-8 text-sm text-gray-500 font-medium px-2">

          <div>Currency</div>
          <div className="text-right">We Sell Rate</div>
          <div className="text-right">We Buy Rate</div>
          <div className="text-right">Action</div>

        </div>

        {/* BASE ROW */}

        <div className="bg-[#001a3d] text-white rounded-xl px-6 py-4 flex justify-between items-center mt-4">

          <div className="flex items-center gap-3">

            <img
              src="https://flagcdn.com/w40/in.png"
              className="w-8 h-8 rounded-full"
              alt="INR"
            />

            <div>
              <p className="font-medium">Indian Rupee</p>
              <p className="text-xs text-gray-300">INR</p>
            </div>

          </div>

          <div className="text-xl font-bold">
            {amount}
          </div>

        </div>

        {/* CURRENCY ROWS */}

        <div className="space-y-3 mt-4">

          {selectedCurrencies.map((code) => {

            if (code === "INR") return null;

            const currency = currencyList.find(
              (c) => c.code === code
            );

            if (!currency) return null;

            const marketRate = Number(rates?.[code] ?? 0);

            if (!marketRate) return null;

            /* CONVERT TO INR */

            const inrRate = 1 / marketRate;

            const markup = markups?.[code];

            const buyMarkup = Number(markup?.buyMarkup ?? 0);
            const sellMarkup = Number(markup?.sellMarkup ?? 0);

            const buyRate = inrRate + buyMarkup;
            const sellRate = inrRate - sellMarkup;

            return (

              <CurrencyRow
                key={code}
                currency={currency}
                buyRate={buyRate}
                sellRate={sellRate}
                amount={amount}
              />

            );

          })}

        </div>

        {/* ADD CURRENCY */}

        <div className="mt-6 w-72">

          <Select
            options={options}
            placeholder="+ Add currency"
            onChange={(selected: any) =>
              handleAddCurrency(selected?.value)
            }
            isSearchable

            /* 🔥 FIX DROPDOWN HIDE ISSUE */
            menuPortalTarget={typeof window !== "undefined" ? document.body : null}
            menuPosition="fixed"
            menuPlacement="auto"

            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />

        </div>

        {/* LAST UPDATED */}

        {lastUpdated && (

          <div className="flex justify-end mt-6 text-sm text-gray-500">

            Last updated {lastUpdated}

          </div>

        )}

      </div>

    </section>

  );

}
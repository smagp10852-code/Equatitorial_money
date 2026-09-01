"use client";

import CurrencyDropdown from "@/components/ui/CurrencyDropdown";

interface Props {
  baseCurrency: string;
  setBaseCurrency: (code: string) => void;
  amount: number;
  setAmount: (value: number) => void;
}

export default function BaseCurrencySelector({
  baseCurrency,
  setBaseCurrency,
  amount,
  setAmount,
}: Props) {
  return (
    <div className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white rounded-3xl p-10 shadow-xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">

      {/* Left */}
      <div className="flex flex-col gap-2">
        <p className="text-sm opacity-80">From</p>
        <CurrencyDropdown
          value={baseCurrency}
          onChange={setBaseCurrency}
        />
      </div>

      {/* Right */}
      <div className="flex flex-col gap-2 text-right">
        <p className="text-sm opacity-80">Amount</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="bg-transparent text-5xl font-bold text-right outline-none"
        />
      </div>
    </div>
  );
}

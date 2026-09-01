"use client";

import { CurrencyType } from "@/lib/currencyList";
import { useState } from "react";
import ExchangeModal from "@/components/ui/ExchangeModal";

interface Props {
  currency: CurrencyType;
  buyRate: number;
  sellRate: number;
  amount?: number; // optional
}

export default function CurrencyRow({
  currency,
  buyRate,
  sellRate,
  amount = 0,
}: Props) {

  const [openModal, setOpenModal] = useState(false);

  /* FORMAT RATE */

  const formattedBuy = `₹${buyRate.toFixed(2)}`;
  const formattedSell = `₹${sellRate.toFixed(2)}`;

  /* MARKET RATE */

  const marketRate = ((buyRate + sellRate) / 2).toFixed(2);

  return (
    <>
      {/* ROW CARD */}

      <div className="bg-white rounded-2xl px-6 py-4 shadow-sm hover:shadow-md transition">

        <div className="grid grid-cols-4 items-center">

          {/* CURRENCY INFO */}

          <div className="flex items-center gap-3">

            <img
              src={`https://flagcdn.com/w40/${currency.countryCode}.png`}
              className="w-8 h-8 rounded-full"
              alt={currency.code}
            />

            <div>
              <p className="font-medium text-gray-800">
                {currency.name}
              </p>

              <p className="text-xs text-gray-500">
                {currency.code}
              </p>

              <p className="text-xs text-gray-400">
                1 {currency.code} ≈ ₹{marketRate}
              </p>
            </div>

          </div>

          {/* BUY RATE */}

          <div className="text-right font-semibold text-green-600">
            {formattedBuy}
          </div>

          {/* SELL RATE */}

          <div className="text-right font-semibold text-red-600">
            {formattedSell}
          </div>

          {/* BUTTON */}

          <div className="text-right">

            <button
              onClick={() => setOpenModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
            >
              Connect
            </button>

          </div>

        </div>

      </div>

      {/* MODAL */}

      {openModal && (
        <ExchangeModal
          currency={currency}
          buyRate={buyRate}
          sellRate={sellRate}
          amount={amount}
          onClose={() => setOpenModal(false)}
        />
      )}

    </>
  );
}
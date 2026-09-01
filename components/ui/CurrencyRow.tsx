"use client";

import { CurrencyType } from "@/lib/currencyList";
import { useState } from "react";
import ExchangeModal from "@/components/ui/ExchangeModal";

interface Props {
  currency: CurrencyType;
  buyRate: number;
  sellRate: number;
  cardRate: number;
  amount?: number; // optional
}

export default function CurrencyRow({
  currency,
  buyRate,
  sellRate,
  cardRate,
  amount = 0,
}: Props) {

  const [openModal, setOpenModal] = useState(false);

  /* FORMAT RATE */

  const formattedBuy = `₹${buyRate.toFixed(2)}`;
  const formattedSell = `₹${sellRate.toFixed(2)}`;
  const formattedCard = `₹${cardRate.toFixed(2)}`;

  /* MARKET RATE */

  const marketRate = ((buyRate + sellRate) / 2).toFixed(2);

  return (
    <>
      {/* ROW CARD */}

      <div className="bg-white rounded-2xl px-4 sm:px-6 py-4 shadow-sm hover:shadow-md transition">

        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-5 sm:items-center sm:gap-0">

          {/* CURRENCY INFO */}

          <div className="flex items-center gap-3">

            <img
              src={`https://flagcdn.com/w40/${currency.countryCode}.png`}
              className="w-8 h-8 rounded-full shrink-0"
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

          {/* RATES — side-by-side pair on mobile (with labels since the
              table header is hidden there), plain right-aligned columns
              on desktop (contents so they slot into the 5-col grid) */}

          <div className="grid grid-cols-2 gap-3 sm:contents">

            {/* BUY RATE */}

            <div className="bg-gray-50 rounded-lg px-3 py-2 sm:bg-transparent sm:p-0 sm:text-right">
              <p className="text-xs text-gray-400 sm:hidden">We Sell</p>
              <p className="font-semibold text-green-600">
                {formattedBuy}
              </p>
            </div>

            {/* SELL RATE */}

            <div className="bg-gray-50 rounded-lg px-3 py-2 sm:bg-transparent sm:p-0 sm:text-right">
              <p className="text-xs text-gray-400 sm:hidden">We Buy</p>
              <p className="font-semibold text-red-600">
                {formattedSell}
              </p>
            </div>

          </div>

          {/* FOREX CARD RATE */}

          <div className="bg-blue-50 rounded-lg px-3 py-2 sm:bg-transparent sm:p-0 sm:text-right">
            <p className="text-xs text-gray-400 sm:hidden">Forex Card</p>
            <p className="font-semibold text-blue-600">
              {formattedCard}
            </p>
          </div>

          {/* BUTTON */}

          <div className="sm:text-right">

            <button
              onClick={() => setOpenModal(true)}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 sm:py-2 rounded-lg text-sm transition"
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
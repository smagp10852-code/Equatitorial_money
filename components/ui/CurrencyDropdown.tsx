"use client";

import dynamic from "next/dynamic";
import { currencyList } from "@/lib/currencyList";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface Props {
  value: string;
  onChange: (code: string) => void;
}

export default function CurrencyDropdown({ value, onChange }: Props) {
  const options = currencyList.map((currency) => ({
    value: currency.code,
    label: currency.name,
    code: currency.code,
    countryCode: currency.countryCode,
  }));

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={(selected: any) => onChange(selected?.value || "")}
      isSearchable
      placeholder="Select currency"
      className="w-full"

      /* 🔥 IMPORTANT FIX */
      menuPortalTarget={typeof window !== "undefined" ? document.body : null}
      menuPosition="fixed"
      menuPlacement="auto"

      formatOptionLabel={(option: any) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200">
            <img
              src={`https://flagcdn.com/w40/${option.countryCode}.png`}
              alt={option.code}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <p className="font-medium text-gray-900">{option.label}</p>
            <p className="text-xs text-gray-500">{option.code}</p>
          </div>
        </div>
      )}

      styles={{
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
        }),

        control: (base) => ({
          ...base,
          backgroundColor: "transparent",
          borderRadius: "16px",
          padding: "4px",
          border: "1px solid #e5e7eb",
          boxShadow: "none",
          cursor: "pointer",
        }),

        menu: (base) => ({
          ...base,
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          zIndex: 9999,
        }),

        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "#2563eb"
            : state.isFocused
            ? "#eff6ff"
            : "#ffffff",
          color: state.isSelected ? "#ffffff" : "#111827",
          padding: "12px 16px",
          cursor: "pointer",
        }),

        singleValue: (base) => ({
          ...base,
          color: "#111827",
          fontWeight: 600,
        }),

        dropdownIndicator: (base) => ({
          ...base,
          color: "#6b7280",
        }),

        indicatorSeparator: () => ({
          display: "none",
        }),
      }}
    />
  );
}
"use client";

import { useState, useMemo } from "react";
import TourCard from "@/components/cards/TourCard";

export default function PackagesClient({ data }: any) {
  if (!data) return null;

  const { tours = [], countries = [], states = [] } = data;

  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All"); // ✅ NEW
  const [maxPrice, setMaxPrice] = useState("");

  const resetFilters = () => {
    setSearch("");
    setSelectedCountry("All");
    setSelectedState("All");
    setSelectedCategory("All"); // ✅ RESET
    setMaxPrice("");
  };

  /* ================= FILTER STATES ================= */
  const filteredStates = useMemo(() => {
    if (selectedCountry === "All") return states;
    return states.filter(
      (state: any) => state.country?.name === selectedCountry
    );
  }, [selectedCountry, states]);

  /* ================= FILTER TOURS ================= */
  const filteredTours = useMemo(() => {
    return tours.filter((tour: any) => {
      return (
        (search === "" ||
          tour.title.toLowerCase().includes(search.toLowerCase())) &&
        (selectedCountry === "All" ||
          tour.country?.name === selectedCountry) &&
        (selectedState === "All" ||
          tour.state?.name === selectedState) &&
        (selectedCategory === "All" ||
          tour.category === selectedCategory.toLowerCase()) && // ✅ FILTER
        (maxPrice === "" || tour.price <= Number(maxPrice))
      );
    });
  }, [
    search,
    selectedCountry,
    selectedState,
    selectedCategory,
    maxPrice,
    tours,
  ]);

  return (
    <div>

      {/* ================= FILTER CARD ================= */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-16 border border-gray-100">

        <div className="grid md:grid-cols-6 gap-5">

          {/* Search */}
          <input
            type="text"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none"
          />

          {/* Country */}
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState("All");
            }}
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none"
          >
            <option value="All">All Countries</option>
            {countries.map((c: any) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>

          {/* State */}
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none"
          >
            <option value="All">All States</option>
            {filteredStates.map((s: any) => (
              <option key={s._id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Category (NEW) */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Trending">Trending</option>
            <option value="Popular">Popular</option>
          </select>

          {/* Max Price */}
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-3 outline-none"
          />

          {/* Reset */}
          <button
            onClick={resetFilters}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition"
          >
            Reset
          </button>

        </div>
      </div>

      {/* ================= RESULT COUNT ================= */}
      <p className="mb-8 text-gray-600 font-medium">
        Showing {filteredTours.length} tour(s)
      </p>

      {/* ================= EMPTY STATE ================= */}
      {filteredTours.length === 0 && (
        <div className="text-center py-20">
          <h3 className="text-xl font-semibold mb-4">
            No Tours Found
          </h3>
          <button
            onClick={resetFilters}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* ================= TOURS GRID ================= */}
      {filteredTours.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {filteredTours.map((tour: any) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
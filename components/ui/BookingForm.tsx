"use client";

import { useState } from "react";

export default function BookingForm({ price, tourTitle }: any) {

  const [people, setPeople] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setMonth] = useState("January");
  const [query, setQuery] = useState("");

  const increase = () => setPeople((prev) => prev + 1);
  const decrease = () => {
    if (people > 1) setPeople((prev) => prev - 1);
  };

  const totalPrice = price * people;

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log({
      tour: tourTitle,
      name,
      email,
      phone,
      people,
      month,
      query,
      totalPrice,
    });

    alert("Enquiry Submitted Successfully!");
  };

  return (
    <div className="bg-white border p-8 rounded-3xl shadow-2xl h-fit sticky top-24">

      {/* Price */}
      <h3 className="text-3xl font-bold mb-1">
        ₹{price.toLocaleString()}
      </h3>
      <p className="text-gray-500 mb-6">
        Total: ₹{totalPrice.toLocaleString()}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-yellow-300 outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-yellow-300 outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98765 43210"
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-yellow-300 outline-none"
          />
        </div>

        {/* Number of People */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Number of People
          </label>

          <div className="flex items-center justify-between border rounded-xl px-6 py-3 bg-gray-50">

            <button
              type="button"
              onClick={decrease}
              className="text-2xl font-bold text-gray-700 hover:text-black"
            >
              −
            </button>

            <span className="text-xl font-semibold">
              {people}
            </span>

            <button
              type="button"
              onClick={increase}
              className="text-2xl font-bold text-gray-700 hover:text-black"
            >
              +
            </button>

          </div>
        </div>

        {/* Month Dropdown */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Month of Travel
          </label>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-yellow-300 outline-none"
          >
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
        </div>

        {/* Query */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Query
          </label>
          <textarea
            rows={3}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Write your query here..."
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-yellow-300 outline-none"
          />
        </div>

        {/* Submit */}
        <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-3 rounded-xl font-semibold shadow-md hover:opacity-90 transition">
          Enquire Now
        </button>

      </form>
    </div>
  );
}

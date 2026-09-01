"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  review: string;
  rating: number;
  reviewsCount: number;
  time: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Parul Singh",
    review:
      "Best forex service in the city! The exchange rate was very competitive and the entire process was smooth and transparent. Highly satisfied with their quick response and professional approach.",
    rating: 5,
    reviewsCount: 12,
    time: "3 months ago",
  },
  {
    id: 2,
    name: "Anzu Chaudhary",
    review:
      "I exchanged currency for my international trip and got a much better rate compared to banks. The staff was extremely helpful and guided me properly about documentation and limits.",
    rating: 5,
    reviewsCount: 18,
    time: "2 months ago",
  },
  {
    id: 3,
    name: "Rahul Sharma",
    review:
      "Very reliable and trustworthy forex partner. The transaction was completed quickly and safely. I appreciate their transparency in rates and zero hidden charges.",
    rating: 5,
    reviewsCount: 9,
    time: "1 month ago",
  },
  {
    id: 4,
    name: "Sneha Verma",
    review:
      "Excellent customer service and genuine exchange rates. I have used their services multiple times for travel currency and international payments. Always a smooth experience.",
    rating: 5,
    reviewsCount: 14,
    time: "3 weeks ago",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-[#f3f1ec]">
      <div className="container mx-auto px-6 text-center">

        <p className="text-sm tracking-widest text-yellow-600 uppercase">
          Client Reviews
        </p>

        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#0f172a] mt-3">
          What Our Clients Say
        </h2>

        <div className="mt-12 flex justify-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl transition-all duration-700">

            <div className="text-yellow-600 text-5xl mb-6">“</div>

            <p className="text-lg md:text-xl italic text-gray-700 leading-relaxed">
              {testimonials[current].review}
            </p>

            {/* Stars */}
            <div className="flex justify-center mt-6">
              {[...Array(testimonials[current].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>

            {/* User Info */}
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center font-semibold">
                {testimonials[current].name.charAt(0)}
              </div>

              <div className="text-left">
                <p className="font-semibold text-gray-900">
                  {testimonials[current].name}
                </p>
                <p className="text-sm text-gray-500">
                  {testimonials[current].reviewsCount} reviews •{" "}
                  {testimonials[current].time}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-6 bg-yellow-600"
                  : "w-2 bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
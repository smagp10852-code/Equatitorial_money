"use client";

import { useState } from "react";
import TourCard from "@/components/cards/TourCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Tour {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  duration: string;
  shortDescription: string;
  mainImage: any;
  category?: string;
}

export default function ToursSlider({ tours }: { tours: Tour[] }) {
  const [filter, setFilter] = useState("all");

  const filteredTours =
    filter === "all"
      ? tours
      : tours.filter((tour) => tour.category === filter);

  return (
    <section className="py-20 bg-gray-50">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Our Curated Journeys
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {["all", "trending", "popular"].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-6 py-2 rounded-full capitalize transition text-sm font-medium ${
                filter === item
                  ? "bg-yellow-500 text-white shadow-md"
                  : "bg-white border border-gray-200 hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          navigation
          loop={filteredTours.length > 3}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
        >
          {filteredTours.map((tour) => (
            <SwiperSlide key={tour._id}>
              <TourCard tour={tour} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
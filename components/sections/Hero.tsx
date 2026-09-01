"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

import "swiper/css";

export default function Hero({ slides }: { slides: any[] }) {

  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-[70vh] md:h-[60vh] overflow-hidden">

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000 }}
        loop
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full"
      >
        {slides.map((slide, index) => (

          <SwiperSlide key={index}>

            <div className="relative h-[70vh] md:h-[60vh] flex items-center justify-center text-white overflow-hidden">

              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="relative text-center px-6 max-w-5xl z-10">

                <p className="text-yellow-400 text-2xl sm:text-3xl md:text-4xl mb-3 italic font-light tracking-wide">
                  {slide.subtitle}
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.1] tracking-tight">
                  {slide.title}
                </h1>

                <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto">
                  {slide.description}
                </p>

                {/* Buttons — smaller, compact sizing */}
                <div className="mt-6 flex gap-3 sm:gap-4 justify-center">

                  <Link
                    href="/currency"
                    className="px-5 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition rounded"
                  >
                    {slide.primaryBtnText}
                  </Link>

                  <Link
                    href="/contact"
                    className="px-5 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base border border-white hover:bg-white hover:text-black transition rounded"
                  >
                    {slide.secondaryBtnText}
                  </Link>

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}
      </Swiper>

      {/* Arrows — small circular buttons on mobile, bigger on desktop,
          with a semi-transparent background so they read as controls
          instead of floating raw icons that clash with the text */}

      <button
        onClick={() => swiperRef.current?.slidePrev()}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-1.5 sm:p-2 md:p-3 transition"
      >
        <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-1.5 sm:p-2 md:p-3 transition"
      >
        <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">

        {slides.map((_, index) => (

          <button
            key={index}
            onClick={() => swiperRef.current?.slideToLoop(index)}
            className={`w-3 h-3 rounded-full ${
              activeIndex === index
                ? "bg-yellow-400 scale-125"
                : "bg-white/50"
            }`}
          />

        ))}

      </div>

    </section>
  );
}
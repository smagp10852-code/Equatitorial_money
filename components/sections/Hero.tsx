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
    <section className="relative h-[75vh] overflow-hidden">

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

            <div className="relative h-[75vh] flex items-center justify-center text-white overflow-hidden">

              {/* Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40" />

              {/* Content */}
              <div className="relative text-center px-6 max-w-5xl z-10">

                <p className="text-yellow-400 text-4xl md:text-5xl mb-4 italic font-light tracking-wide">
                  {slide.subtitle}
                </p>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] tracking-tight">
                  {slide.title}
                </h1>

                <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  {slide.description}
                </p>

                {/* Buttons */}
                <div className="mt-10 flex gap-5 justify-center">

                  <Link
                    href="/currency"
                    className="px-10 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition rounded"
                  >
                    {slide.primaryBtnText}
                  </Link>

                  <Link
                    href="/contact"
                    className="px-10 py-3 border border-white hover:bg-white hover:text-black transition rounded"
                  >
                    {slide.secondaryBtnText}
                  </Link>

                </div>

              </div>

            </div>

          </SwiperSlide>

        ))}
      </Swiper>

      {/* Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-white z-30"
      >
        <ChevronLeft size={50} />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-8 top-1/2 -translate-y-1/2 text-white z-30"
      >
        <ChevronRight size={50} />
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
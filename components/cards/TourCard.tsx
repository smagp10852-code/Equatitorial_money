import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanity.image";

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

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <div
      className="group bg-white rounded-3xl
                 border border-gray-100
                 shadow-md
                 transition-all duration-500 ease-out
                 hover:shadow-2xl
                 hover:-translate-y-2
                 flex flex-col
                 w-full
                 min-h-[540px]"
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-[260px] w-full overflow-hidden rounded-t-3xl">
        <Image
          src={urlFor(tour.mainImage).url()}
          alt={tour.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t 
                        from-black/60 via-black/20 to-transparent" />

        {/* Category Badge */}
        {tour.category && (
          <div
            className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full shadow capitalize
            ${
              tour.category === "popular"
                ? "bg-red-500 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            {tour.category}
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 px-6 pt-6 flex flex-col">

        {/* Duration */}
        <span className="inline-block mb-3 bg-gray-100 text-xs font-semibold px-3 py-1 rounded-full w-fit">
          {tour.duration}
        </span>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-3 line-clamp-2 min-h-[52px] leading-snug">
          {tour.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 min-h-[60px]">
          {tour.shortDescription}
        </p>

        {/* Price */}
        <div className="mt-5 text-xl font-bold text-[#F0B100]">
          ₹{tour.price?.toLocaleString()}
        </div>
      </div>

      {/* ================= BUTTON ================= */}
      <div className="px-6 pb-6 mt-auto">
        <Link
          href={`/packages/${tour.slug.current}`}
          className="w-full flex items-center justify-center gap-2
                     bg-[#F0B100] text-white
                     py-3 rounded-full
                     font-semibold text-sm
                     transition-all duration-300
                     hover:bg-[#d89f00]
                     hover:gap-3
                     shadow-md hover:shadow-lg"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
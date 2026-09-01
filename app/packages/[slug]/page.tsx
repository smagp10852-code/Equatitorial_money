import { sanityClient } from "@/lib/sanity.client";
import { urlFor } from "@/lib/sanity.image";
import Image from "next/image";
import { notFound } from "next/navigation";
import BookingForm from "@/components/ui/BookingForm";

const query = `
*[_type == "tour" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  galleryImages,
  overview,
  price,
  duration,
  highlights,
  itinerary[]{
    day,
    details
  },
  inclusions,
  exclusions
}
`;

interface Itinerary {
  day: string;
  details: string;
}

interface Tour {
  _id: string;
  title: string;
  mainImage?: any;
  galleryImages?: any[];
  overview?: string;
  price?: number;
  duration?: string;
  highlights?: string[];
  itinerary?: Itinerary[];
  inclusions?: string[];
  exclusions?: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TourDetails({ params }: PageProps) {

  const { slug } = await params;

  if (!slug) return notFound();

  const tour: Tour = await sanityClient.fetch(query, { slug });

  if (!tour) return notFound();

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 text-black">

      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[75vh]">
        {tour.mainImage && (
          <Image
            src={urlFor(tour.mainImage).url()}
            alt={tour.title}
            fill
            className="object-cover"
            priority
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {tour.title}
          </h1>

          <div className="flex gap-4">
            {tour.duration && (
              <span className="bg-white/20 backdrop-blur px-6 py-2 rounded-full">
                {tour.duration}
              </span>
            )}

            {tour.price && (
              <span className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold shadow-lg">
                ₹{tour.price.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-3 gap-16">

        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-24">

          {/* -------- GALLERY -------- */}
          {tour.galleryImages && tour.galleryImages.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Gallery</h2>

              <div className="grid grid-cols-2 gap-4">
                {tour.galleryImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative h-52 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    <Image
                      src={urlFor(img).url()}
                      alt="Gallery"
                      fill
                      className="object-cover hover:scale-110 transition duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------- OVERVIEW -------- */}
          {tour.overview && (
            <section>
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {tour.overview}
              </p>
            </section>
          )}

          {/* -------- HIGHLIGHTS -------- */}
          {tour.highlights && tour.highlights.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold mb-8">Highlights</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {tour.highlights.map((item, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-2xl shadow-sm hover:shadow-lg transition text-gray-800"
                  >
                    ✓ {item}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------- ITINERARY -------- */}
          {tour.itinerary && tour.itinerary.length > 0 && (
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 p-10 rounded-3xl border border-gray-200">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Tour Itinerary
              </h2>

              <div className="space-y-6">
                {tour.itinerary.map((day, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold">
                        {day.day}
                      </h3>

                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
                        Day {i + 1}
                      </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {day.details}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* -------- INCLUSIONS & EXCLUSIONS -------- */}
          <section className="grid md:grid-cols-2 gap-10">

            {/* Inclusions */}
            {tour.inclusions && tour.inclusions.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-8 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-green-700">
                  ✓ Inclusions
                </h2>

                <ul className="space-y-3 text-gray-800">
                  {tour.inclusions.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-bold text-green-600">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exclusions */}
            {tour.exclusions && tour.exclusions.length > 0 && (
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border border-red-200 p-8 rounded-3xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-red-700">
                  ✕ Exclusions
                </h2>

                <ul className="space-y-3 text-gray-800">
                  {tour.exclusions.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-bold text-red-600">✕</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </section>

        </div>

        {/* RIGHT SIDE BOOKING CARD (Sticky) */}
<div className="lg:sticky lg:top-32 h-fit">
  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-3xl shadow-2xl p-6">
    <BookingForm price={tour.price} />
  </div>
</div>

      </section>
    </div>
  );
}
import { sanityClient } from "@/lib/sanity.client";
import PackagesClient from "./PackagesClient";

const query = `
{
  "tours": *[_type == "tour"]{
    _id,
    title,
    slug,
    shortDescription,
    duration,
    price,
    mainImage,
    category,   
    state->{
      _id,
      name,
      slug
    },
    country->{
      _id,
      name,
      slug
    }
  },
  "countries": *[_type == "country"]{
    _id,
    name
  },
  "states": *[_type == "state"]{
    _id,
    name,
    country->{
      name
    }
  }
}
`;

export default async function PackagesPage() {
  const data = await sanityClient.fetch(query);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      
     <section className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#2563eb] pt-28 pb-20 text-white">
  <div className="max-w-5xl mx-auto pb-10 text-center">

    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
      Discover Your Perfect Journey
    </h1>

    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
      Explore curated India and International tours crafted for unforgettable experiences.
    </p>

  </div>
</section>

      {/* CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        <PackagesClient data={data} />
      </div>


    </div>
  );
}

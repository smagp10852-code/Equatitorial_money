import { sanityClient } from "@/lib/sanity.client";
import { heroQuery } from "@/lib/queries";

import Hero from "@/components/sections/Hero";
import CurrencySlide from "@/components/forex/currencyslide";
import HomeAbout from "@/components/sections/HomeAbout";
import CurrencySection from "@/components/sections/CurrencySection";
import Testimonials from "@/components/sections/Testimonials";

export default async function Home() {

  const slides = await sanityClient.fetch(heroQuery);

  return (
    <main>

      <Hero slides={slides} />

      <section className="bg-[#001A3D] py-10">
        <CurrencySlide />
      </section>

      <HomeAbout />

      <CurrencySection />

      <Testimonials />

    </main>
  );
}
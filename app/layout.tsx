import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTA from "@/components/sections/CTA";

/* ✅ NEW IMPORTS */
import ScrollToTop from "@/components/ui/ScrollToTop";
import FloatingContact from "@/components/ui/FloatingContact";

import {
  Playfair_Display,
  Poppins,
  Great_Vibes,
} from "next/font/google";

/* ================= FRESH SANITY DATA =================
   Without this, Next.js statically builds pages/layout at
   deploy time and bakes in whatever Sanity content existed
   THEN. New content added in Studio after that (Hero Slides,
   Country/State lists in Navbar, etc.) won't show up until
   the next deploy. This makes the whole app re-check Sanity
   every 60s instead, without needing a manual redeploy each
   time content changes. */

export const revalidate = 60;

/* ================= FONTS ================= */

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-greatvibes",
});

/* ================= SEO ================= */

export const metadata: Metadata = {
  title: "TourX - Luxury Travel Experiences",
  description:
    "Discover curated India and International luxury travel experiences with TourX.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`
          ${playfair.variable}
          ${poppins.variable}
          ${greatVibes.variable}
          font-[var(--font-poppins)]
          antialiased
          bg-white
          text-gray-900
          flex
          flex-col
          min-h-screen
          overflow-x-hidden
        `}
      >
        <Navbar />

        <main className="flex-grow w-full overflow-x-hidden pt-[112px]">
          {children}
        </main>

        <CTA />

        <Footer />

        {/* ✅ FLOATING BUTTONS ADDED */}
        <ScrollToTop />
        <FloatingContact />
      </body>
    </html>
  );
}
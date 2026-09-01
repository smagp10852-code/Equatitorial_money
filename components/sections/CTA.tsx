// "use client";

// import Link from "next/link";

// export default function CTA() {
//   return (
//     <section className="relative py-20 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">

//       {/* Background Glow */}
//       <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
//       <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

//       <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

//         {/* Heading */}
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
//           Ready To Plan Your Next <span className="text-yellow-400">Dream Trip?</span>
//         </h2>

//         {/* Subtext */}
//         <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
//           Discover unforgettable destinations, seamless bookings, and the best
//           travel experiences curated just for you. Let’s turn your travel dreams into reality.
//         </p>

//         {/* Buttons */}
//         <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-5">

//           {/* Primary Button */}
//           <Link
//             href="/contact"
//             className="px-8 py-3 rounded-full bg-yellow-500 text-black font-semibold text-sm md:text-base
//                        transition-all duration-300 hover:bg-yellow-400 hover:scale-105 shadow-lg"
//           >
//             Book Your Tour →
//           </Link>

//           {/* Secondary Button */}
//           <Link
//             href="/tours"
//             className="px-8 py-3 rounded-full border border-white text-white font-semibold text-sm md:text-base
//                        transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
//           >
//             Explore Packages
//           </Link>

//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          Need <span className="text-yellow-400">Foreign Currency</span> at the Best Rates?
        </h2>

        {/* Subtext */}
        <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
          Exchange foreign currency quickly and securely with competitive
          market rates. RBI-compliant service with fast processing
          and trusted support for all your forex needs.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-5">

          {/* Primary Button */}
          <Link
            href="/currency"
            className="px-8 py-3 rounded-full bg-yellow-500 text-black font-semibold text-sm md:text-base
                       transition-all duration-300 hover:bg-yellow-400 hover:scale-105 shadow-lg"
          >
            Exchange Currency →
          </Link>

          {/* Secondary Button */}
          <Link
            href="/contact"
            className="px-8 py-3 rounded-full border border-white text-white font-semibold text-sm md:text-base
                       transition-all duration-300 hover:bg-white hover:text-black hover:scale-105"
          >
            Contact Forex Expert
          </Link>

        </div>
      </div>
    </section>
  );
}
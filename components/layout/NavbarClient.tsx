// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X, ChevronDown } from "lucide-react";

// export default function NavbarClient({
//   indiaStates,
//   internationalCountries,
// }: {
//   indiaStates: any[];
//   internationalCountries: any[];
// }) {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
//   const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);

//   return (
//     <header className="fixed top-0 left-0 w-full z-50">

//       {/* ================= TOP BAR ================= */}
//       <div className="bg-yellow-500 text-black text-xs sm:text-sm py-2">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between">
//           <span>📧 equatorialtoursnmoney@yahoo.com</span>
//           <span>📞 +91 8981139988</span>
//         </div>
//       </div>

//       {/* ================= MAIN NAV ================= */}
//       <nav className="bg-[#0e2240] dark:bg-slate-900 text-white transition-colors duration-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80px] flex items-center justify-between">

//           {/* LOGO */}
//           <Link href="/" className="flex-shrink-0">
//             <div className="flex flex-col leading-tight">
//               <span className="text-2xl sm:text-3xl font-serif font-bold text-white">
//                 Equatorial
//               </span>

//               <span className="text-lg sm:text-xl font-serif font-semibold text-yellow-400 -mt-1">
//                 Tours & Money Changers Pvt. Ltd.
//               </span>

//               <span className="text-[11px] text-gray-300 mt-1 tracking-wide">
//                 An Equatorial Company
//               </span>
//             </div>
//           </Link>

//           {/* DESKTOP MENU */}
//           <div className="hidden lg:flex items-center gap-10">

//             <div className="flex items-center gap-8 text-sm">

//               <Link href="/" className="hover:text-yellow-400 transition">
//                 HOME
//               </Link>

//               <Link href="/about" className="hover:text-yellow-400 transition">
//                 ABOUT
//               </Link>

//               {/* INTERNATIONAL */}
//               {/* <div
//                 className="relative"
//                 onMouseEnter={() => setOpenDesktopMenu("international")}
//                 onMouseLeave={() => setOpenDesktopMenu(null)}
//               >
//                 <button className="flex items-center gap-1 hover:text-yellow-400 transition">
//                   INTERNATIONAL <ChevronDown size={16} />
//                 </button>

//                 {openDesktopMenu === "international" && (
//                   <div className="absolute left-0 top-full bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 p-6 w-72 shadow-xl rounded-lg">
//                     {internationalCountries?.map((country) => (
//                       <Link
//                         key={country.slug}
//                         href={`/destinations/${country.slug}`}
//                         className="block hover:text-yellow-500 py-1 transition"
//                       >
//                         {country.name}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div> */}

//               {/* INDIA */}
//               {/* <div
//                 className="relative"
//                 onMouseEnter={() => setOpenDesktopMenu("india")}
//                 onMouseLeave={() => setOpenDesktopMenu(null)}
//               >
//                 <button className="flex items-center gap-1 hover:text-yellow-400 transition">
//                   INDIA <ChevronDown size={16} />
//                 </button>

//                 {openDesktopMenu === "india" && (
//                   <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 p-8 max-w-6xl w-[95vw] lg:w-[900px] shadow-2xl rounded-lg">
//                     <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
//                       {indiaStates?.map((state) => (
//                         <Link
//                           key={state.slug}
//                           href={`/destinations/${state.slug}`}
//                           className="hover:text-yellow-500 transition"
//                         >
//                           {state.name}
//                         </Link>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div> */}

//               {/* <Link href="/packages" className="hover:text-yellow-400 transition">
//                 TOURS
//               </Link> */}

//               <Link href="/contact" className="hover:text-yellow-400 transition">
//                 CONTACT
//               </Link>

//             </div>

//             {/* DESKTOP CURRENCY BUTTON */}
//             <Link
//               href="/currency"
//               className="bg-yellow-500 text-black px-6 py-2 font-semibold rounded-md hover:bg-yellow-600 transition whitespace-nowrap"
//             >
//               Currency Exchange
//             </Link>

//           </div>

//           {/* ✅ MOBILE RIGHT SECTION (Forex + Toggle) */}
//           <div className="lg:hidden flex items-center gap-3">

//             <Link
//               href="/currency"
//               className="bg-yellow-500 text-black px-4 py-2 text-sm font-semibold rounded-md hover:bg-yellow-600 transition whitespace-nowrap"
//             >
//               Currency Exchange
//             </Link>

//             <button
//               className="text-white"
//               onClick={() => setMobileOpen(!mobileOpen)}
//             >
//               {mobileOpen ? <X size={26} /> : <Menu size={26} />}
//             </button>

//           </div>

//         </div>

//         {/* ================= MOBILE MENU ================= */}
//         {mobileOpen && (
//           <div className="lg:hidden bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 px-6 py-10 space-y-6 shadow-lg">

//             <Link href="/" onClick={() => setMobileOpen(false)} className="block text-base">
//               HOME
//             </Link>

//             <Link href="/about" onClick={() => setMobileOpen(false)} className="block text-base">
//               ABOUT
//             </Link>

//             {/* INTERNATIONAL */}
//             <div>
//               <button
//                 onClick={() =>
//                   setOpenMobileMenu(
//                     openMobileMenu === "international" ? null : "international"
//                   )
//                 }
//                 className="w-full flex justify-between items-center text-base"
//               >
//                 <span>INTERNATIONAL</span>
//                 <span>{openMobileMenu === "international" ? "−" : "+"}</span>
//               </button>

//               {openMobileMenu === "international" && (
//                 <div className="mt-3 space-y-2 text-sm pl-4">
//                   {internationalCountries?.map((country) => (
//                     <Link
//                       key={country.slug}
//                       href={`/destinations/${country.slug}`}
//                       onClick={() => setMobileOpen(false)}
//                       className="block opacity-80 hover:opacity-100 transition"
//                     >
//                       {country.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* INDIA */}
//             <div>
//               <button
//                 onClick={() =>
//                   setOpenMobileMenu(
//                     openMobileMenu === "india" ? null : "india"
//                   )
//                 }
//                 className="w-full flex justify-between items-center text-base"
//               >
//                 <span>INDIA</span>
//                 <span>{openMobileMenu === "india" ? "−" : "+"}</span>
//               </button>

//               {openMobileMenu === "india" && (
//                 <div className="mt-3 space-y-2 text-sm pl-4 max-h-60 overflow-y-auto">
//                   {indiaStates?.map((state) => (
//                     <Link
//                       key={state.slug}
//                       href={`/destinations/${state.slug}`}
//                       onClick={() => setMobileOpen(false)}
//                       className="block opacity-80 hover:opacity-100 transition"
//                     >
//                       {state.name}
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <Link href="/packages" onClick={() => setMobileOpen(false)} className="block text-base">
//               TOURS
//             </Link>

//             <Link href="/contact" onClick={() => setMobileOpen(false)} className="block text-base">
//               CONTACT
//             </Link>

//           </div>
//         )}
//       </nav>
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

type Props = {
  indiaStates: any[];
  internationalCountries: any[];
};

export default function NavbarClient({
  indiaStates,
  internationalCountries,
}: Props) {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50">

      {/* ================= TOP BAR ================= */}
      <div className="bg-yellow-500 text-black text-xs sm:text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between">
          <span>📧 equatorialtoursnmoney@yahoo.com</span>
          <span>📞 +91 8981139988</span>
        </div>
      </div>

      {/* ================= NAVBAR ================= */}
      <nav className="bg-[#0e2240] text-white">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80px] flex items-center justify-between">

          {/* LOGO */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col leading-tight">
              <span className="text-2xl sm:text-3xl font-serif font-bold">
                Equatorial
              </span>

              <span className="text-lg sm:text-xl font-serif font-semibold text-yellow-400 -mt-1">
                Tours & Money Changers Pvt. Ltd.
              </span>

              <span className="text-[11px] text-gray-300 mt-1 tracking-wide">
                An Equatorial Company
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden lg:flex items-center gap-10 text-sm">

            <Link href="/" className="hover:text-yellow-400 transition">
              HOME
            </Link>

            <Link href="/about" className="hover:text-yellow-400 transition">
              ABOUT
            </Link>

            <Link href="/contact" className="hover:text-yellow-400 transition">
              CONTACT
            </Link>

            {/* Highlight Button */}
            <Link
              href="/currency"
              className="bg-yellow-500 text-black px-6 py-2 font-semibold rounded-md hover:bg-yellow-600 transition"
            >
              Currency Exchange
            </Link>

          </div>

          {/* ================= MOBILE TOGGLE ================= */}
          <div className="lg:hidden">

            <button
              className="text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

          </div>

        </div>

        {/* ================= MOBILE MENU ================= */}
        {mobileOpen && (
          <div className="lg:hidden bg-white text-gray-900 px-6 py-8 space-y-6 shadow-lg">

            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block text-base"
            >
              HOME
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block text-base"
            >
              ABOUT
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-base"
            >
              CONTACT
            </Link>

            {/* Currency Highlight Button LAST */}
            <Link
              href="/currency"
              onClick={() => setMobileOpen(false)}
              className="block bg-yellow-500 text-black px-5 py-3 rounded-md text-center font-semibold hover:bg-yellow-600 transition"
            >
              Currency Exchange
            </Link>

          </div>
        )}

      </nav>
    </header>
  );
}
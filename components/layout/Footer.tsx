"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0e2240] text-white">

      {/* ================= TOP SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Logo + About */}
        <div>
          <h2 className="text-2xl font-serif font-semibold mb-2">
            Equatorial <span className="text-yellow-400">Tours & Forex</span>
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            A Division of Equatorial Group
          </p>

          <p className="text-gray-300 text-sm leading-relaxed">
            Premium Tours, Forex, IT Services & Luxury Car Solutions
            under Equatorial Group.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/" className="hover:text-yellow-400">Home</Link></li>
            {/* <li><Link href="/packages" className="hover:text-yellow-400">Tours</Link></li> */}
            <li><Link href="/currency" className="hover:text-yellow-400">Money Exchange</Link></li>
            <li><Link href="/about" className="hover:text-yellow-400">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Legal
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/privacy-policy" className="hover:text-yellow-400">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="hover:text-yellow-400">
                Terms & Conditions
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Contact Us
          </h3>

          <div className="space-y-3 text-sm text-gray-300">
            <p className="flex items-center gap-2">
              <Mail size={16} /> info@equatorialtours.com
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <Facebook className="hover:text-yellow-400 cursor-pointer" />
            <Instagram className="hover:text-yellow-400 cursor-pointer" />
            <Twitter className="hover:text-yellow-400 cursor-pointer" />
          </div>
        </div>

      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-700 py-6 text-center text-sm text-gray-400 px-4">
        © {new Date().getFullYear()} Equatorial Tours & Forex.
        <span className="block sm:inline sm:ml-2">
          A Division of Equatorial Group. All Rights Reserved.
        </span>
      </div>

    </footer>
  );
}
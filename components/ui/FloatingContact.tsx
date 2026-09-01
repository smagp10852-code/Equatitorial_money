"use client";

import { Phone, MessageCircle } from "lucide-react";

export default function FloatingContact() {
  const phoneNumber = "971501993213";

  const message = encodeURIComponent(
    "Hello Equatorial Tous and Money Changer Pvt. Ltd. Team 👋 I visited your website and I'm interested in your travel packages. Please share more details."
  );

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-50">

      {/* Call Button */}
      <a
        href={`tel:+${phoneNumber}`}
        className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition"
      >
        <Phone size={20} />
      </a>

      {/* WhatsApp Button with Auto Message */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition"
      >
        <MessageCircle size={20} />
      </a>

    </div>
  );
}
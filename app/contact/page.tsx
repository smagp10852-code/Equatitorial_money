"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

const offices = [
  {
    title: "Head Office – Panvel",
    address:
      "Shop No. 508, B-Wing, Bldg No-1, Royal Residency CHS, Vishrali Naka, Panvel, Raigad, Maharashtra 410206",
    map: "https://maps.google.com/?q=Royal+Residency+Panvel",
  },
  {
    title: "Saltlake Kolkata Branch",
    address:
      "Off-07, 9th Floor, Unit-909, Godrej Genesis Building, Plot-XI, Block-EP & GP, Sector-5, Saltlake City, Kolkata 700091",
    map: "https://maps.google.com/?q=Godrej+Genesis+Saltlake+Sector+5+Kolkata",
  },
  {
    title: "Newtown Kolkata Branch",
    address:
      "Off-1, Ground Floor, Plot AI-37, Premises No-15-0031, Action Area-1A, Newtown, Kolkata 700156",
    map: "https://maps.app.goo.gl/oPw1Apg3sb1zjz2j6",
  },
  {
    title: "Bangalore Branch",
    address:
      "Shop-137, 1st Floor, Golden Plaza, Jumma Masjid Complex, Jumma Masjid Road, Shivajinagar, Bengaluru, Karnataka 560051",
    map: "https://maps.google.com/?q=Golden+Plaza+Jumma+Masjid+Road+Bangalore",
  },
  {
    title: "Agartala Branch",
    address:
      "Ground Floor, Building No.2111465, Ganaraj Chowmuhani, PO-Agartala, PS-East Agartala, Tripura West 799001",
    map: "https://maps.google.com/?q=Ganaraj+Chowmuhani+Agartala",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const phone = "918969457707";

    const message = `
New Enquiry

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Country: ${formData.country}
Address: ${formData.address}
Service: ${formData.service}

Message:
${formData.message}
`;

    const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f4efe6]">

      {/* HERO */}
      <section className="relative w-full h-[340px] md:h-[420px] flex items-center justify-center text-center overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
          alt="Contact Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-[#0f1f3d]/85"></div>

        <div className="relative z-10 px-6 text-white">
          <p className="text-yellow-400 text-sm tracking-widest mb-3">
            EQUATORIAL TOURS & MONEY CHANGERS
          </p>

          <h1 className="text-4xl md:text-6xl font-bold">
            Contact <span className="text-yellow-400">Us</span>
          </h1>

          <p className="mt-4 text-gray-200 max-w-2xl mx-auto text-sm md:text-base">
            Get in touch with our offices for secure foreign currency exchange services.
          </p>

          <div className="mt-6">
            <a
              href="tel:+918981139988"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              📞 Call Now
            </a>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-2 gap-14">

        {/* LEFT SIDE */}
        <div className="space-y-6">

          {offices.map((office, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4">

                <MapPin className="text-yellow-600 mt-1" size={24} />

                <div>
                  <h4 className="font-semibold text-lg text-blue-900">
                    {office.title}
                  </h4>

                  <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                    {office.address}
                  </p>

                  <a
                    href={office.map}
                    target="_blank"
                    className="flex items-center gap-2 text-yellow-600 mt-2 text-sm hover:underline"
                  >
                    View Location
                    <ExternalLink size={16} />
                  </a>
                </div>

              </div>
            </div>
          ))}

          <InfoBox icon={<Phone />} title="Phone" text="+91 8981139988" />
          <InfoBox icon={<Mail />} title="Email" text="equatorialtoursnmoney@yahoo.com" />

        </div>

        {/* RIGHT FORM */}
        {/* RIGHT FORM */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-yellow-500/30 w-full max-w-xl h-fit self-start">

          <h3 className="text-3xl font-bold text-center mb-2">
            Send Us an <span className="text-yellow-600">Enquiry</span>
          </h3>

          <p className="text-center text-sm text-gray-500 mb-6">
            Equatorial Tours & Money Changers Pvt. Ltd.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
            <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
            <InputField label="Country" name="country" value={formData.country} onChange={handleChange} />
            <InputField label="Full Address" name="address" value={formData.address} onChange={handleChange} />

            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            >
              <option value="">Select Service</option>
              <option value="forex">Money Exchange (Forex)</option>
              <option value="transfer">International Money Transfer</option>
              <option value="travelcard">Forex Travel Card</option>
            </select>

            <textarea
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition"
            >
              Send Enquiry
            </button>

          </form>

        </div>

      </section>
    </div>
  );
}

/* INPUT */

function InputField({ label, name, value, onChange, type = "text" }: any) {
  return (
    <input
      type={type}
      name={name}
      required
      value={value}
      onChange={onChange}
      placeholder={label}
      className="w-full border border-gray-300 rounded-xl px-4 py-3"
    />
  );
}

/* INFO BOX */

function InfoBox({ icon, title, text }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-yellow-600 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-gray-600">{text}</p>
      </div>
    </div>
  );
}
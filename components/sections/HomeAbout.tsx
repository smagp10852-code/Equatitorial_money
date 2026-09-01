"use client";

export default function HomeAbout() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14 items-center">

        {/* LEFT IMAGE */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1553729459-efe14ef6055d"
            alt="Currency Exchange"
            className="rounded-2xl shadow-xl"
          />

          <div className="absolute -bottom-6 -right-6 bg-yellow-500 text-white px-6 py-4 rounded-xl shadow-lg">
            <p className="text-2xl font-bold">12+</p>
            <p className="text-sm">Years Experience</p>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>

          <p className="text-yellow-600 font-semibold tracking-wider mb-2">
            ABOUT OUR COMPANY
          </p>

          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            Trusted Foreign Currency Exchange Services
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            Equatorial Tours & Money Changers Pvt. Ltd. is a trusted
            foreign exchange company providing secure and reliable
            currency exchange services across India.
          </p>

          <p className="text-gray-600 leading-relaxed mb-8">
            We offer buying and selling of foreign currencies,
            travel forex cards, and international money transfer
            services with competitive rates and RBI compliance.
          </p>

          <div className="flex gap-6">

            <a
              href="/about"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition"
            >
              Learn More
            </a>

            <a
              href="/contact"
              className="border border-blue-900 text-blue-900 px-6 py-3 rounded-lg hover:bg-blue-900 hover:text-white transition"
            >
              Contact Us
            </a>

          </div>

        </div>

      </div>
    </section>
  );
}
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="bg-white text-gray-800">

      {/* HERO SECTION */}
      {/* <section className="relative h-[65vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
          alt="Travel"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Equatorial Tours & Forex
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Your trusted partner for unforgettable travel experiences and reliable foreign exchange services.
          </p>
        </div>
      </section> */}

      {/* COMPANY OVERVIEW */}
      {/* <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-8 border-l-4 border-yellow-500 pl-4">
          Company Overview
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4">
          Equatorial Tours & Forex Pvt. Ltd. is a professionally managed travel
          and foreign exchange company committed to delivering world-class
          services with integrity and transparency.
        </p>
        <p className="text-gray-600 leading-relaxed">
          We specialize in domestic and international tour packages, visa
          assistance, flight bookings, hotel reservations, and complete
          travel planning solutions. Our dedicated forex division ensures
          secure, RBI-compliant, and competitive currency exchange services.
        </p>
      </section> */}


      {/* HERO SECTION */}
      <section className="relative h-[65vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1621264448270-06f3b2a4a6d2"
          alt="Currency Exchange"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Equatorial Forex
          </h1>

          <p className="text-lg md:text-xl opacity-90">
            Your trusted partner for secure and reliable foreign currency exchange services.
          </p>
        </div>
      </section>

      {/* COMPANY OVERVIEW */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl font-bold text-blue-900 mb-8 border-l-4 border-yellow-500 pl-4">
          Company Overview
        </h2>

        <p className="text-gray-600 leading-relaxed mb-4">
          Equatorial Tours & Money Changers Pvt. Ltd. is a professionally
          managed foreign exchange company committed to providing secure,
          transparent, and reliable currency exchange services.
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">
          We offer a wide range of foreign currency services including
          buying and selling international currencies, travel forex
          solutions, and competitive exchange rates for individuals
          and businesses.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Our mission is to make foreign currency exchange simple,
          secure, and accessible while ensuring full compliance
          with RBI regulations and maintaining the highest
          standards of customer trust.
        </p>

      </section>

      {/* FOREX SERVICES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        <div className="rounded-2xl overflow-hidden shadow-xl order-2 md:order-1">
          <Image
            src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3"
            alt="Forex Services"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">
            Foreign Exchange Services
          </h2>

          <ul className="space-y-4 text-gray-600">
            <li>✔ Currency Exchange at Competitive Rates</li>
            <li>✔ Travel Cards & Forex Cards</li>
            <li>✔ International Money Transfer</li>
            <li>✔ Student Forex Assistance</li>
            <li>✔ Corporate Forex Solutions</li>
            <li>✔ Real-time Exchange Rate Transparency</li>
          </ul>

          <p className="mt-6 text-gray-600 leading-relaxed">
            We provide safe and reliable forex solutions with fast processing
            and complete transparency.
          </p>
        </div>
      </section>

      {/* TOUR SERVICES */}
      {/* <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">
              Our Travel Services
            </h2>

            <ul className="space-y-4 text-gray-600">
              <li>✔ Domestic & International Tour Packages</li>
              <li>✔ Customized Holiday Planning</li>
              <li>✔ Group Tours & Corporate Travel</li>
              <li>✔ Flight & Hotel Bookings</li>
              <li>✔ Visa Assistance & Travel Insurance</li>
              <li>✔ Adventure, Honeymoon & Luxury Tours</li>
            </ul>

            <p className="mt-6 text-gray-600 leading-relaxed">
              We ensure smooth planning, safety, and comfort for every journey.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1526779259212-756e1f0c0f16"
              alt="Travel Services"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section> */}



      {/* LEADERSHIP SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-blue-900">
            Our Leadership Team
          </h2>
          <p className="text-gray-500 mt-3">
            Dedicated professionals leading our foreign exchange services with trust and integrity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

          {/* Director */}
          <div className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition p-8 text-center">
            <div className="flex justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
                <Image
                  src="/team/ceo.jpg"
                  alt="Director"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-blue-900 mt-6">
              Mr. Gopa Datta
            </h3>

            <p className="text-yellow-600 font-medium">
              Director
            </p>

            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
              Leads the organization with a strong focus on transparency,
              customer satisfaction, and reliable foreign exchange services.
            </p>
          </div>

          {/* Head of Forex Operations */}
          <div className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition p-8 text-center">
            <div className="flex justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
                <Image
                  src="/team/forex-head.jpg"
                  alt="Forex Head"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-blue-900 mt-6">
              Ms. Priya Mehta
            </h3>

            <p className="text-yellow-600 font-medium">
              Head of Forex Operations
            </p>

            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
              Oversees currency exchange operations ensuring smooth
              transactions, competitive rates, and efficient service
              for all customers.
            </p>
          </div>

          {/* Compliance Manager */}
          <div className="bg-gray-50 rounded-2xl shadow-lg hover:shadow-2xl transition p-8 text-center">
            <div className="flex justify-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
                <Image
                  src="/team/compliance.jpg"
                  alt="Compliance Manager"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-blue-900 mt-6">
              Mr. Amit Verma
            </h3>

            <p className="text-yellow-600 font-medium">
              Compliance & Risk Manager
            </p>

            <p className="text-gray-600 mt-4 text-sm leading-relaxed">
              Ensures all foreign exchange services follow regulatory
              guidelines and maintain secure and compliant financial processes.
            </p>
          </div>

        </div>
      </section>


      {/* STATS */}
      <section className="bg-gray-50 py-20 text-center">
        <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto px-6">

          <div>
            <h2 className="text-4xl font-bold text-blue-900">10K+</h2>
            <p className="text-gray-600 mt-2">Satisfied Customers</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-900">40+</h2>
            <p className="text-gray-600 mt-2">Currencies Available</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-900">12+</h2>
            <p className="text-gray-600 mt-2">Years of Experience</p>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-900">100%</h2>
            <p className="text-gray-600 mt-2">RBI Compliant</p>
          </div>

        </div>
      </section>
    </div>
  );
}
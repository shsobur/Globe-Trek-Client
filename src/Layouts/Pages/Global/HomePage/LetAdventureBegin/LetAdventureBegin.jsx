import React from "react";
import { FaHiking, FaCompass, FaMapMarkedAlt, FaRoute } from "react-icons/fa";

const LetAdventureBegin = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20"
      style={{
        background: "linear-gradient(135deg, #d1edff77, #f7faff)",
      }}
    >
      <div className="max-w-[1536px] mx-auto text-center w-full">
        {/* Main Heading Section */}
        <div
          className="mb-16 md:mb-20"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2a75b3] mb-4">
            Let the Adventure Begin!
          </h2>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8">
            Explore. Laugh. Discover. Repeat.
          </p>

          {/* CTA Button */}
          <div className="mt-8">
            <button className="bg-gradient-to-r from-[#2a75b3] to-[#87ceeb] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:from-[#1e5a87] hover:to-[#6bb8e6]">
              Start Your Journey Today
            </button>
          </div>
        </div>

        {/* Stats Grid - Pure Tailwind */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-20"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          {/* Happy Tourists */}
          <div className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors duration-300">
              <FaHiking className="text-2xl text-[#2a75b3]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#2a75b3] mb-2">
              500+
            </h3>
            <p className="text-gray-600 font-medium">Happy Tourists</p>
          </div>

          {/* Expert Guides */}
          <div className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors duration-300">
              <FaCompass className="text-2xl text-[#2a75b3]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#2a75b3] mb-2">
              100+
            </h3>
            <p className="text-gray-600 font-medium">Expert Guides</p>
          </div>

          {/* Awesome Locations */}
          <div className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-yellow-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow-200 transition-colors duration-300">
              <FaMapMarkedAlt className="text-2xl text-[#2a75b3]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#2a75b3] mb-2">
              60+
            </h3>
            <p className="text-gray-600 font-medium">Awesome Locations</p>
          </div>

          {/* Road Trips */}
          <div className="group bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-purple-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors duration-300">
              <FaRoute className="text-2xl text-[#2a75b3]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-[#2a75b3] mb-2">
              1000+
            </h3>
            <p className="text-gray-600 font-medium">Road Trips Taken</p>
          </div>
        </div>

        {/* Testimonial Quote - Pure Tailwind */}
        <div
          className="max-w-2xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="1400"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg border border-blue-100">
            <blockquote className="text-lg md:text-xl text-gray-700 italic mb-4">
              "The journey of a thousand miles begins with a single step. Let us
              be your guide on that incredible adventure."
            </blockquote>
            <div className="text-[#2a75b3] font-semibold">
              - Wanderlust Tours Team
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetAdventureBegin;
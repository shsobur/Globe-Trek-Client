import React from "react";
import {
  FaShieldAlt,
  FaMapMarkedAlt,
  FaHeart,
  FaGlobeAmericas,
  FaStar,
  FaUsers,
} from "react-icons/fa";

const DiscoverGlobeTaek = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: "Safe & Secure",
      description:
        "Your safety is our top priority with verified guides and secure bookings",
    },
    {
      icon: FaMapMarkedAlt,
      title: "Curated Journeys",
      description:
        "Handpicked experiences that showcase the true essence of each destination",
    },
    {
      icon: FaHeart,
      title: "Memorable Moments",
      description:
        "We don't just plan trips, we create lifelong memories and connections",
    },
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20"
      style={{
        background: "linear-gradient(135deg, #d1edff77, #f7faff)",
      }}
    >
      <div className="max-w-[1536px] max-h-[100vh] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 xl:gap-16">
          {/* Text Content - Left Side */}
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-blue-100 mb-6">
                <FaStar className="text-yellow-400 text-lg" />
                <span className="text-sm font-semibold text-[#2a75b3]">
                  Trusted by 500+ Travelers
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#2a75b3] mb-6 leading-tight">
                Why Choose <span className="text-[#0d4776]">GlobeTaek?</span>
              </h2>

              {/* Main Description */}
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed md:leading-loose mb-8 max-w-2xl mx-auto lg:mx-0">
                At GlobeTaek, we don't just offer tours — we craft unforgettable
                journeys. From scenic adventures to cultural insights, every
                trip is designed to connect you with the heart of each
                destination.
              </p>

              {/* Feature Points */}
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-blue-50 hover:shadow-md transition-all duration-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 200}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#87ceeb] to-[#2a75b3] rounded-full flex items-center justify-center">
                      <feature.icon className="text-white text-lg" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div
                className="grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#2a75b3]">
                    50+
                  </div>
                  <div className="text-sm text-gray-600">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#2a75b3]">
                    500+
                  </div>
                  <div className="text-sm text-gray-600">Happy Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#2a75b3]">
                    100+
                  </div>
                  <div className="text-sm text-gray-600">Expert Guides</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Content - Right Side */}
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-left"
            data-aos-duration="1200"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-[#e0f4ff] to-[#b8e6ff] rounded-3xl flex items-center justify-center min-h-[400px] md:min-h-[500px]">
                  {/* Placeholder for your image - Replace with actual img tag */}
                  <div className="text-center p-8">
                    <FaGlobeAmericas className="text-8xl text-[#2a75b3] mx-auto mb-4 opacity-80" />
                    <p className="text-gray-600 text-lg">
                      Your Amazing Travel Image Here
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Replace this placeholder with your actual image
                    </p>
                  </div>

                  {/* Uncomment and use this when you have the actual image */}
                  <img
                    src="https://res.cloudinary.com/dmfsmcy2y/image/upload/v1759397706/Screenshot_From_2025-10-02_15-34-29_cjud0h.png"
                    alt="Travel Globe"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-100 transform rotate-6">
                <div className="flex items-center gap-2">
                  <FaUsers className="text-[#87ceeb] text-xl" />
                  <span className="font-semibold text-gray-700">
                    Trusted Guides
                  </span>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-100 transform -rotate-6">
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400 text-xl" />
                  <span className="font-semibold text-gray-700">5★ Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverGlobeTaek;

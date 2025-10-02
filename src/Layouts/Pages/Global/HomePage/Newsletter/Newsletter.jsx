import {
  FaPaperPlane,
  FaEnvelope,
  FaGift,
  FaShieldAlt,
  FaRocket,
  FaCheckCircle,
} from "react-icons/fa";

const Newsletter = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20"
      style={{
        background: "linear-gradient(135deg, #d1edff77, #f7faff)",
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content - Visual & Benefits */}
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            {/* Main Illustration/Image Area */}
            <div className="relative">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-blue-100">
                <div className="text-center">
                  {/* Animated Mail Icon */}
                  <div className="relative inline-block mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#87ceeb] to-[#2a75b3] rounded-2xl flex items-center justify-center shadow-lg mx-auto">
                      <FaPaperPlane className="text-white text-3xl transform -rotate-45" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                      <FaRocket className="text-white text-sm" />
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-[#2a75b3] mb-4">
                    Join Our Travel Tribe!
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Get weekly adventure inspiration, exclusive deals, and
                    travel tips delivered straight to your inbox.
                  </p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <FaGift className="text-[#87ceeb] text-xl" />
                    <span className="text-gray-700 font-medium">
                      Exclusive Deals
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <FaCheckCircle className="text-[#87ceeb] text-xl" />
                    <span className="text-gray-700 font-medium">
                      Early Access
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <FaPaperPlane className="text-[#87ceeb] text-xl" />
                    <span className="text-gray-700 font-medium">
                      Travel Tips
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
                    <FaShieldAlt className="text-[#87ceeb] text-xl" />
                    <span className="text-gray-700 font-medium">No Spam</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-100 transform rotate-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold text-gray-700">
                    2,500+ Subscribers
                  </span>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-blue-100 transform -rotate-6">
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-[#87ceeb] text-xl" />
                  <span className="font-semibold text-gray-700">
                    Weekly Updates
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Newsletter Form */}
          <div
            className="w-full lg:w-1/2"
            data-aos="fade-left"
            data-aos-duration="1200"
            data-aos-once="true"
          >
            <div className="text-center lg:text-left">
              {/* Header */}
              <div className="mb-8">
                <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2a75b3] mb-4">
                  Stay{" "}
                  <span className="font-playfair text-[#87ceeb]">Inspired</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] rounded-full mb-6 lg:mx-0 mx-auto"></div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Don't miss out on incredible travel stories, hidden gems, and
                  special offers from GlobeTaek.
                </p>
              </div>

              {/* Newsletter Form */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-blue-100">
                <form className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <label className="block text-left text-gray-700 font-semibold">
                      Your Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#87ceeb] focus:border-transparent transition-all duration-300 pr-12"
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#87ceeb] to-[#2a75b3] rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            ✓
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="block text-left text-gray-700 font-semibold">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#87ceeb] focus:border-transparent transition-all duration-300 pr-12"
                      />
                      <FaEnvelope className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="space-y-3">
                    <label className="block text-left text-gray-700 font-semibold">
                      What interests you?
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                        <input
                          type="checkbox"
                          className="rounded text-[#87ceeb]"
                        />
                        <span className="text-gray-700">Adventure</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                        <input
                          type="checkbox"
                          className="rounded text-[#87ceeb]"
                        />
                        <span className="text-gray-700">Culture</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                        <input
                          type="checkbox"
                          className="rounded text-[#87ceeb]"
                        />
                        <span className="text-gray-700">Beaches</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl cursor-pointer hover:bg-blue-100 transition-colors">
                        <input
                          type="checkbox"
                          className="rounded text-[#87ceeb]"
                        />
                        <span className="text-gray-700">Cities</span>
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#2a75b3] to-[#87ceeb] text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <span>Join Adventure Club</span>
                    <FaPaperPlane className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </button>

                  {/* Privacy Note */}
                  <p className="text-sm text-gray-500 text-center">
                    🔒 We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#2a75b3]">
                    2.5K+
                  </div>
                  <div className="text-sm text-gray-600">Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#2a75b3]">
                    50+
                  </div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-[#2a75b3]">
                    100%
                  </div>
                  <div className="text-sm text-gray-600">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
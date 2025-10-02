import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f8fbff] border-t border-blue-100">
      {/* Main Footer Content */}
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-5 py-12 md:py-8">
        {/* Upper Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 md:mb-12">
          {/* Column 1 - Brand */}
          <div className="lg:col-span-1">
            <div className="mb-2">
              <h2 className="font-playfair text-3xl font-bold text-[#2c5282] mb-4">
                GlobeTaek
              </h2>
              <p className="font-inter text-gray-600 leading-relaxed mb-6">
                Your gateway to unforgettable travel experiences. Discover
                hidden gems and create lifelong memories with our expert guides.
              </p>
              <div className="flex gap-4">
                {[FaFacebook, FaInstagram, FaTwitter, FaGithub].map(
                  (Icon, index) => (
                    <button
                      key={index}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 border border-blue-100 text-[#2c5282] hover:text-[#87ceeb]"
                    >
                      <Icon className="text-lg" />
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-playfair text-xl font-semibold text-[#2c5282] mb-6">
              Explore
            </h3>
            <div className="space-y-3">
              {[
                "Destinations",
                "Tour Packages",
                "Travel Guides",
                "Adventure Tours",
                "Cultural Experiences",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-inter text-gray-600 hover:text-[#87ceeb] transition-colors duration-300 block"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="font-playfair text-xl font-semibold text-[#2c5282] mb-6">
              Support
            </h3>
            <div className="space-y-3">
              {[
                "Help Center",
                "Contact Us",
                "Booking Guide",
                "Cancellation Policy",
                "Travel Insurance",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-inter text-gray-600 hover:text-[#87ceeb] transition-colors duration-300 block"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-playfair text-xl font-semibold text-[#2c5282] mb-6">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#87ceeb] flex-shrink-0" />
                <span className="font-inter text-gray-600 text-sm">
                  123 Travel Street, Adventure City, AC 12345
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#87ceeb] flex-shrink-0" />
                <span className="font-inter text-gray-600 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#87ceeb] flex-shrink-0" />
                <span className="font-inter text-gray-600 text-sm">
                  hello@globetaek.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-200 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="font-inter text-gray-600">
                © {currentYear} GlobeTaek. All rights reserved.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {[
                "Privacy Policy",
                "Terms of Service",
                "Cookie Policy",
                "Disclaimer",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-inter text-gray-600 hover:text-[#87ceeb] transition-colors duration-300 text-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
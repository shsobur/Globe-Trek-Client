// File path__
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

// From react__
import { useEffect, useState } from "react";

// Package__
import { Link } from "react-router";

const Package = () => {
  const axiosPublic = useAxiosPublic();
  const [tabActive, setTabActive] = useState(0);
  const [packageData, setPackageData] = useState([]);
  const [guideData, setGuideData] = useState([]);
  const [packageLoading, setPackageLoading] = useState(true);
  const [guideLoading, setGuideLoading] = useState(true);

  const tabs = [
    {
      id: 1,
      title: "Our Package",
    },
    {
      id: 2,
      title: "Meet Our Tour Guide",
    },
  ];

  // Fetch Package Data__
  useEffect(() => {
    axiosPublic.get("/random-packages").then((res) => {
      if (res.data) {
        setPackageData(res.data);
        setPackageLoading(false);
      } else {
        setPackageLoading(false);
      }
    });
  }, [axiosPublic]);

  // Fetch Guide Data__
  useEffect(() => {
    axiosPublic.get("/random-guide").then((res) => {
      if (res.data) {
        setGuideData(res.data);
        setGuideLoading(false);
      } else {
        setPackageLoading(false);
      }
    });
  }, [axiosPublic]);

  return (
    <>
      <section
        id="package_section"
        className="bg-[#f8fbff] py-12 md:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section - Same as before */}
          <div
            className="text-center mb-12 md:mb-16 lg:mb-20"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c5282] mb-4">
              Tourism &{" "}
              <span className="font-playfair text-[#87ceeb]">Travel Guide</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] mx-auto rounded-full"></div>
          </div>

          {/* Tab Navigation - Same as before */}
          <div
            className="flex justify-center mb-12 md:mb-16"
            data-aos="fade-up"
            data-aos-duration="1200"
            data-aos-once="true"
          >
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-blue-100">
              {tabs.map((btn, index) => (
                <button
                  key={btn.id}
                  className={`px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                    index === tabActive
                      ? "bg-gradient-to-r from-[#0060af] to-[#87ceeb] text-white shadow-lg transform scale-105"
                      : "text-[#525252] bg-white border-2 border-gray-300 hover:border-[#0060af] hover:text-[#0060af]"
                  }`}
                  onClick={() => setTabActive(index)}
                >
                  {btn.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area - UPDATED WITH CENTERED LAST ROWS */}
          <div
            className="max-w-6xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="1400"
            data-aos-once="true"
          >
            {tabActive === 0 && (
              <div>
                {packageLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#87ceeb]"></div>
                    <p className="mt-4 text-gray-600">Loading Packages...</p>
                  </div>
                ) : (
                  // UPDATED: Centered last row for packages
                  <div className="flex flex-col items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
                      {packageData.map((item, index) => (
                        <div
                          key={item._id}
                          className={`
                            bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-blue-100
                            ${
                              packageData.length % 2 !== 0 &&
                              index === packageData.length - 1
                                ? "md:col-start-1 md:col-end-3 md:mx-auto md:max-w-md"
                                : ""
                            }
                          `}
                        >
                          <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                            <img
                              src={item.images[0]}
                              alt="Card Image"
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                          </div>
                          <div className="p-6 md:p-8">
                            <div className="inline-block px-4 py-2 bg-[#c0e1fb] text-[#4161b9] rounded-full text-sm font-medium mb-4">
                              {item.tourType}
                            </div>
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
                              {item.title}
                            </h2>
                            <p className="text-gray-600 mb-4">
                              {item.duration}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-2xl md:text-3xl font-bold text-[#0477d5]">
                                ${item.price}
                              </span>
                              <Link to={`/package-details/${item._id}`}>
                                <button className="bg-gradient-to-r from-[#0060af] to-[#87ceeb] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                  View Details
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {tabActive === 1 && (
              <div>
                {guideLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#87ceeb]"></div>
                    <p className="mt-4 text-gray-600">Loading Guides...</p>
                  </div>
                ) : (
                  // UPDATED: Centered last row for guides
                  <div className="flex flex-col items-center">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
                      {guideData.map((guide, index) => (
                        <div
                          key={guide._id}
                          className={`
                            bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-blue-100
                            ${
                              guideData.length % 4 !== 0 &&
                              index === guideData.length - 1
                                ? "sm:col-start-2 lg:col-start-2 lg:col-end-4 sm:mx-auto"
                                : guideData.length % 4 === 3 &&
                                  index === guideData.length - 1
                                ? "lg:col-start-2 lg:col-end-3"
                                : guideData.length % 4 === 2 &&
                                  index === guideData.length - 1
                                ? "lg:col-start-2 lg:col-end-3"
                                : ""
                            }
                          `}
                        >
                          <div className="flex justify-center mb-4">
                            <div className="relative">
                              <img
                                src={guide.userPhoto}
                                alt="Guide Image"
                                className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-[#08b438] object-cover"
                              />
                              <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <h2 className="text-xl font-bold text-gray-900">
                              {guide.name}
                            </h2>
                            <p className="text-gray-600">
                              {guide.userRole || "Tour Guide"}
                            </p>
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {guide.userAddress || "2 Years Experience"}
                            </span>
                            <Link
                              to={`/profile/${guide._id}`}
                              className="block mt-4"
                            >
                              <button className="w-full bg-gradient-to-r from-[#0060af] to-[#87ceeb] text-white py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                                View Profile
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Package;
const Overview = () => {
  return (
    <>
      <section id="overview_section" className="bg-[#f8fbff]">
        <div className="max-w-[1536px] min-h-[100vh] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 lg:py-24">
          {/* Header Section - Matching Your Hero Style */}
          <div
            className="text-center mb-16 md:mb-24 lg:mb-28"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c5282] mb-4">
              About <span className="text-[#87ceeb]">Wanderlust Tours</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] mx-auto rounded-full"></div>
          </div>

          {/* Main Content Grid */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 xl:gap-16">
            {/* Video Section - Left */}
            <div
              className="w-full lg:w-1/2"
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#e2f4ff]">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-[#e0f4ff] to-[#f0f9ff]">
                  <iframe
                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] rounded-2xl"
                    src="https://www.youtube.com/embed/T6INK2Ch1PY?si=JqxRlQyeu7QZt9Ml"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Content Section - Right */}
            <div className="w-full lg:w-1/2">
              <div
                className="space-y-6 md:space-y-8"
                data-aos="fade-left"
                data-aos-duration="1200"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2c5282] leading-tight">
                  Your Gateway to{" "}
                  <span className="text-[#87ceeb]">World Exploration</span>
                </h2>

                <p className="text-lg sm:text-xl text-[#4a5568] leading-relaxed md:leading-loose">
                  We specialize in creating unforgettable travel experiences
                  that connect you with the world's most beautiful destinations.
                  From exotic beaches to mountain peaks, cultural tours to
                  adventure expeditions, we make your travel dreams come true.
                </p>

                {/* Stats Grid - Matching Your Feature Cards */}
                <div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 pt-4"
                  data-aos="fade-up"
                  data-aos-duration="1400"
                >
                  {/* Happy Travelers */}
                  <div className="group text-center p-6 bg-white rounded-2xl border border-[#e2f4ff] hover:border-[#87ceeb] transition-all duration-500 hover:scale-105 cursor-pointer shadow-sm hover:shadow-[0_10px_30px_rgba(135,206,235,0.15)]">
                    <div className="space-y-3">
                      <div className="text-3xl md:text-4xl font-bold text-[#87ceeb] group-hover:text-[#2c5282] transition-colors">
                        500+
                      </div>
                      <div className="text-sm md:text-base font-semibold text-[#4a5568] group-hover:text-[#2c5282] transition-colors">
                        Happy Travelers
                      </div>
                    </div>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] rounded-full mx-auto mt-4 group-hover:w-16 transition-all duration-300"></div>
                  </div>

                  {/* Destinations */}
                  <div className="group text-center p-6 bg-white rounded-2xl border border-[#e2f4ff] hover:border-[#87ceeb] transition-all duration-500 hover:scale-105 cursor-pointer shadow-sm hover:shadow-[0_10px_30px_rgba(135,206,235,0.15)]">
                    <div className="space-y-3">
                      <div className="text-3xl md:text-4xl font-bold text-[#87ceeb] group-hover:text-[#2c5282] transition-colors">
                        50+
                      </div>
                      <div className="text-sm md:text-base font-semibold text-[#4a5568] group-hover:text-[#2c5282] transition-colors">
                        Destinations
                      </div>
                    </div>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] rounded-full mx-auto mt-4 group-hover:w-16 transition-all duration-300"></div>
                  </div>

                  {/* Rating */}
                  <div className="group text-center p-6 bg-white rounded-2xl border border-[#e2f4ff] hover:border-[#87ceeb] transition-all duration-500 hover:scale-105 cursor-pointer shadow-sm hover:shadow-[0_10px_30px_rgba(135,206,235,0.15)]">
                    <div className="space-y-3">
                      <div className="text-3xl md:text-4xl font-bold text-[#87ceeb] group-hover:text-[#2c5282] transition-colors flex items-center justify-center gap-1">
                        <span>5</span>
                        <span className="text-yellow-400 text-2xl">★</span>
                      </div>
                      <div className="text-sm md:text-base font-semibold text-[#4a5568] group-hover:text-[#2c5282] transition-colors">
                        Average Rating
                      </div>
                    </div>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] rounded-full mx-auto mt-4 group-hover:w-16 transition-all duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Overview;
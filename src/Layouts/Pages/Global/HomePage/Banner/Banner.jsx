import { Link } from "react-router";
import { useState, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaChevronLeft,
  FaChevronRight,
  FaMapMarkerAlt,
  FaCompass,
  FaMountain,
  FaUmbrellaBeach,
  FaCity,
} from "react-icons/fa";

// Import your images__
import image1 from "../../../../../assets/banner-image/Image-1.jpg";
import image2 from "../../../../../assets/banner-image/Image-2.jpg";
import image3 from "../../../../../assets/banner-image/Image-3.jpg";
import image4 from "../../../../../assets/banner-image/Image-4.jpg";
import image5 from "../../../../../assets/banner-image/Image-5.jpg";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const slides = [
    {
      image: image1,
      title: "Mountain Adventures",
      icon: FaMountain,
      color: "from-green-500/20 to-blue-500/20",
    },
    {
      image: image2,
      title: "Wild Exploration",
      icon: FaUmbrellaBeach,
      color: "from-yellow-500/20 to-orange-500/20",
    },
    {
      image: image3,
      title: "Cultural Cities",
      icon: FaCity,
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      image: image4,
      title: "Tropical Beaches",
      icon: FaCompass,
      color: "from-red-500/20 to-yellow-500/20",
    },
    {
      image: image5,
      title: "Historic Landmarks",
      icon: FaMapMarkerAlt,
      color: "from-indigo-500/20 to-blue-500/20",
    },
  ];

  const CurrentIcon = slides[currentSlide].icon;

  // Auto-play functionality__
  useEffect(() => {
    if (!isPlaying) return;

    let startTime = Date.now();
    const duration = 4000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      setProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setProgress(0);
        startTime = Date.now();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length, currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setProgress(0);
  };

  return (
    <>
      <section
        id="banner_section"
        className="relative h-screen max-h-[100vh] overflow-hidden"
      >
        {/* Background Slides */}
        <div className="relative w-full h-full max-w-[1920px] mx-auto">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-200" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${slide.color} mix-blend-overlay`}
              ></div>
              <div className="absolute inset-0 bg-black/65"></div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
          >
            <FaChevronLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 group"
          >
            <FaChevronRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="absolute bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center text-white">
              {/* Animated Title */}
              <div
                data-aos="fade-down"
                data-aos-duration="1000"
                data-aos-delay="200"
                className="mb-6"
              >
                <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4">
                  Discover <span className="text-[#87ceeb]">Bangladesh's</span>{" "}
                  Beauty
                </h1>
                <div className="w-36 h-1 bg-gradient-to-r from-[#87ceeb] to-[#b8e6ff] mx-auto rounded-full mb-4"></div>
                <p className="font-inter text-lg sm:text-xl text-white/90 max-w-3xl mx-auto italic">
                  Beyond the misconceptions lies a land of breathtaking
                  landscapes, rich culture, and warm-hearted people
                </p>
              </div>

              {/* Current Slide Title */}
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="400"
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CurrentIcon className="text-2xl text-[#87ceeb]" />
                  <p className="font-inter text-xl sm:text-2xl md:text-3xl font-light">
                    {slides[currentSlide].title}
                  </p>
                </div>
              </div>

              {/* CTA Button */}
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="600"
                className="mb-12"
              >
                <Link to={"/trips"}>
                  <button className="bg-gradient-to-r from-[#0060af] to-[#87ceeb] text-white px-8 py-4 rounded-full font-semibold text-lg sm:text-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3 group">
                    <span>START YOUR ADVENTURE</span>
                    <FaCompass className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                </Link>
              </div>

              {/* Slide Indicators */}
              <div
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="800"
                className="flex justify-center gap-3 mb-8"
              >
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-[#87ceeb] scale-125"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;

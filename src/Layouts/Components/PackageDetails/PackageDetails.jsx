// File path__
import "./PackageDetails.css";
import useUserData from "../../Hooks/useUserData";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../../Provider/AuthProvider";

// Package(REACT-ROUTER, REACT-DATEPICKER, SWEETALERT2)__
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useNavigate } from "react-router";

// From react__
import { useContext, useEffect, useState } from "react";

const PackageDetails = () => {
  const tourData = useLoaderData();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const { currentUserData } = useUserData();
  const [tourGuides, setTourGuides] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedGuide, setSelectedGuide] = useState("");

  useEffect(() => {
    axiosPublic.get("/get-all-tourGuides").then((res) => {
      setTourGuides(res.data);
    });
  }, [axiosPublic]);

  const guideList = tourGuides.map((guide) => ({
    _id: guide._id,
    name: guide.userName,
  }));

  console.log(guideList);

  const handlePackageBooking = () => {
    if (!user) {
      Swal.fire({
        title: "Sign in for free",
        text: "You have to sign in first to book tour package",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to sign in",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/sign-in");
        }
      });

      return;
    }

    console.log("user loged in");
  };

  return (
    <section id="tour_package_details_section">
      {/* Booking modal_ST */}

      <dialog id="booking_modal" className="modal">
        <div className="modal-box max-w-xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="text-xl font-semibold text-[#2a75b3] mb-4 text-center">
            Book Your Tour
          </h3>

          <form className="space-y-4">
            {/* Tourist Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tourist Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a75b3]"
              />
            </div>

            {/* Tourist Email */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tourist Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a75b3]"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                placeholder="Enter tour price"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a75b3]"
              />
            </div>

            {/* Tour Date */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tour Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a75b3]"
              />
            </div>

            {/* Tour Guide Name */}
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Tour Guide Name
              </label>
              <select
                value={selectedGuide}
                onChange={(e) => setSelectedGuide(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2a75b3]"
              >
                <option value="">Select a guide</option>
                {guideList.map((guide) => (
                  <option key={guide._id} value={guide.name}>
                    {guide.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Book Now Button */}
            <div className="pt-2">
              <button
                type="submit"
                onClick={handlePackageBooking}
                className="w-full bg-[#2a75b3] text-white font-semibold py-2 rounded-lg hover:bg-[#24659e] transition duration-200"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Booking modal_END */}

      <div className="tour-package-details">
        <div className="inner_container">
          {/* Hero Section */}
          <div className="hero-section">
            <div className="tour-badge">{tourData.tourType}</div>
            <h1 className="tour-title">{tourData.title}</h1>
            <div className="tour-meta">
              <span className="location">📍 {tourData.location}</span>
              <span className="duration">⏱️ {tourData.duration}</span>
            </div>
          </div>

          {/* Images Grid Section */}
          <div className="images-section">
            <div className="images-grid">
              {tourData.images.map((image, index) => (
                <div
                  key={index}
                  className={`image-item ${index === 0 ? "main-image" : ""}`}
                >
                  <img src={image} alt={`${tourData.title} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="content-section">
            {/* Price and Overview */}
            <div className="price-overview">
              <div className="price-card">
                <div className="price">৳{tourData.price.toLocaleString()}</div>
                <div className="price-label">Per Person</div>
              </div>
              <div className="overview">
                <h2>About This Tour</h2>
                <p>{tourData.overview}</p>
              </div>
            </div>

            {/* Tour Plan */}
            <div className="tour-plan">
              <h2>Tour Itinerary</h2>
              <div className="plan-timeline">
                {tourData.tourPlan.map((day, index) => (
                  <div key={index} className="plan-item">
                    <div className="day-number">{day.day}</div>
                    <div className="plan-content">
                      <p>{day.plan}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tour Guide Section */}
            <div className="tour-guides">
              <h2>Meet Your Tour Guides</h2>
              <div className="guides-grid">
                {tourGuides.map((guide) => (
                  <div key={guide._id} className="guide-card">
                    <div className="guide-image">
                      <img src={guide.userPhoto} alt={guide.userName} />
                    </div>
                    <div className="guide-info">
                      <h3>{guide.userName}</h3>
                      <div className="guide-meta">
                        <span className="experience">
                          {guide.userEmail} experience
                        </span>
                      </div>
                      <button className="view-profile-btn">View Profile</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Button */}

            {currentUserData?.userRole === "Tourist" && (
              <div className="book-section">
                <button
                  onClick={() =>
                    document.getElementById("booking_modal").showModal()
                  }
                  className="book-btn"
                >
                  <span className="book-text">Book This Package</span>
                  <span className="book-price">
                    ৳{tourData.price.toLocaleString()}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;

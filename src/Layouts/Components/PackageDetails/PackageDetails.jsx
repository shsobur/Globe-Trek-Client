import React from "react";
import "./PackageDetails.css";

// Tour package data
const tourData = {
  tourType: "Hill Adventure",
  title: "Sajek Valley – Cloud Touching Adventure",
  price: 5500,
  location: "Sajek Valley, Rangamati",
  duration: "3 Days 2 Nights",
  images: [
    "https://i.ibb.co/FLJS8BFQ/Ssjek-1.jpg",
    "https://i.ibb.co/YF7HG7Mk/Ssjek-2.jpg",
    "https://i.ibb.co/7Nkcty23/Ssjek-3.jpg",
    "https://i.ibb.co/Hp2xtjMG/Ssjek-4.jpg",
    "https://i.ibb.co/Jw6dnH4g/Ssjek-5.jpg",
  ],
  overview:
    "Experience the land of clouds – Sajek Valley. This package offers you a scenic adventure through the green hills of Rangamati, tribal hospitality, and peaceful nature. Ideal for couples, friends, or solo travelers looking for a quiet break.",
  tourPlan: [
    {
      day: "Day 1",
      plan: "Breakfast at Khagrachari, transfer to Sajek by Chander Gari (local jeep), check-in at resort, sunset view from Helipad.",
    },
    {
      day: "Day 2",
      plan: "Breakfast at Khagrachari, transfer to Sajek by Chander Gari (local jeep), check-in at resort, sunset view from Helipad.",
    },
    {
      day: "Day 3",
      plan: "Visit Konglak hill, tribal village tour, local lunch, return trip to Khagrachari, evening bus back to Dhaka.",
    },
  ],
  createdAt: "2025-07-09T16:38:11.388Z",
};

// Sample tour guide data
const tourGuides = [
  {
    id: 1,
    name: "Ahmed Hassan",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    experience: "5 years",
  },
  {
    id: 2,
    name: "Fatima Rahman",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616c23e76b3?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    experience: "4 years",
  },
  {
    id: 3,
    name: "Karim Abdullah",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    experience: "6 years",
  },
];

const PackageDetails = () => {
  return (
    <section id="tour_package_details_section">
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
                  <div key={guide.id} className="guide-card">
                    <div className="guide-image">
                      <img src={guide.image} alt={guide.name} />
                    </div>
                    <div className="guide-info">
                      <h3>{guide.name}</h3>
                      <div className="guide-meta">
                        <span className="rating">⭐ {guide.rating}</span>
                        <span className="experience">
                          {guide.experience} experience
                        </span>
                      </div>
                      <button className="view-profile-btn">View Profile</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Button */}
            <div className="book-section">
              <button className="book-btn">
                <span className="book-text">Book This Package</span>
                <span className="book-price">
                  ৳{tourData.price.toLocaleString()}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;
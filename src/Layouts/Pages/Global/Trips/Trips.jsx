// File path__
import "./Trips.css";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";

// Package(REACT ROUTER)__
import { Link } from "react-router";

// From react__
import { useEffect, useState } from "react";

const Trips = () => {
  const axiosPublic = useAxiosPublic();
  const [packages, setPackages] = useState([]);
  const [packageLoading, setPackageLoading] = useState(false);
  const cardInRow = [1, 2, 3, 4];

  useEffect(() => {
    setPackageLoading(true);
    axiosPublic.get("/get-all-packages").then((res) => {
      setPackages(res.data);
      setPackageLoading(false);
    });
  }, [axiosPublic]);

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <section id="tripe_section">
        <div className="trips-container">
          <div className="trips-header">
            <h1 className="trips-title">Amazing Travel Destinations</h1>
            <p className="trips-subtitle">
              Discover your next adventure with our curated travel experiences
            </p>
          </div>

          <div className="trips-grid">
            {packageLoading ? (
              <>
                {cardInRow.map((value) => (
                  <div key={value} className="trip-card placeholder">
                    <div className="placeholder-content">
                      <div className="placeholder-image"></div>
                      <div className="placeholder-text">
                        <div className="placeholder-title"></div>
                        <div className="placeholder-desc"></div>
                        <div className="placeholder-desc"></div>
                        <div className="placeholder-button"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {" "}
                {packages.map((item) => (
                  <div key={item._id} className="trip-card">
                    <div className="card-image">
                      <img
                        // loading="lazy"
                        src={item.images[0]}
                        alt="Tropical Paradise"
                      />
                      <div className="card-overlay">
                        <span className="price-badge">৳{item.price}</span>
                      </div>
                    </div>

                    <div className="card-content">
                      <h3 className="card-title">{item.title}</h3>
                      <p className="card-description">{item.duration}</p>

                      <div className="card-footer">
                        <div className="trip-details">
                          <span className="location">
                            <i className="icon">📍</i>
                            {item.location}
                          </span>
                        </div>

                        <Link to={`/package-details/${item._id}`}>
                          <button className="details-button">
                            View Details
                            <span className="button-arrow">→</span>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}{" "}
              </>
            )}

            {/* Fully designed card */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Trips;
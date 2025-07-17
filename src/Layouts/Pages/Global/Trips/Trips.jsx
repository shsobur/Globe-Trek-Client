import "./Trips.css";

const Trips = () => {
  return (
    <>
      <section id="tripe_section">
        <div className="trips-container">
          <div className="trips-header">
            <h1 className="trips-title">Amazing Travel Destinations</h1>
            <p className="trips-subtitle">
              Discover your next adventure with our curated travel experiences
            </p>
          </div>

          <div className="trips-grid">
            {/* Fully designed card */}
            <div className="trip-card">
              <div className="card-image">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Tropical Paradise"
                />
                <div className="card-overlay">
                  <span className="price-badge">$1,299</span>
                </div>
              </div>

              <div className="card-content">
                <h3 className="card-title">Tropical Paradise Getaway</h3>
                <p className="card-description">
                  Experience the ultimate tropical escape with crystal-clear
                  waters, pristine beaches, and luxury accommodations. This
                  7-day package includes snorkeling, island hopping, and
                  authentic local cuisine experiences.
                </p>

                <div className="card-footer">
                  <div className="trip-details">
                    <span className="duration">
                      <i className="icon">🕐</i>7 Days
                    </span>
                    <span className="location">
                      <i className="icon">📍</i>
                      Maldives
                    </span>
                  </div>

                  <button className="details-button">
                    View Details
                    <span className="button-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Placeholder cards for grid layout */}
            <div className="trip-card placeholder">
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

            <div className="trip-card placeholder">
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

            <div className="trip-card placeholder">
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Trips;

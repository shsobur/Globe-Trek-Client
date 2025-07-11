import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">About The Tourist Guide</h1>
          <p className="hero-subtitle">
            Your Gateway to Bangladesh's Hidden Treasures
          </p>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="main-content">
          <section className="intro-section">
            <h2 className="section-title">Welcome to Your Travel Companion</h2>
            <p className="intro-text">
              The Tourist Guide site is an online platform that serves as a
              comprehensive resource for travelers. We are passionate about
              showcasing the beauty, culture, and wonder of Bangladesh to the
              world.
            </p>
          </section>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏛️</div>
              <h3>Detailed Destinations</h3>
              <p>
                Explore comprehensive information on popular destinations across
                Bangladesh, from bustling cities to serene landscapes.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🗺️</div>
              <h3>Trip Planning</h3>
              <p>
                Plan your trips effectively with our detailed guides, ensuring
                you make the most of your visit to Bangladesh.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🏮</div>
              <h3>Cultural Insights</h3>
              <p>
                Discover local culture, cuisine, and activities that will enrich
                your travel experience beyond the ordinary.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Hidden Gems</h3>
              <p>
                Uncover both famous landmarks and hidden gems that showcase the
                authentic beauty of Bangladesh.
              </p>
            </div>
          </div>

          <section className="mission-section">
            <div className="mission-content">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-text">
                We believe that travel is more than just visiting places—it's
                about understanding cultures, connecting with people, and
                creating memories that last a lifetime. Our platform provides
                in-depth descriptions of various tourist attractions, ensuring
                visitors know what to expect and can fully appreciate the rich
                heritage of Bangladesh.
              </p>
            </div>
          </section>

          <section className="values-section">
            <h2 className="section-title">What We Offer</h2>
            <div className="values-grid">
              <div className="value-item">
                <h4>Comprehensive Information</h4>
                <p>
                  Detailed descriptions and practical information for every
                  destination we feature.
                </p>
              </div>
              <div className="value-item">
                <h4>Local Expertise</h4>
                <p>
                  Insights into local culture, traditions, and authentic
                  experiences.
                </p>
              </div>
              <div className="value-item">
                <h4>Culinary Adventures</h4>
                <p>
                  Explore the rich flavors and diverse cuisine that Bangladesh
                  has to offer.
                </p>
              </div>
              <div className="value-item">
                <h4>Activity Recommendations</h4>
                <p>
                  Discover exciting activities and experiences for every type of
                  traveler.
                </p>
              </div>
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-content">
              <h2>Ready to Explore Bangladesh?</h2>
              <p>
                Whether you're seeking famous landmarks or hidden treasures, we
                have everything you need to make your journey unforgettable.
              </p>
              <button className="cta-button">Start Your Journey</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
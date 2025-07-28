// File path__
import "./Package.css";

// From react__
import { useState } from "react";

const Package = () => {
  const [tabActive, setTabActive] = useState(0);

  const tabs = [
    {
      id: 1,
      title: "Our Package",
    },
    {
      id: 2,
      title: "Meet Out Tour Guide",
    },
  ];

  return (
    <>
      <section id="package_section">
        <div className="main_package_container">
          <h1>Tourism & Travel Guide</h1>

          <div className="package_tab_container">
            <div className="tab_parent_container">
              {tabs.map((btn, index) => (
                <button
                  key={btn.id}
                  className={
                    index === tabActive ? "btn_active" : "btn_none_active"
                  }
                  onClick={() => setTabActive(index)}
                >
                  {btn.title}
                </button>
              ))}
            </div>
          </div>

          <div className="package_card_display_container">
            {tabActive === 0 && (
              <div className="package_card_main_container">
                <div className="package_image_container">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
                    alt="Card Image"
                  />
                </div>
                <div className="package_card_info_container">
                  <h3>Beach & Relaxation</h3>
                  <h2>Tropical Paradise Getaway</h2>
                  <p>7 days in beautiful tropical islands</p>
                  <span>$1,299</span>
                  <button>View Details</button>
                </div>
              </div>
            )}

            {tabActive === 1 && (
              <div className="guide_card_main_container">
                <div className="guide_image_container">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
                    alt="Guid Image"
                  />
                </div>
                <div className="guide_info_container">
                  <h2>Emma Rodriguez</h2>
                  <p>Beach & Island Guide</p>
                  <span>6 Years Experience</span>
                  <button>Details</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Package;
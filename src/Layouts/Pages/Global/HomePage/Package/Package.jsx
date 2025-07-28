// File path__
import "./Package.css";
import useAxiosPublic from "../../../../Hooks/useAxiosPublic";

// Package(REACT ROUTER)__
import { Link } from "react-router";

// From react__
import { useEffect, useState } from "react";

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
      title: "Meet Out Tour Guide",
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
              <>
                {packageLoading
                  ? "Package Loading..."
                  : packageData.map((item) => {
                      return (
                        <div
                          key={item._id}
                          className="package_card_main_container"
                        >
                          <div className="package_image_container">
                            <img src={item.images[0]} alt="Card Image" />
                          </div>
                          <div className="package_card_info_container">
                            <h3>{item.tourType}</h3>
                            <h2>{item.title}</h2>
                            <p>{item.duration}</p>
                            <span>${item.price}</span>
                            <Link to={`/package-details/${item._id}`}>
                              <button className="btn btn-primary">
                                View Details
                              </button>
                            </Link>
                          </div>
                        </div>
                      );
                    })}
              </>
            )}

            {tabActive === 1 && (
              <>
                {guideLoading
                  ? "Guide Loading..."
                  : guideData.map((guide) => (
                      <div
                        key={guide._id}
                        className="guide_card_main_container"
                      >
                        <div className="guide_image_container">
                          <img src={guide.userPhoto} alt="Guide Image" />
                        </div>
                        <div className="guide_info_container">
                          <h2>{guide.name}</h2>
                          <p>{guide.userRole || "Tour Guide"}</p>
                          <span>
                            {guide.userAddress || "2 Years Experience"}
                          </span>
                          <Link to={`/profile/${guide._id}`}>
                            <button className="btn btn-primary">
                              View profile
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Package;
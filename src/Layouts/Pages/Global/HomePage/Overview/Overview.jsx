// File path__
import "./Overview.css";

const Overview = () => {
  return (
    <>
      <section id="overview_section">
        <div className="main_overview_container">
          <h1>About Wanderlust Tours</h1>

          <div className="overview_inner_content_parent_container">
            <div
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="overview_content_one"
            >
              <iframe
                width="660"
                height="370"
                src="https://www.youtube.com/embed/T6INK2Ch1PY?si=JqxRlQyeu7QZt9Ml"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>

            <div className="overview_content_two">
              <h2>Your Gateway to World Exploration</h2>
              <p>
                We specialize in creating unforgettable travel experiences that
                connect you with the world's most beautiful destinations. From
                exotic beaches to mountain peaks, cultural tours to adventure
                expeditions, we make your travel dreams come true.
              </p>

              <div className="rating_info_container">
                <div
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="1200"
                  className="rating_container"
                >
                  <ul>
                    <li>500+</li>
                    <li>Happy Travelers</li>
                  </ul>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="1400"
                  className="rating_container"
                >
                  <ul>
                    <li>50+</li>
                    <li>Destinations</li>
                  </ul>
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="1600"
                  className="rating_container"
                >
                  <ul>
                    <li>5★</li>
                    <li>Average Rating</li>
                  </ul>
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
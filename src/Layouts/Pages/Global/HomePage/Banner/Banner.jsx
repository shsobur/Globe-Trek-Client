// File path__
import "./Banner.css";
import image1 from "../../../../../assets/banner-image/image-1.jpg";
import image2 from "../../../../../assets/banner-image/image-2.jpg";
import image3 from "../../../../../assets/banner-image/image-3.jpg";
import image4 from "../../../../../assets/banner-image/image-4.jpg";
import image5 from "../../../../../assets/banner-image/image-5.jpg";

// Package(REACT-CAROUSEL)__
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <>
      <section id="banner_section">
        <div className="main_banner_container">
          <Carousel
            showArrows={false}
            // autoPlay
            infiniteLoop={true}
            className="main_carousel"
          >
            <div className="banner_image">
              <img src={image1} />
            </div>

            <div className="banner_image">
              <img src={image2} />
            </div>

            <div className="banner_image">
              <img src={image3} />
            </div>

            <div className="banner_image">
              <img src={image4} />
            </div>

            <div className="banner_image">
              <img src={image5} />
            </div>
          </Carousel>
        </div>

        <div className="main_absolute_container">
          <div className="abs_inner_content">
            <h1>Discover Amazing Places</h1>
            <p>Your journey to extraordinary adventures begins here</p>
            <button>START YOU ADVENTURE</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
// File path__
import "./Footer.css";
import card from "../../../assets/footerCards.png";

// Imported package__
import { PiGithubLogoDuotone } from "react-icons/pi";
import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer>
        <div className="main_footer_outer_container">
          <div className="footer_upper_section_container">
            <div className="first_column_container">
              <div className="footer_logo_container">
                <h1>GlobeTrek</h1>
              </div>
              <p>
                We have clothes that suits your style and which you’re proud to
                wear. From women to men.
              </p>
              <div className="footer_social_icons">
                <h3>
                  <CiFacebook />
                </h3>
                <h3>
                  <CiInstagram />
                </h3>
                <h3>
                  <PiGithubLogoDuotone />
                </h3>
                <h3>
                  <CiTwitter />
                </h3>
              </div>
            </div>

            <div className="second_patent_column_container">
              <div className="second_child_section_container">
                <h3>Company</h3>
                <p>About</p>
                <p>Features</p>
                <p>Works</p>
                <p>Career</p>
              </div>

              <div className="second_child_section_container">
                <h3>Help</h3>
                <p>Customer Support</p>
                <p>Delivery Details</p>
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
              </div>

              <div className="second_child_section_container">
                <h3>FAQ</h3>
                <p>Account</p>
                <p>Manage Deliveries</p>
                <p>Orders</p>
                <p>Payments</p>
              </div>

              <div className="second_child_section_container">
                <h3>Resources</h3>
                <p>Free eBooks</p>
                <p>Development Tutorial</p>
                <p>How to - Blog</p>
                <p>Youtube Playlist</p>
              </div>
            </div>
          </div>

          <div className="footer_down_section_container">
            <h2>GlobeTrek © 2001-{currentYear}, All Rights Reserved</h2>
            <div className="footer_card_image_container">
              <img src={card} alt="image" />
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;
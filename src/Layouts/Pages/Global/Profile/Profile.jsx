// File path__
import "./Profile.css";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";

// Package(REACT ROUTER)__
import { useLoaderData } from "react-router";

const Profile = () => {
  const currentUserData = useLoaderData();

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <section id="profile_section">
        <div className="main_profile_container">
          <div className="profile_content_parent_container">
            <div className="profile_content_row_one">
              <div className="profile_image">
                <img src={currentUserData?.userPhoto} alt="Profile Image" />
              </div>
              <div className="profile_name_and_role">
                <ul className="profile_basic_info_one">
                  <li>{currentUserData?.userName}</li>
                  <li>{currentUserData?.userRole}</li>
                </ul>

                {currentUserData?.userRole !== "Admin" && (
                  <ul className="profile_basic_info_two">
                    <li className="profile_verify_style">
                      Status: Not-verified
                    </li>
                    {/* <li className="profile_not_verify_style">Status: Verified</li> */}
                  </ul>
                )}

                <ul className="profile_basic_info_three">
                  <h1>{currentUserData?.userBio}</h1>
                </ul>
              </div>
            </div>

            <hr />
            <hr />

            <div className="profile_content_row_two">
              <ul>
                <li>
                  Email: <span>{currentUserData?.userContactEmail}</span>
                </li>
                <li>
                  Address: <span>{currentUserData?.userAddress}</span>
                </li>
                <li>
                  Phone: <span>{currentUserData?.userContact}</span>
                </li>
                <li>
                  NID Number: <span>{currentUserData?.userNidNumber}</span>
                </li>
                <li>
                  Language: <span>{currentUserData?.languages}</span>
                </li>
                <li>
                  Available Status: <span>{currentUserData?.available}</span>
                </li>
              </ul>
            </div>

            <hr />
            <hr />

            {currentUserData?.userRole !== "Admin" && (
              <div className="profile_content_row_three">
                <h1>
                  <u>
                    <b>
                      <i>Experience:</i>
                    </b>
                  </u>
                </h1>
                <article>
                  Interactively simplify multidisciplinary expertise with
                  e-business experiences. Energistically pursue high-quality
                  mindshare rather than cross-platform relationships.
                  Competently transition tactical supply chains and ubiquitous.
                </article>
              </div>
            )}

            <hr />
            <hr />

            {currentUserData?.userRole !== "Admin" && (
              <div className="profile_content_row_four">
                <div className="profile_guide_rating_info">
                  <h3>Rating</h3>
                  <p>4.2 ★</p>
                </div>

                <div className="profile_guide_rating_info">
                  <h3>Booking Count</h3>
                  <p>03 🕒</p>
                </div>
              </div>
            )}

            <div className="profile_content_row_five">
              <h1>Join at: 22-06-2024</h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
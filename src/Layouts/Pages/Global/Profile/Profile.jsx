import "./Profile.css";

const Profile = () => {
  return (
    <>
      <section id="profile_section">
        <div className="main_profile_container">
          <div className="profile_content_parent_container">
            <div className="profile_content_row_one">
              <div className="profile_image">
                <img
                  src="https://img.freepik.com/free-photo/beautiful-girl-stands-park_8353-5084.jpg"
                  alt="Profile Image"
                />
              </div>
              <div className="profile_name_and_role">
                <ul className="profile_basic_info_one">
                  <li>SOBUR HOSSEN</li>
                  <li>Tour Guide</li>
                </ul>

                <ul className="profile_basic_info_two">
                  <li className="profile_verify_style">Status: Not-verified</li>
                  {/* <li className="profile_not_verify_style">Status: Verified</li> */}
                </ul>

                <ul className="profile_basic_info_three">
                  <h1>
                    Uniquely conceptualize go forward products through strategic
                    web. Competently facilitate just in time systems for fully.
                  </h1>
                </ul>
              </div>
            </div>

            <hr />
            <hr />

            <div className="profile_content_row_two">
              <ul>
                <li>
                  Email: <span>shsoburhossen951@gmail.com</span>
                </li>
                <li>
                  Address: <span>Bhola, Barishal, Bangladesh</span>
                </li>
                <li>
                  Phone: <span>+880 1787592274</span>
                </li>
                <li>
                  Gender: <span>Male</span>
                </li>
                <li>
                  NID Number: <span>20357089267</span>
                </li>
                <li>
                  Language: <span>Bangla, Hind, English</span>
                </li>
                <li>
                  Available Status: <span>Sun, Mun, Fri</span>
                </li>
              </ul>
            </div>

            <hr />
            <hr />

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
                mindshare rather than cross-platform relationships. Competently
                transition tactical supply chains and ubiquitous.
              </article>
            </div>

            <hr />
            <hr />

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
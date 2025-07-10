import useUserData from "../../../Hooks/useUserData";
import "./ManageProfile.css";

const ManageProfile = () => {
  const {currentUserData} = useUserData();
  console.log(currentUserData);

  return (
    <div className="profile__container">
      {/* Header Section */}
      <div className="profile__header">
        <h1 className="profile__welcome">Administrator Dashboard</h1>
        <p className="profile__subtitle">
          Welcome back, manage your platform with confidence
        </p>
      </div>

      {/* Stats Cards */}
      <div className="profile__statsRow">

        <div className="profile__statCard">
          <div className="profile__statIcon">💰</div>
          <div className="profile__statContent">
            <h3>Total Revenue</h3>
            <p>$58,000</p>
          </div>
        </div>

        <div className="profile__statCard">
          <div className="profile__statIcon">👥</div>
          <div className="profile__statContent">
            <h3>Tour Guides</h3>
            <p>120</p>
          </div>
        </div>

        <div className="profile__statCard">
          <div className="profile__statIcon">📦</div>
          <div className="profile__statContent">
            <h3>Active Packages</h3>
            <p>55</p>
          </div>
        </div>

        <div className="profile__statCard">
          <div className="profile__statIcon">🎯</div>
          <div className="profile__statContent">
            <h3>Total Clients</h3>
            <p>1,200</p>
          </div>
        </div>

        <div className="profile__statCard">
          <div className="profile__statIcon">📖</div>
          <div className="profile__statContent">
            <h3>Success Stories</h3>
            <p>42</p>
          </div>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="profile__infoSection">

        <div className="profile__headerRow">
          <h2>Administrator Profile</h2>
          <div className="profile__headerActions">
            <button className="profile__editBtn">Edit Profile</button>
          </div>
        </div>

        <div className="profile__content">
          <div className="profile__imageWrapper">
            <img
              src="https://img.freepik.com/free-photo/beautiful-girl-stands-park_8353-5084.jpg"
              alt="Administrator Profile"
              className="profile__image"
            />
            <div className="profile__statusBadge">Online</div>
          </div>

          <div className="profile__details">

            <div className="profile__detailRow">
              <span className="profile__label">Full Name</span>
              <span className="profile__value">{currentUserData?.userName}</span>
            </div>

            <div className="profile__detailRow">
              <span className="profile__label">Role</span>
              <span className="profile__value profile__badge">
                System Administrator
              </span>
            </div>

            <div className="profile__detailRow">
              <span className="profile__label">Bio</span>
              <span className="profile__value">
                Experienced tour management professional with over 8 years of
                expertise in creating exceptional travel experiences and
                managing high-performing teams.
              </span>
            </div>

            <div className="profile__detailRow">
              <span className="profile__label">Email Address</span>
              <span className="profile__value">{currentUserData?.userEmail}</span>
            </div>

            <div className="profile__detailRow">
              <span className="profile__label">Address</span>
              <span className="profile__value">
                123 Business District, Corporate Plaza, Suite 400
              </span>
            </div>

            <div className="profile__detailRow">
              <span className="profile__label">Contact Number</span>
              <span className="profile__value">+1 (555) 123-4567</span>
            </div>

            <div className="profile__detailRow">
              <span className="profile__label">NID Number</span>
              <span className="profile__value">2345202234</span>
            </div>

            <div className="profile__detailRow">
              <span className="profile__label">Languages</span>
              <span className="profile__value">
                English (Native), Spanish (Fluent), French (Intermediate)
              </span>
            </div>

            <div className="profile__detailRow">
              <span className="profile__label">Working Schedule</span>
              <span className="profile__value">
                Monday - Friday, 9:00 AM - 6:00 PM
              </span>
            </div>

            <div className="profile__detailRow">
              <span className="profile__label">Department</span>
              <span className="profile__value">Operations Management</span>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
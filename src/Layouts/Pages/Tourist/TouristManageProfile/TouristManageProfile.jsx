import React from "react";
import "./GuideManageProfile.css";
import useUserData from "../../../Hooks/useUserData";

const GuideManageProfile = () => {
  const { currentUserData } = useUserData();

  return (
    <div className="manage-profile-container">
      <div className="profile-header">
        <h1 className="welcome-message">
          Welcome, {currentUserData?.userName}!
        </h1>
        <p className="header-subtitle">Manage your profile information</p>
      </div>

      <div className="profile-content">
        <div className="profile-picture-section">
          <img
            src={currentUserData?.userPhoto}
            alt="Profile Picture"
            className="profile-picture"
          />
          <div className="role-badge">
            <span className="role-text">
              {currentUserData?.userRole === ""
                ? "No role"
                : currentUserData?.userRole}
            </span>
          </div>
        </div>

        <div className="profile-info-section">
          <div className="info-header">
            <h2>Profile Information</h2>
            <button className="edit-button">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Edit Profile
            </button>
          </div>

          <div className="info-grid">
            <div className="info-item">
              <label className="info-label">Full Name</label>
              <span className="info-value">
                {currentUserData?.userName || (
                  <span className="text-gray-500">(No Name)</span>
                )}
              </span>
            </div>

            <div className="info-item full-width">
              <label className="info-label">Bio</label>
              <span className="info-value">
                {currentUserData?.userBio || (
                  <span className="text-gray-500">(No Bio)</span>
                )}
              </span>
            </div>

            <div className="info-item">
              <label className="info-label">Email Address</label>
              <span className="info-value">
                {currentUserData?.userContactEmail || (
                  <span className="text-gray-500">(No Email Address)</span>
                )}
              </span>
            </div>

            <div className="info-item">
              <label className="info-label">Contact Number</label>
              <span className="info-value">
                {currentUserData?.userContact || (
                  <span className="text-gray-500">(No Contact Number)</span>
                )}
              </span>
            </div>

            <div className="info-item">
              <label className="info-label">NID Number</label>
              <span className="info-value">
                {currentUserData?.userNidNumber || (
                  <span className="text-gray-500">(No NID Number)</span>
                )}
              </span>
            </div>

            <div className="info-item">
              <label className="info-label">Languages</label>
              <div className="languages-container">
                {currentUserData?.languages ? (
                  currentUserData.languages.map((language, index) => (
                    <span key={index} className="language-tag">
                      {language}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">(No Languages)</span>
                )}
              </div>
            </div>

            <div className="info-item full-width">
              <label className="info-label">Address</label>
              <span className="info-value">
                {currentUserData?.userAddress || (
                  <span className="text-gray-500">(No Address)</span>
                )}
              </span>
            </div>

            <div className="info-item full-width">
              <label className="info-label">Working Schedule</label>
              <span className="info-value">
                {currentUserData?.available || (
                  <span className="text-gray-500">(No Working Schedule)</span>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideManageProfile;
import "./TouristManageProfile.css";
import useUserData from "../../../Hooks/useUserData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const TouristManageProfile = () => {
  const dialogRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const { currentUserData } = useUserData();
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const finalData = {
        userName: data.userName,
        userPhoto: data.userPhoto,
        userBio: data.userBio,
        userContactEmail: data.userContactEmail,
        userAddress: data.userAddress,
        userContact: data.userContact,
        userNidNumber: data.userNidNumber,
        languages: data.languages,
        available: data.available,
      };

      console.log(finalData);

      axiosSecure
        .patch(`/update-user-profile/${currentUserData.userEmail}`, finalData)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Profile updated successfully",
              icon: "success",
              draggable: true,
            });

            dialogRef.current.close();
            window.location.reload();
          }
        })
        .catch((error) => {
          console.error("Update failed:", error);
          Swal.fire({
            title: "Something went wrong!",
            text: "Please try again later.",
            icon: "error",
          });
        });
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click
  const handleEditClick = () => {
    // Reset form with current data before opening modal
    reset({
      userName: currentUserData?.userName || "",
      userPhoto: currentUserData?.userPhoto || "",
      userBio: currentUserData?.userBio || "",
      userContactEmail: currentUserData?.userContactEmail || "",
      userAddress: currentUserData?.userAddress || "",
      userContact: currentUserData?.userContact || "",
      userNidNumber: currentUserData?.userNidNumber || "",
      languages: currentUserData?.languages || "",
      available: currentUserData?.available || "",
    });
    dialogRef.current.showModal();
  };

  return (
    <div className="manage-profile-container">
      {/* Profile edit modal */}
      <dialog
        ref={dialogRef}
        className="modal"
        onClick={(e) =>
          e.target === dialogRef.current && dialogRef.current.close()
        }
      >
        <div
          className="modal-box max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={() => dialogRef.current.close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            aria-label="Close modal"
          >
            ✕
          </button>

          <h3 className="text-2xl font-bold text-blue-700 mb-6">
            Edit Profile Information
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label
                htmlFor="nameInput"
                className="block mb-1 font-semibold text-gray-700"
              >
                Name
              </label>
              <input
                id="nameInput"
                type="text"
                {...register("userName")}
                className="w-full input input-bordered"
              />
            </div>

            <div>
              <label
                htmlFor="imageInput"
                className="block mb-1 font-semibold text-gray-700"
              >
                Profile Image URL
              </label>
              <input
                id="imageInput"
                type="text"
                {...register("userPhoto")}
                className="w-full input input-bordered"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="bioInput"
                className="block mb-1 font-semibold text-gray-700"
              >
                Bio
              </label>
              <textarea
                id="bioInput"
                rows="3"
                placeholder="Tell about yourself"
                {...register("userBio")}
                className="w-full textarea textarea-bordered"
              />
            </div>

            <div>
              <label
                htmlFor="emailInput"
                className="block mb-1 font-semibold text-gray-700"
              >
                Email Address
              </label>
              <input
                id="emailInput"
                type="email"
                {...register("userContactEmail")}
                className="w-full input input-bordered"
              />
            </div>

            <div>
              <label
                htmlFor="addressInput"
                className="block mb-1 font-semibold text-gray-700"
              >
                Address
              </label>
              <input
                id="addressInput"
                type="text"
                placeholder="Bangladesh, Barisal"
                {...register("userAddress")}
                className="w-full input input-bordered"
              />
            </div>

            <div>
              <label
                htmlFor="phoneInput"
                className="block mb-1 font-semibold text-gray-700"
              >
                Contact Number
              </label>
              <input
                id="phoneInput"
                type="text"
                placeholder="+880 123456789"
                {...register("userContact")}
                className="w-full input input-bordered"
              />
            </div>

            <div>
              <label
                htmlFor="nidInput"
                className="block mb-1 font-semibold text-gray-700"
              >
                NID Number
              </label>
              <input
                id="nidInput"
                type="text"
                placeholder="0123456789"
                {...register("userNidNumber")}
                className="w-full input input-bordered"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="languagesInput"
                className="block mb-1 font-semibold text-gray-700"
              >
                Languages
              </label>
              <input
                id="languagesInput"
                type="text"
                placeholder="Bangla (Native), English (Proficient)"
                {...register("languages")}
                className="w-full input input-bordered"
              />
            </div>

            <div className="md:col-span-2">
              <label
                htmlFor="scheduleInput"
                className="block mb-1 font-semibold text-gray-700"
              >
                Working Schedule
              </label>
              <input
                id="scheduleInput"
                type="text"
                placeholder="Su - Th, 9:00Am - 10:00Pm"
                {...register("available")}
                className="w-full input input-bordered"
              />
            </div>

            <div className="md:col-span-2 text-right mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Profile content */}
      <div className="profile-header">
        <h1 className="welcome-message">
          Welcome, {currentUserData?.userName}!
        </h1>
        <p className="header-subtitle">Manage your profile information</p>
      </div>

      <div className="profile-content">
        <div className="profile-picture-section">
          <img
            src={
              currentUserData?.userPhoto || "https://via.placeholder.com/150"
            }
            alt="Profile Picture"
            className="profile-picture"
          />
          <div className="role-badge">
            <span className="role-text">
              {currentUserData?.userRole || "No role"}
            </span>
          </div>
        </div>

        <div className="profile-info-section">
          <div className="info-header">
            <h2>Profile Information</h2>
            <button onClick={handleEditClick} className="edit-button">
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
                  <span className="language-tag">
                    {currentUserData.languages}
                  </span>
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

export default TouristManageProfile;
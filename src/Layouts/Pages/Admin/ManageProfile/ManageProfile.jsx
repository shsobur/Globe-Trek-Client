// File path__
import "./ManageProfile.css";
import useUserData from "../../../Hooks/useUserData";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";

// Package(REACT-HOOK-FORM, SWEET ALERT)__
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

// From react__
import { useEffect, useRef, useState } from "react";

const ManageProfile = () => {
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState({});
  const { currentUserData } = useUserData();
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get("/admin-dashboard-stats").then((res) => {
      if (res.data) {
        setStatus(res.data);
        setStatusLoading(false);
      } else
        (error) => {
          setStatusLoading(false);
          console.log(error);
        };
    });
  }, [axiosSecure]);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const finalData = {
        userName:
          data.userName === "" ? currentUserData?.userName : data.userName,
        userPhoto:
          data.userPhoto === "" ? currentUserData?.userPhoto : data.userPhoto,
        userBio: data.userBio === "" ? currentUserData?.userBio : data.userBio,
        userContactEmail:
          data.userContactEmail === ""
            ? currentUserData?.userContactEmail
            : data.userContactEmail,
        userAddress:
          data.userAddress === ""
            ? currentUserData?.userAddress
            : data.userAddress,
        userContact:
          data.userContact === ""
            ? currentUserData?.userContact
            : data.userContact,
        userNidNumber:
          data.userNidNumber === ""
            ? currentUserData?.userNidNumber
            : data.userNidNumber,
        languages:
          data.languages === "" ? currentUserData?.languages : data.languages,
        available:
          data.available === "" ? currentUserData?.available : data.available,
      };

      axiosSecure
        .patch(`/update-user-profile/${currentUserData.userEmail}`, finalData)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Profile updated successfully",
              icon: "success",
              draggable: true,
            });

            reset();
            closeModal();
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

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <div className="admin-profile__container">
        {/* Header Section - Matching Our Design Pattern */}
        <div className="admin-profile__header">
          <h1 className="admin-profile__title">
            Administrator{" "}
            <span className="admin-profile__title-accent font-playfair">Dashboard</span>
          </h1>
          <div className="admin-profile__title-underline"></div>
          <p className="admin-profile__subtitle">
            Welcome back, manage your platform with confidence
          </p>
        </div>

        {/* Stats Cards */}
        <div className="admin-profile__stats-grid">
          <div className="admin-profile__stat-card">
            <div className="admin-profile__stat-icon">💰</div>
            <div className="admin-profile__stat-content">
              <h3>Total Revenue</h3>
              <p>৳{statusLoading ? "..." : status?.totalIncome / 100}</p>
            </div>
          </div>

          <div className="admin-profile__stat-card">
            <div className="admin-profile__stat-icon">👥</div>
            <div className="admin-profile__stat-content">
              <h3>Tour Guides</h3>
              <p>{statusLoading ? "..." : status?.totalGuide}</p>
            </div>
          </div>

          <div className="admin-profile__stat-card">
            <div className="admin-profile__stat-icon">📦</div>
            <div className="admin-profile__stat-content">
              <h3>Active Packages</h3>
              <p>{statusLoading ? "..." : status?.totalPackage}</p>
            </div>
          </div>

          <div className="admin-profile__stat-card">
            <div className="admin-profile__stat-icon">🎯</div>
            <div className="admin-profile__stat-content">
              <h3>Total Clients</h3>
              <p>{statusLoading ? "..." : status?.totalTourist}</p>
            </div>
          </div>

          <div className="admin-profile__stat-card">
            <div className="admin-profile__stat-icon">📖</div>
            <div className="admin-profile__stat-content">
              <h3>Success Stories</h3>
              <p>{statusLoading ? "..." : status?.totalTour}</p>
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="admin-profile__info-section">
          <div className="admin-profile__section-header">
            <h2>Administrator Profile</h2>
            <div className="admin-profile__header-actions">
              <button onClick={openModal} className="admin-profile__edit-btn">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="admin-profile__content">
            <div className="admin-profile__image-section">
              <div className="admin-profile__image-wrapper">
                <img
                  src={currentUserData?.userPhoto}
                  alt="Administrator Profile"
                  className="admin-profile__image"
                />
                <div className="admin-profile__status">Online</div>
              </div>
            </div>

            <div className="admin-profile__details">
              <div className="admin-profile__detail-row">
                <span className="admin-profile__label">Full Name</span>
                <span className="admin-profile__value">
                  {currentUserData?.userName}
                </span>
              </div>

              <div className="admin-profile__detail-row">
                <span className="admin-profile__label">Role</span>
                <span className="admin-profile__badge">
                  {currentUserData?.userRole === "Admin" &&
                    "System Administrator"}
                </span>
              </div>

              <div className="admin-profile__detail-row">
                <span className="admin-profile__label">Bio</span>
                <span className="admin-profile__value">
                  {currentUserData?.userBio || (
                    <span className="admin-profile__empty">(No Bio)</span>
                  )}
                </span>
              </div>

              <div className="admin-profile__detail-row">
                <span className="admin-profile__label">Email Address</span>
                <span className="admin-profile__value">
                  {currentUserData?.userEmail}
                </span>
              </div>

              <div className="admin-profile__detail-row">
                <span className="admin-profile__label">Address</span>
                <span className="admin-profile__value">
                  {currentUserData?.userAddress || (
                    <span className="admin-profile__empty">(No Address)</span>
                  )}
                </span>
              </div>

              <div className="admin-profile__detail-row">
                <span className="admin-profile__label">Contact Number</span>
                <span className="admin-profile__value">
                  {currentUserData?.userContact || (
                    <span className="admin-profile__empty">(No Contact)</span>
                  )}
                </span>
              </div>

              <div className="admin-profile__detail-row">
                <span className="admin-profile__label">NID Number</span>
                <span className="admin-profile__value">
                  {currentUserData?.userNidNumber || (
                    <span className="admin-profile__empty">
                      (No NID Number)
                    </span>
                  )}
                </span>
              </div>

              <div className="admin-profile__detail-row">
                <span className="admin-profile__label">Languages</span>
                <span className="admin-profile__value">
                  {currentUserData?.languages || (
                    <span className="admin-profile__empty">(No Language)</span>
                  )}
                </span>
              </div>

              <div className="admin-profile__detail-row">
                <span className="admin-profile__label">Working Schedule</span>
                <span className="admin-profile__value">
                  {currentUserData?.available || (
                    <span className="admin-profile__empty">(No Schedule)</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* DaisyUI Modal */}
        <dialog ref={modalRef} className="modal">
          <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h3 className="font-bold text-2xl text-[#2c5282] mb-6 text-center">
              Edit Profile Information
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-[#2c5282]">
                      Name
                    </span>
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUserData?.userName}
                    {...register("userName")}
                    className="input input-bordered w-full focus:border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-20"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-[#2c5282]">
                      Profile Image URL
                    </span>
                  </label>
                  <input
                    type="text"
                    defaultValue={currentUserData?.userPhoto}
                    {...register("userPhoto")}
                    className="input input-bordered w-full focus:border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-20"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold text-[#2c5282]">
                      Bio
                    </span>
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Tell about yourself"
                    defaultValue={currentUserData?.userBio}
                    {...register("userBio")}
                    className="textarea textarea-bordered w-full focus:border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-20"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-[#2c5282]">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    defaultValue={currentUserData?.userEmail}
                    {...register("userContactEmail")}
                    className="input input-bordered w-full focus:border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-20"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-[#2c5282]">
                      Address
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bangladesh, Barisal"
                    defaultValue={currentUserData?.userAddress}
                    {...register("userAddress")}
                    className="input input-bordered w-full focus:border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-20"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-[#2c5282]">
                      Contact Number
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="+880 123456789"
                    defaultValue={currentUserData?.userContact}
                    {...register("userContact")}
                    className="input input-bordered w-full focus:border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-20"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-[#2c5282]">
                      NID Number
                    </span>
                  </label>
                  <input
                    type="number"
                    placeholder="0123456789"
                    defaultValue={currentUserData?.userNidNumber}
                    {...register("userNidNumber")}
                    className="input input-bordered w-full focus:border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-20"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold text-[#2c5282]">
                      Languages
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Bangla (Native), English (Proficient)"
                    defaultValue={currentUserData?.languages}
                    {...register("languages")}
                    className="input input-bordered w-full focus:border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-20"
                  />
                </div>

                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text font-semibold text-[#2c5282]">
                      Working Schedule
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Su - Th, 9:00Am - 10:00Pm"
                    defaultValue={currentUserData?.available}
                    {...register("available")}
                    className="input input-bordered w-full focus:border-[#87ceeb] focus:ring-2 focus:ring-[#87ceeb] focus:ring-opacity-20"
                  />
                </div>
              </div>

              <div className="modal-action">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-[#2c5282] text-white hover:bg-[#1e3a8a] border-none"
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

                <form method="dialog">
                  <button className="btn btn-ghost">Cancel</button>
                </form>
              </div>
            </form>
          </div>

          {/* Modal backdrop */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

export default ManageProfile;
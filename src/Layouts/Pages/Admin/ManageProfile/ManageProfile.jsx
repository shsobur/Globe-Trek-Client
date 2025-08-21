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
  const dialogRef = useRef(null);
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

  return (
    <>
      <ScrollToTop></ScrollToTop>
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
              <p>৳{statusLoading ? "..." : status?.totalIncome / 100}</p>
            </div>
          </div>

          <div className="profile__statCard">
            <div className="profile__statIcon">👥</div>
            <div className="profile__statContent">
              <h3>Tour Guides</h3>
              <p>{statusLoading ? "..." : status?.totalGuide}</p>
            </div>
          </div>

          <div className="profile__statCard">
            <div className="profile__statIcon">📦</div>
            <div className="profile__statContent">
              <h3>Active Packages</h3>
              <p>{statusLoading ? "..." : status?.totalPackage}</p>
            </div>
          </div>

          <div className="profile__statCard">
            <div className="profile__statIcon">🎯</div>
            <div className="profile__statContent">
              <h3>Total Clients</h3>
              <p>{statusLoading ? "..." : status?.totalTourist}</p>
            </div>
          </div>

          <div className="profile__statCard">
            <div className="profile__statIcon">📖</div>
            <div className="profile__statContent">
              <h3>Success Stories</h3>
              <p>{statusLoading ? "..." : status?.totalTour}</p>
            </div>
          </div>
        </div>

        {/* Profile Info Section */}
        <div className="profile__infoSection">
          <div className="profile__headerRow">
            <h2>Administrator Profile</h2>
            <div className="profile__headerActions">
              <button
                onClick={() => dialogRef.current.showModal()}
                className="profile__editBtn"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Edit profile modal */}
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
                    defaultValue={currentUserData?.userName}
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
                    defaultValue={currentUserData?.userPhoto}
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
                    defaultValue={currentUserData?.userBio}
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
                    defaultValue={currentUserData?.userEmail}
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
                    defaultValue={currentUserData?.userAddress}
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
                    defaultValue={currentUserData?.userContact}
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
                    type="number"
                    placeholder="0123456789"
                    defaultValue={currentUserData?.userNidNumber}
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
                    defaultValue={currentUserData?.languages}
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
                    defaultValue={currentUserData?.available}
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

          <div className="profile__content">
            <div className="profile__imageWrapper">
              <img
                src={currentUserData?.userPhoto}
                alt="Administrator Profile"
                className="profile__image"
              />
              <div className="profile__statusBadge">Online</div>
            </div>

            <div className="profile__details">
              <div className="profile__detailRow">
                <span className="profile__label">Full Name</span>
                <span className="profile__value">
                  {currentUserData?.userName}
                </span>
              </div>

              <div className="profile__detailRow">
                <span className="profile__label">Role</span>
                <span className="profile__value profile__badge">
                  {currentUserData?.userRole === "Admin" &&
                    "System Administrator"}
                </span>
              </div>

              <div className="profile__detailRow">
                <span className="profile__label">Bio</span>
                <span className="profile__value">
                  {currentUserData?.userBio || (
                    <span className="text-gray-500">(No Bio)</span>
                  )}
                </span>
              </div>

              <div className="profile__detailRow">
                <span className="profile__label">Email Address</span>
                <span className="profile__value">
                  {currentUserData?.userEmail}
                </span>
              </div>

              <div className="profile__detailRow">
                <span className="profile__label">Address</span>
                <span className="profile__value">
                  {currentUserData?.userAddress || (
                    <span className="text-gray-500">(No Address)</span>
                  )}
                </span>
              </div>

              <div className="profile__detailRow">
                <span className="profile__label">Contact Number</span>
                <span className="profile__value">
                  {currentUserData?.userContact || (
                    <span className="text-gray-500">(No Contact)</span>
                  )}
                </span>
              </div>

              <div className="profile__detailRow">
                <span className="profile__label">NID Number</span>
                <span className="profile__value">
                  {currentUserData?.userNidNumber || (
                    <span className="text-gray-500">(No NID Number)</span>
                  )}
                </span>
              </div>

              <div className="profile__detailRow">
                <span className="profile__label">Languages</span>
                <span className="profile__value">
                  {currentUserData?.languages || (
                    <span className="text-gray-500">(No Language)</span>
                  )}
                </span>
              </div>

              <div className="profile__detailRow">
                <span className="profile__label">Working Schedule</span>
                <span className="profile__value">
                  {currentUserData?.available || (
                    <span className="text-gray-500">(No Schedule)</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageProfile;
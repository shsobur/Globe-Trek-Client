// File path__
import "./ManageUser.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import ScrollToTop from "../../../Components/ScrollToTop/ScrollToTop";

// Package(SWEET ALERT, REACT ROUTER)__
import Swal from "sweetalert2";
import { Link } from "react-router";

// From react__
import { useEffect, useState } from "react";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [useBlockLoading, setUserBlockLoading] = useState(false);
  const [userDataLoading, setUserDataLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUserDataLoading(true);
        const res = await axiosSecure.get("/get-all-users", {
          params: {
            search: searchText,
            role: selectedRole,
          },
        });
        setAllUsers(res.data);
        setUserDataLoading(false);
      } catch (err) {
        setUserDataLoading(false);
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, [searchText, selectedRole, axiosSecure]);

  const handleUserNormalStatus = (id) => {
    const nweStatus = { status: "Block" };

    Swal.fire({
      title: "Are you sure?",
      text: "You want to block this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Block",
    }).then((result) => {
      if (result.isConfirmed) {
        setUserBlockLoading(true);
        axiosSecure
          .patch(`/update-user-status/${id}`, nweStatus)
          .then((res) => {
            if (res.data.modifiedCount) {
              axiosSecure
                .get("/get-all-users", {
                  params: { search: searchText, role: selectedRole },
                })
                .then((res) => {
                  if (res.data) {
                    setAllUsers(res.data);
                    setUserBlockLoading(false);
                    Swal.fire({
                      title: "Blocked!",
                      text: "User is blocked!",
                      icon: "success",
                    });
                  }
                })
                .catch((error) => {
                  setUserBlockLoading(false);
                  console.log(error);
                });
            }
          });
      }
    });
  };

  const handleUserBlockStatus = (id) => {
    const nweStatus = { status: "Normal" };

    Swal.fire({
      title: "Are you sure?",
      text: "You want to unblock this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unblock",
    }).then((result) => {
      if (result.isConfirmed) {
        setUserBlockLoading(true);
        axiosSecure
          .patch(`/update-user-status/${id}`, nweStatus)
          .then((res) => {
            if (res.data.modifiedCount) {
              axiosSecure
                .get("/get-all-users", {
                  params: { search: searchText, role: selectedRole },
                })
                .then((res) => {
                  if (res.data) {
                    setAllUsers(res.data);
                    setUserBlockLoading(false);
                    Swal.fire({
                      title: "Unblocked!",
                      text: "User is unblocked!",
                      icon: "success",
                    });
                  }
                })
                .catch((error) => {
                  setUserBlockLoading(false);
                  console.log(error);
                });
            }
          });
      }
    });
  };

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <div className="manage-users__container">
        {/* Header Section - Matching Our Design Pattern */}
        <div className="manage-users__header">
          <h1 className="manage-users__title">
            Manage <span className="manage-users__title-accent">Users</span>
          </h1>
          <div className="manage-users__title-underline"></div>
          <p className="manage-users__subtitle">
            Manage user accounts, roles, and access permissions
          </p>
        </div>

        {/* Filter Section */}
        <div className="manage-users__filters">
          <div className="manage-users__search-box">
            <input
              type="text"
              placeholder="Search by name or email..."
              className="manage-users__search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <span className="manage-users__search-icon">🔍</span>
          </div>

          <select
            className="manage-users__filter-select"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Tourist">Tourist</option>
            <option value="Tour Guide">Tour Guide</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="manage-users__table-container">
          <table className="manage-users__table">
            <thead className="manage-users__table-header">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="manage-users__table-body">
              {allUsers.length > 0 ? (
                allUsers.map((user) => (
                  <tr key={user._id} className="manage-users__table-row">
                    <td className="manage-users__user-name">{user.userName}</td>
                    <td>
                      <span
                        className={`manage-users__role-badge manage-users__role-${user.userRole
                          ?.toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {user.userRole}
                      </span>
                    </td>
                    <td className="manage-users__user-email">
                      {user.userEmail}
                    </td>
                    <td>
                      <span className="manage-users__gender">
                        {user.gender || "Not specified"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`manage-users__status manage-users__status-${user.status?.toLowerCase()}`}
                      >
                        {user.status || "Active"}
                      </span>
                    </td>
                    <td>
                      <div className="manage-users__actions">
                        {user.userRole !== "Admin" && (
                          <>
                            {user.status === "Normal" && (
                              <button
                                onClick={() => handleUserNormalStatus(user._id)}
                                className="manage-users__block-btn"
                                disabled={useBlockLoading}
                              >
                                {useBlockLoading ? (
                                  <div className="manage-users__btn-loading">
                                    <div className="manage-users__btn-spinner"></div>
                                    Blocking...
                                  </div>
                                ) : (
                                  "Block User"
                                )}
                              </button>
                            )}

                            {user.status === "Block" && (
                              <button
                                onClick={() => handleUserBlockStatus(user._id)}
                                className="manage-users__unblock-btn"
                                disabled={useBlockLoading}
                              >
                                Unblock User
                              </button>
                            )}
                          </>
                        )}

                        {user.userRole !== "Admin" && (
                          <Link
                            to={`/profile/${user._id}`}
                            className="manage-users__profile-btn"
                          >
                            View Profile
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="manage-users__empty-row">
                  <td colSpan="6">
                    <div className="manage-users__empty-state">
                      {userDataLoading ? (
                        <div className="manage-users__loading">
                          <div className="manage-users__loading-spinner"></div>
                          <p>Loading user data...</p>
                          <span>Please wait while we fetch the users</span>
                        </div>
                      ) : (
                        <div className="manage-users__no-users">
                          <div className="manage-users__no-users-icon">👥</div>
                          <p>No users found</p>
                          <span>Try adjusting your search or filters</span>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default ManageUser;

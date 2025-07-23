// File path__
import "./ManageUser.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// From react__
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [useBlockLoading, setUserBlockLoading] = useState(false);

  // Fetch users from backend with filters
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/get-all-users", {
          params: {
            search: searchText,
            role: selectedRole,
          },
        });
        setAllUsers(res.data);
      } catch (err) {
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
    <div className="manage__container">
      <h2 className="manage__title">Manage Users</h2>

      <div className="manage__filterRow">
        <input
          type="text"
          placeholder="Search by name or email"
          className="manage__search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="manage__dropdown"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">Filter by Role</option>
          <option value="Admin">Admin</option>
          <option value="Tourist">Tourist</option>
          <option value="Tour Guide">Tour Guide</option>
        </select>
      </div>

      <table className="user__table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.length > 0 ? (
            allUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.userName}</td>
                <td>{user.userRole}</td>
                <td>{user.userEmail}</td>
                <td>{user.gender}</td>
                <td>
                  {user.userRole !== "Admin" && (
                    <>
                      {user.status === "Normal" && (
                        <button
                          onClick={() => handleUserNormalStatus(user._id)}
                          className="block__btn"
                        >
                          {useBlockLoading ? "Blocking..." : "Block"}
                        </button>
                      )}

                      {user.status === "Block" && (
                        <button
                          onClick={() => handleUserBlockStatus(user._id)}
                          className="unblock__btn"
                        >
                          Unblock
                        </button>
                      )}
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;

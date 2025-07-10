// File path__
import "./ManageUser.css";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

// From react__
import React, { useEffect, useState } from "react";

const ManageUser = () => {
  const axiosSecure = useAxiosSecure();
  const [allUsers, setAllUsers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

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
                  <button className="block__btn">Block</button>
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

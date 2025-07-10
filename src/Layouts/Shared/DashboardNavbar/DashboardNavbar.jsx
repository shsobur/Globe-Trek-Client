import { NavLink } from "react-router";
import {
  FcHome,
  FcList,
  FcRedo,
  FcExternal,
  FcBinoculars,
  FcAddDatabase,
} from "react-icons/fc";
import useUserData from "../../Hooks/useUserData";

const DashboardNavbar = () => {
  const { currentUserData } = useUserData();
  const userRole = currentUserData?.userRole;

  return (
    <>
      <section>
        <h2 className="text-3xl text-[#2a75b3] font-semibold pb-5">
          Dashboard Menu
        </h2>

        {/* Tourist Navbar */}
        {userRole === "Tourist" && (
          <nav className="flex flex-col items-start space-y-8 text-lg">
            <NavLink
              to="/dashboard/manage-profile-tourist"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-3 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcBinoculars size={28} /> Manage profile
            </NavLink>

            <NavLink
              to="/dashboard/my-bookings-tourist"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcAddDatabase size={30} /> My Bookings
            </NavLink>

            <NavLink
              to="/dashboard/manage-stories-tourist"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcExternal size={30} /> Manage Stories
            </NavLink>

            <NavLink
              to="/dashboard/add-stories-tourist"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcList size={25} /> Add Stories
            </NavLink>

            <NavLink
              to="/dashboard/join-as-tour-guide-tourist"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcList size={25} /> Join as tour guide
            </NavLink>

            <p className="w-full border border-[#2a75b3]"></p>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#2a75b3] text-white flex justify-start items-end gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcHome size={28} /> Home
            </NavLink>

            <button className="flex items-center gap-2">
              <FcRedo size={25} /> Logout
            </button>
          </nav>
        )}

        {/* Guide Navbar */}
        {userRole === "Tour Guide" && (
          <nav className="flex flex-col items-start space-y-8 text-lg">
            <NavLink
              to="/dashboard/manage-profile-guide"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-3 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcBinoculars size={28} /> Manage profile
            </NavLink>

            <NavLink
              to="/dashboard/my-assigned-tours-guide"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcAddDatabase size={30} /> My Assigned Tours
            </NavLink>

            <NavLink
              to="/dashboard/add-stories-guide"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcExternal size={30} /> Add Stories
            </NavLink>

            <NavLink
              to="/dashboard/manage-stories-guide"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcList size={25} /> Manage Stories
            </NavLink>

            <p className="w-full border border-[#2a75b3]"></p>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#2a75b3] text-white flex justify-start items-end gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcHome size={28} /> Home
            </NavLink>

            <button className="flex items-center gap-2">
              <FcRedo size={25} /> Logout
            </button>
          </nav>
        )}

        {/* Amin Navbar__ */}

        {userRole === "Admin" && (
          <nav className="flex flex-col items-start space-y-8 text-lg">
            <NavLink
              to="/dashboard/manage-profile-admin"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-3 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcBinoculars size={28} /> Manage profile
            </NavLink>

            <NavLink
              to="/dashboard/admin-add-package"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcAddDatabase size={30} /> Add Package
            </NavLink>

            <NavLink
              to="/dashboard/add-stories-admin"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcExternal size={30} /> Add Stories
            </NavLink>

            <NavLink
              to="/dashboard/admin-manage-user"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcList size={25} /> Manage user
            </NavLink>

            <NavLink
              to="/dashboard/manage-candidates-admin"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcList size={25} /> Manage Candidates
            </NavLink>

            <p className="w-full border border-[#2a75b3]"></p>

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#2a75b3] text-white flex justify-start items-end gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <FcHome size={28} /> Home
            </NavLink>

            <button className="flex items-center gap-2">
              <FcRedo size={25} /> Logout
            </button>
          </nav>
        )}
      </section>
    </>
  );
};

export default DashboardNavbar;

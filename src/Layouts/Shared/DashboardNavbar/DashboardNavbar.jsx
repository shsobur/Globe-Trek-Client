// File path__
import useUserData from "../../Hooks/useUserData";

// From react__
import { NavLink } from "react-router";

// Package(REACT ICONS)__
import { BiImageAdd } from "react-icons/bi";
import { BsDatabaseAdd } from "react-icons/bs";
import { TbBrandBooking } from "react-icons/tb";
import { FcHome, FcRedo } from "react-icons/fc";
import {
  MdAddChart,
  MdManageSearch,
  MdOutlineManageSearch,
  MdOutlineManageAccounts,
} from "react-icons/md";
import {
  VscGitPullRequest,
  VscGitPullRequestGoToChanges,
} from "react-icons/vsc";

const DashboardNavbar = () => {
  const { currentUserData } = useUserData();
  const userRole = currentUserData?.userRole;

  return (
    <>
      <section>
        <h2 className="text-3xl text-[#2a75b3] font-semibold pb-5">
          Dashboard Menu
        </h2>

        {/* Tourist Navbar__ */}
        {userRole === "Tourist" && (
          <nav className="flex flex-col items-start space-y-8 text-lg">
            <NavLink
              to="/dashboard/tourist-manage-profile"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-3 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <MdOutlineManageAccounts size={30} /> Manage profile
            </NavLink>

            <NavLink
              to="/dashboard/tourist-manage-booking"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <TbBrandBooking size={30} /> My Bookings
            </NavLink>

            <NavLink
              to="/dashboard/tourist-add-stories"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <BiImageAdd size={30} /> Add Stories
            </NavLink>

            <NavLink
              to="/dashboard/tourist-manage-story"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <MdManageSearch size={28} /> Manage Stories
            </NavLink>

            <NavLink
              to="/dashboard/tourist-guide-request"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <VscGitPullRequest size={26} /> Join as tour guide
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

        {/* Guide Navbar__ */}
        {userRole === "Tour Guide" && (
          <nav className="flex flex-col items-start space-y-8 text-lg">
            <NavLink
              to="/dashboard/guide-manage-profile"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-3 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <MdOutlineManageAccounts size={30} /> Manage profile
            </NavLink>

            <NavLink
              to="/dashboard/guide-package-booking"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <MdAddChart size={28} /> My Assigned Tours
            </NavLink>

            <NavLink
              to="/dashboard/guide-add-stories"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <BiImageAdd size={30} /> Add Stories
            </NavLink>

            <NavLink
              to="/dashboard/guide-manage-stories"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <MdManageSearch size={28} /> Manage Stories
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

        {/* Admin Navbar__ */}

        {userRole === "Admin" && (
          <nav className="flex flex-col items-start space-y-8 text-lg">
            <NavLink
              to="/dashboard/admin-manage-profile"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-3 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <MdOutlineManageAccounts size={28} /> Manage profile
            </NavLink>

            <NavLink
              to="/dashboard/admin-add-package"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <BsDatabaseAdd size={26} /> Add Package
            </NavLink>

            <NavLink
              to="/dashboard/admin-manage-user"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <MdOutlineManageSearch size={28} /> Manage user
            </NavLink>

            <NavLink
              to="/dashboard/admin-manage-candidates"
              className={({ isActive }) =>
                isActive
                  ? "w-full p-2 rounded-md bg-[#2a75b3] text-white flex items-center gap-2"
                  : "flex items-center gap-2 w-full text-black p-2 rounded-md hover:bg-[#0060af2f]"
              }
            >
              <VscGitPullRequestGoToChanges size={25} /> Manage Candidates
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

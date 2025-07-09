import { useState } from "react";
import { Outlet } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa";
import DashboardNavbar from "../Shared/DashboardNavbar/DashboardNavbar";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <section className="max-w-[1920px] m-auto">
        <div className="flex h-screen">
          {/* Sidebar */}
          <div
            className={`bg-gray-100 text-black w-72 p-4 space-y-4 absolute md:relative z-10 h-full transform ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:translate-x-0`}
          >
            {/* Close button (mobile only) */}
            <div className="md:hidden flex justify-end">
              <button onClick={closeMenu}>
                <FaTimes size={20} />
              </button>
            </div>

            <DashboardNavbar></DashboardNavbar>
          </div>

          {/* Content area */}
          <div className="flex-1 overflow-auto w-full">
            {/* Toggle menu button (mobile only) */}
            <div className="md:hidden mb-4">
              <button onClick={toggleMenu}>
                <FaBars size={20} />
              </button>
            </div>

            <Outlet />
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardLayout;

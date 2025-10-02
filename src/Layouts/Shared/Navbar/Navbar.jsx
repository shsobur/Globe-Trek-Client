// File path__
import "./Navbar.css";
import React, { useState, useEffect, useRef } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaUsers,
  FaMapMarkedAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import useUserData from "../../Hooks/useUserData";

const Navbar = () => {
  const menuRef = useRef();
  const { user, logOut } = React.useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUserData } = useUserData();
  const userRole = currentUserData?.userRole;

  // Handle scroll behavior
  useEffect(() => {
    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setIsScrollingDown(true);
      } else {
        setIsScrollingDown(false);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  // Sign Out function
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to sign out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f70000",
      cancelButtonColor: "#007c01",
      confirmButtonText: "Yes, Sign out",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "Finished!",
            text: "Sign out successfully",
            icon: "success",
          });
        });
      }
    });
    setOpen(false);
  };

  return (
    <nav
      className={`navbar ${
        isScrollingDown ? "navbar--hidden" : "navbar--visible"
      }`}
    >
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__logo">
          <Link to="/" className="navbar__logo-link">
            <span className="navbar__logo-text">GlobeTaek</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="navbar__desktop">
          <ul className="navbar__menu">
            <li className="navbar__item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                <FaHome className="navbar__icon" />
                Home
              </NavLink>
            </li>

            <li className="navbar__item">
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                <FaUsers className="navbar__icon" />
                Community
              </NavLink>
            </li>

            {user && (
              <li className="navbar__item">
                <NavLink
                  to="/trips"
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? "navbar__link--active" : ""}`
                  }
                >
                  <FaMapMarkedAlt className="navbar__icon" />
                  Trips
                </NavLink>
              </li>
            )}

            <li className="navbar__item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                <FaInfoCircle className="navbar__icon" />
                About Us
              </NavLink>
            </li>
          </ul>

          {/* User Dropdown */}
          <div className="navbar__user" ref={menuRef}>
            {user ? (
              <>
                <button
                  className="navbar__user-btn"
                  onClick={() => setOpen(!open)}
                >
                  <FaUserCircle className="navbar__user-icon" />
                  <span className="navbar__user-name">
                    {currentUserData?.userName || "User"}
                  </span>
                </button>

                <div
                  className={`navbar__dropdown ${
                    open ? "navbar__dropdown--open" : ""
                  }`}
                >
                  <div className="navbar__dropdown-header">
                    <p className="navbar__dropdown-welcome">
                      Welcome back, <strong>{currentUserData?.userName}</strong>
                    </p>
                    <span className="navbar__dropdown-role">({userRole})</span>
                  </div>

                  <div className="navbar__dropdown-divider"></div>

                  <NavLink
                    to={`/profile/${currentUserData?._id}`}
                    className="navbar__dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    <FaUserCircle className="navbar__dropdown-icon" />
                    Profile
                  </NavLink>

                  <NavLink
                    to={
                      (userRole === "Admin" &&
                        "/dashboard/admin-manage-profile") ||
                      (userRole === "Tour Guide" &&
                        "/dashboard/guide-manage-profile") ||
                      (userRole === "Tourist" &&
                        "/dashboard/tourist-manage-profile") ||
                      "/dashboard"
                    }
                    className="navbar__dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    <LuLayoutDashboard className="navbar__dropdown-icon" />
                    Dashboard
                  </NavLink>

                  <div className="navbar__dropdown-divider"></div>

                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--signout"
                    onClick={handleSignOut}
                  >
                    <FaSignOutAlt className="navbar__dropdown-icon" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <Link to="/sign-in" className="navbar__signin-btn">
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navbar__mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`navbar__mobile-overlay ${
          menuOpen ? "navbar__mobile-overlay--open" : ""
        }`}
      >
        <div className="navbar__mobile-menu">
          <div className="navbar__mobile-header">
            {user ? (
              <div className="navbar__mobile-user">
                <FaUserCircle className="navbar__mobile-user-icon" />
                <div>
                  <p className="navbar__mobile-user-name">
                    {currentUserData?.userName}
                  </p>
                  <p className="navbar__mobile-user-role">{userRole}</p>
                </div>
              </div>
            ) : (
              <p className="navbar__mobile-guest">Welcome to GlobeTaek</p>
            )}
          </div>

          <ul className="navbar__mobile-list">
            <li className="navbar__mobile-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `navbar__mobile-link ${
                    isActive ? "navbar__mobile-link--active" : ""
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                <FaHome className="navbar__mobile-icon" />
                Home
              </NavLink>
            </li>

            <li className="navbar__mobile-item">
              <NavLink
                to="/community"
                className={({ isActive }) =>
                  `navbar__mobile-link ${
                    isActive ? "navbar__mobile-link--active" : ""
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                <FaUsers className="navbar__mobile-icon" />
                Community
              </NavLink>
            </li>

            {user && (
              <li className="navbar__mobile-item">
                <NavLink
                  to="/trips"
                  className={({ isActive }) =>
                    `navbar__mobile-link ${
                      isActive ? "navbar__mobile-link--active" : ""
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  <FaMapMarkedAlt className="navbar__mobile-icon" />
                  Trips
                </NavLink>
              </li>
            )}

            <li className="navbar__mobile-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `navbar__mobile-link ${
                    isActive ? "navbar__mobile-link--active" : ""
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                <FaInfoCircle className="navbar__mobile-icon" />
                About Us
              </NavLink>
            </li>

            {/* Dashboard Links */}
            {user && (
              <>
                <li className="navbar__mobile-item">
                  <NavLink
                    to={`/profile/${currentUserData?._id}`}
                    className={({ isActive }) =>
                      `navbar__mobile-link ${
                        isActive ? "navbar__mobile-link--active" : ""
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <FaUserCircle className="navbar__mobile-icon" />
                    Profile
                  </NavLink>
                </li>

                <li className="navbar__mobile-item">
                  <NavLink
                    to={
                      (userRole === "Admin" &&
                        "/dashboard/admin-manage-profile") ||
                      (userRole === "Tour Guide" &&
                        "/dashboard/guide-manage-profile") ||
                      (userRole === "Tourist" &&
                        "/dashboard/tourist-manage-profile") ||
                      "/dashboard"
                    }
                    className={({ isActive }) =>
                      `navbar__mobile-link ${
                        isActive ? "navbar__mobile-link--active" : ""
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    <LuLayoutDashboard className="navbar__mobile-icon" />
                    Dashboard
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          <div className="navbar__mobile-footer">
            {user ? (
              <button
                className="navbar__mobile-signout"
                onClick={() => {
                  handleSignOut();
                  setMenuOpen(false);
                }}
              >
                <FaSignOutAlt className="navbar__mobile-signout-icon" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/sign-in"
                className="navbar__mobile-signin"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

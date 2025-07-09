// File path__
import "./Navbar.css";
import { AuthContext } from "../../../Provider/AuthProvider";

// Imported package__
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router";

// React icons__
import { RxCross1 } from "react-icons/rx";
import { PiSignIn } from "react-icons/pi";
import { IoIosMenu } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { HiMiniUserCircle } from "react-icons/hi2";
import { AiOutlineShopping } from "react-icons/ai";
import { RiContactsBook2Line } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";

// From react__
import { use, useEffect, useRef, useState } from "react";
import useUserData from "../../Hooks/useUserData";

const Navbar = () => {
  const menuRef = useRef();
  const { user, logOut } = use(AuthContext);
  const [open, setOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUserData } = useUserData();
  const userRole = currentUserData?.userRole;

  // Handle Close Dropdown__
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle Scrolling__
  useEffect(() => {
    let lastScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsScrollingDown(true);
      } else if (scrollTop < lastScrollTop) {
        setIsScrollingDown(false);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Stop Scroll__
  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "auto";
      return;
    }
    document.body.style.overflow = "hidden";
  }, [menuOpen]);

  // Sign Out__
  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You went to sign out!",
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
    setOpen(!open);
  };

  return (
    <>
      <nav>
        {/* Desktop layout__ */}
        <div
          id={isScrollingDown ? "navbar_close" : "navbar_open"}
          className="main_navbar_container"
        >
          <div className="navbar_content_container">
            <h1 className="navbar_logo">GlobeTrek</h1>

            <ul className="navbar_routes_container">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                to="/community"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                <li>Community</li>
              </NavLink>

              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                <li>About Us</li>
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                <li>Contact</li>
              </NavLink>

              <NavLink
                to="/trips"
                className={({ isActive }) =>
                  isActive ? "route_active_style" : "router_none_active_style"
                }
              >
                <li>Trips</li>
              </NavLink>
            </ul>

            <div className="dropdown_wrapper" ref={menuRef}>
              <button
                className="dropdown_button"
                onClick={() => setOpen(!open)}
              >
                <HiMiniUserCircle />
              </button>

              <div
                id="dropdown_item_parent_container"
                className={`dropdown_menu ${open ? "open" : ""}`}
              >
                <h2 className="text-lg pl-5 font-semibold">
                  Hi, {currentUserData?.userName} Welcome back<span className="font-light text-gray-400"> ({userRole})</span>
                </h2>

                <NavLink to="/dashboard">
                  <span
                    onClick={() => setOpen(!open)}
                    className="dropdown_item"
                  >
                    <MdOutlineSpaceDashboard />
                    Dashboard
                  </span>
                </NavLink>

                <NavLink to="/profile">
                  <span
                    onClick={() => setOpen(!open)}
                    className="dropdown_item"
                  >
                    <MdOutlineSpaceDashboard />
                    Profile
                  </span>
                </NavLink>

                {user ? (
                  <span onClick={handleSignOut} className="dropdown_item">
                    <PiSignIn /> Sign Out
                  </span>
                ) : (
                  <Link to="/sign-in">
                    <span
                      onClick={() => setOpen(!open)}
                      className="dropdown_item"
                    >
                      <PiSignIn /> Sign In
                    </span>
                  </Link>
                )}
              </div>
            </div>

            <div className="mobile_menu_container">
              <span onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <RxCross1 /> : <IoIosMenu />}
              </span>
            </div>
          </div>

          {/* Mobile layout__ */}
          <div
            id={menuOpen ? "" : "menu_close"}
            className="main_mobile_menu_container"
          >
            <div className="mobile_menu_routes">
              <ul>
                <li onClick={() => setMenuOpen(!menuOpen)}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "mobile_menu_active_style"
                        : "mobile_menu_non_active_style"
                    }
                  >
                    <IoHomeOutline /> Home
                  </NavLink>
                </li>

                <li onClick={() => setMenuOpen(!menuOpen)}>
                  <NavLink
                    to="/community"
                    className={({ isActive }) =>
                      isActive
                        ? "mobile_menu_active_style"
                        : "mobile_menu_non_active_style"
                    }
                  >
                    <AiOutlineShopping /> Community
                  </NavLink>
                </li>

                <li onClick={() => setMenuOpen(!menuOpen)}>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "mobile_menu_active_style"
                        : "mobile_menu_non_active_style"
                    }
                  >
                    <FiMessageCircle /> About Us
                  </NavLink>
                </li>

                <li onClick={() => setMenuOpen(!menuOpen)}>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "mobile_menu_active_style"
                        : "mobile_menu_non_active_style"
                    }
                  >
                    <RiContactsBook2Line /> _Contact
                  </NavLink>
                </li>

                <li onClick={() => setMenuOpen(!menuOpen)}>
                  <NavLink
                    to="/trips"
                    className={({ isActive }) =>
                      isActive
                        ? "mobile_menu_active_style"
                        : "mobile_menu_non_active_style"
                    }
                  >
                    <RiContactsBook2Line /> Trips
                  </NavLink>
                </li>
              </ul>

              <div className="others_routes_container">
                <ul>
                  <li onClick={() => setMenuOpen(!menuOpen)}>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "mobile_menu_active_style"
                          : "mobile_menu_non_active_style"
                      }
                    >
                      <MdOutlineSpaceDashboard /> Dashboard
                    </NavLink>
                  </li>

                  {user ? (
                    <li onClick={handleSignOut}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "mobile_menu_active_style"
                            : "mobile_menu_non_active_style"
                        }
                      >
                        <PiSignIn />
                        Sign Out
                      </NavLink>
                    </li>
                  ) : (
                    <li onClick={() => setMenuOpen(!menuOpen)}>
                      <NavLink
                        to="/sign-in"
                        className={({ isActive }) =>
                          isActive
                            ? "mobile_menu_active_style"
                            : "mobile_menu_non_active_style"
                        }
                      >
                        <PiSignIn />
                        Sign In
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

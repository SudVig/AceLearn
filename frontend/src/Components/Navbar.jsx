import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faSignInAlt, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../App";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const authToken = localStorage.getItem("token");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navRef = useRef(null);
  const { setNavHeight } = useContext(UserContext);

  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, [setNavHeight]);

  const handleLogOut = () => {
    ["token", "email", "name", "id", "loginid", "profileImage"].forEach((item) =>
      localStorage.removeItem(item)
    );
    navigate("/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const menuItems = [
    { path: "/", label: "Home", requiresAuth: false },
    { path: "/courses", label: "Courses", requiresAuth: true },
    { path: "/practice", label: "Practice", requiresAuth: true },
    { path: "/profile", label: "Profile", requiresAuth: true },
    { path: "/learnings", label: "Learnings", requiresAuth: true },
  ];

  return (
    <nav ref={navRef} className="bg-gradient-to-r from-[#111111] via-[#1a1a1a] to-[#111111] text-white shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 w-full">
          {/* Left Section - Logo (if needed) */}
          <div className="flex">
            {/* <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" /> */}
          </div>

          {/* Right Section - Menu + Auth (forced to right using ml-auto) */}
          <div className="hidden md:flex items-center justify-end space-x-6 ml-auto">
            {menuItems.map(({ path, label, requiresAuth }) => {
              const isActive = location.pathname === path || (path === "/practice" && location.pathname.startsWith("/coding/"));
              return (!requiresAuth || authToken) && (
                <Link
                  key={path}
                  to={path}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-300 text-gray-300 hover:text-white"
                >
                  {label}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#38bdf8] via-[#6366f1] to-[#9333ea]"
                      transition={{ type: "spring", stiffness: 120, damping: 12 }}
                    />
                  )}
                </Link>
              );
            })}

            {authToken ? (
              <button
                onClick={handleLogOut}
                className="px-4 py-2 bg-gradient-to-r from-[#38bdf8] via-[#6366f1] to-[#9333ea] hover:opacity-90 rounded-md text-white text-sm flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span>Sign Out</span>
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-gradient-to-r from-[#38bdf8] via-[#6366f1] to-[#9333ea] hover:opacity-90 rounded-md text-white text-sm flex items-center space-x-2"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                <span>Login/SignUp</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMobileMenu} className="md:hidden text-white ml-auto">
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Mobile Menu - Sliding Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 right-0 bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#111111] text-white flex flex-col items-center w-3/4 h-screen z-50 shadow-lg"
          >
            <button onClick={toggleMobileMenu} className="absolute top-4 right-6 text-white text-2xl">
              <FontAwesomeIcon icon={faTimes} />
            </button>

            <ul className="space-y-6 mt-20 text-lg font-medium text-center w-full">
              {menuItems.map(({ path, label, requiresAuth }) =>
                (!requiresAuth || authToken) && (
                  <motion.li
                    key={path}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full"
                  >
                    <Link
                      to={path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 px-6 text-xl text-gray-300 hover:text-white transition-all duration-300 w-full"
                    >
                      {label}
                      {location.pathname === path && (
                        <motion.div
                          layoutId="underline"
                          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#38bdf8] via-[#6366f1] to-[#9333ea]"
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        />
                      )}
                    </Link>
                  </motion.li>
                )
              )}
            </ul>

            {/* Auth Buttons in Mobile */}
            <div className="mt-6">
              {authToken ? (
                <motion.button
                  onClick={() => {
                    handleLogOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-12 h-12 flex items-center justify-center text-white rounded-full bg-gradient-to-r from-[#38bdf8] via-[#6366f1] to-[#9333ea] hover:opacity-90 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => {
                    navigate("/login");
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-5 py-2 text-lg font-medium text-white rounded-full bg-gradient-to-r from-[#38bdf8] via-[#6366f1] to-[#9333ea] hover:opacity-90 transition-all duration-300 flex items-center space-x-3"
                >
                  <FontAwesomeIcon icon={faSignInAlt} />
                  <span>Login/SignUp</span>
                </motion.button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

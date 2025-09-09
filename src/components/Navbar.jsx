import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, LogOut, Menu, X } from "lucide-react"; // added Menu & X icons
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import logo from "./logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    ...(user ? [{ name: "Admin Panel", path: "/admin" }] : []),
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="backdrop-blur-lg bg-black/80 text-white shadow-xl z-50 border-b border-yellow-400/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.6 }}
            >
              <img
                src={logo}
                alt="Big Boss Logo"
                className="h-8 w-8 drop-shadow-lg"
              />
            </motion.div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent animate-pulse">
              Big Boss
            </span>
            <span className="text-sm text-gray-400 hidden sm:inline group-hover:text-yellow-400 transition-colors">
              Men's Wear
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuLinks.map((link) => (
              <motion.div key={link.path} whileHover={{ scale: 1.1 }}>
                <Link
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? "text-yellow-400 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg shadow-yellow-400/40"
                      : "text-gray-300 hover:text-yellow-400 hover:shadow-[0_0_15px_#facc15]"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-gray-300 hover:text-yellow-400 transition"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* User / Login */}
            {user ? (
              <motion.div
                className="hidden md:flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-yellow-400 drop-shadow-glow" />
                  <span className="text-sm text-gray-300 hidden sm:inline">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-300 hover:text-yellow-400 transition-all hover:shadow-[0_0_10px_#facc15]"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} className="hidden md:block">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-4 py-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-black rounded-lg font-medium shadow-lg shadow-yellow-500/50 hover:shadow-yellow-400/80 transition-all"
                >
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden border-t border-yellow-400/20 bg-black/90 backdrop-blur-md"
          >
            <div className="px-4 pt-3 pb-4 space-y-2">
              {menuLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)} // close after click
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? "text-yellow-400 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md shadow-yellow-400/40"
                      : "text-gray-300 hover:text-yellow-400 hover:shadow-[0_0_10px_#facc15]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-black bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 shadow-md shadow-yellow-500/40 hover:shadow-yellow-400/80 transition"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

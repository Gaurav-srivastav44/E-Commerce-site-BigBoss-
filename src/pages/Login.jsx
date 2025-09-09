import React, { useState } from "react";
import { FaUser, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); // show error for non-admin users
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();

    // Admin credentials
    const adminUsers = [
      { name: "Gaurav Srivastav", phone: "9897516090" },
      { name: "Mohit Agrawal", phone: "9027102429" },
      { name: "Ritesh Agrawal", phone: "9027878322" },
    ];

    // Check if exact admin
    const isAdmin = adminUsers.some(
      (user) =>
        user.name.toLowerCase() === trimmedName.toLowerCase() &&
        user.phone === trimmedPhone
    );

    if (isAdmin) {
      login(trimmedName, trimmedPhone); // only login admin
      navigate("/admin"); // go to admin panel
    } else {
      setError("Access Denied. Only admins can login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 font-sans">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(255,255,0,0.5)]">
        
        {/* Left Panel */}
        <div className="hidden md:flex flex-1 relative bg-gray-800 text-white p-10 items-center">
          <div className="relative z-10 text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 uppercase">WELCOME BACK!</h1>
            <p className="text-gray-200 leading-relaxed max-w-sm">
              Welocme !! Please login with your admin credentials to manage products and orders.
            </p>
          </div>
          <div className="absolute top-0 right-0 bottom-0 left-1/2 bg-gradient-to-br from-yellow-400 to-yellow-600 transform -skew-x-12 origin-bottom-left shadow-[0_0_50px_rgba(255,255,0,0.5)] z-0"></div>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-1/2 p-8 md:p-10 bg-gray-900 flex flex-col justify-center z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8 text-center md:text-left">Admin Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">

            <div>
              <label htmlFor="name" className="block text-gray-300 text-sm mb-1 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent border-b-2 border-yellow-400 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 pb-2 transition-colors duration-300"
                />
                <FaUser className="absolute right-0 text-yellow-400 text-lg md:text-xl" />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-gray-300 text-sm mb-1 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full bg-transparent border-b-2 border-yellow-400 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 pb-2 transition-colors duration-300"
                />
                <FaPhone className="absolute right-0 text-yellow-400 text-lg md:text-xl" />
              </div>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full text-xl md:text-2xl py-3 mt-4 bg-gradient-to-r from-yellow-400 to-yellow-600 
                         rounded-full font-bold text-black shadow-[0_0_25px_#ffd700] 
                         hover:shadow-[0_0_35px_#fffacd] 
                         transition-all duration-300 ease-in-out"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

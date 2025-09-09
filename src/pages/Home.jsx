import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useProducts } from "../contexts/ProductContext";
import bg1 from "./bg1.png";
import shopbyImage from "./shopby.png"; 
import { GoLocation } from "react-icons/go";
import { motion } from "framer-motion";

// Logos
import instaLogo from "./instagram.png";
import whatsappLogo from "./whatsapp.png";

import shirt1 from "../images/1.jpg";
import shirt2 from "../images/2.jpg";
import pant1 from "../images/a.jpg";
import pant2 from "../images/b.jpg";

export default function Home() {
  const { products } = useProducts();
  const featuredProducts = [
    { id: 1, name: "Classic Shirt", price: "₹550", image: shirt1 },
    { id: 2, name: "Casual Shirt", price: "₹499", image: shirt2 },
    { id: 3, name: "Slim Fit Pant", price: "₹750", image: pant1 },
    { id: 4, name: "Formal Pant", price: "₹800", image: pant2 },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -100 }, // Starts off-screen to the left
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } } // Slides in
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center text-white min-h-[80vh] flex items-center"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        {/* Social Icons */}
        <div className="absolute top-5 right-5 flex gap-4 z-20">
          <a href="https://www.instagram.com/b.b.menswear/" target="_blank" rel="noopener noreferrer">
            <img src={instaLogo} alt="Instagram" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white p-1 shadow-lg hover:scale-110 transition-transform duration-300" />
          </a>
          <a href="https://wa.me/9027878322" target="_blank" rel="noopener noreferrer">
            <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white p-1 shadow-lg hover:scale-110 transition-transform duration-300" />
          </a>
        </div>

        <motion.div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-start z-10 py-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-6xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              Big Boss
            </span>{" "}
            <br className="sm:hidden" />
            Men's Wear Collection
          </h1>
          <p className="text-base md:text-lg lg:text-2xl mb-[300px] text-gray-200 max-w-2xl">
            Apni Style ko <span className="font-semibold text-yellow-400">Upgrade</span> karo hamare Premium Collection ke Saath
          </p>

          <motion.div whileHover={{ scale: 1.05 }} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link to="/shop" className="inline-flex w-full sm:w-auto justify-center items-center text-lg px-6 py-3 bg-yellow-400 text-black font-semibold rounded-2xl shadow-lg hover:bg-yellow-500 transition-all duration-300">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="https://maps.app.goo.gl/q2R6HqDpNcBcaFrX7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full sm:w-auto justify-center items-center px-6 py-3 bg-white/20 text-white font-semibold rounded-2xl shadow-lg border border-transparent hover:border-yellow-400 transition-all duration-300"
            >
              <GoLocation className="mr-2 h-6 w-6" />
              Shop Location
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-950 text-center">
        <h2 className="text-3xl font-bold mb-8 text-white">Shop by <span className="text-yellow-400">Category</span></h2>
        
        <div className="max-w-6xl mx-auto px-4">
          <motion.img 
              src={shopbyImage} 
              alt="Shop by Category" 
              className="w-full rounded-xl shadow-2xl hover:shadow-yellow-400/20 transition-shadow duration-500 cursor-pointer" 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={imageVariants} // Apply the new variants here
              whileHover={{ scale: 1.02 }}
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Featured Products</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
        >
          {featuredProducts.map((product) => (
            <motion.div key={product.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group" variants={cardVariants}>
              <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform duration-300" />
              <h3 className="font-semibold text-xl text-gray-800 mb-1">{product.name}</h3>
              <p className="text-yellow-600 font-bold text-lg mb-3">{product.price}</p>
              <Link to="/shop" className="mt-3 inline-block px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-all duration-300 shadow-md">
                Buy Now
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Why Choose Big Boss?</h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {["Premium Quality", "Affordable Prices", "Free Alteration", "COD Available"].map((point, idx) => (
            <motion.div
              key={idx}
              className="p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center space-y-3"
              variants={cardVariants}
            >
              <h3 className="font-semibold text-xl text-gray-800">{point}</h3>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-center border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-yellow-400 mb-4">Big Boss Men's Wear</h3>
          <p className="mt-2 text-lg flex items-center justify-center">
            <GoLocation className="mr-2 h-5 w-5 text-yellow-400" />
            Krishna Nagar, In front of Prayag Hospital, Mathura, Uttar Pradesh, India
          </p>
          <p className="mt-1 text-lg">📞 +91 90278 78322</p>
          <div className="flex justify-center gap-6 mt-6">
            <a href="https://www.instagram.com/b.b.menswear/" target="_blank" rel="noopener noreferrer">
              <img src={instaLogo} alt="Instagram" className="w-8 h-8 rounded-full bg-white p-1 hover:scale-110 transition-transform duration-300" />
            </a>
            <a href="https://wa.me/9027878322" target="_blank" rel="noopener noreferrer">
              <img src={whatsappLogo} alt="WhatsApp" className="w-8 h-8 rounded-full bg-white p-1 hover:scale-110 transition-transform duration-300" />
            </a>
          </div>
          <p className="mt-8 text-sm text-gray-500">
            © {new Date().getFullYear()} Big Boss. All Rights Reserved Gaurav Srivastav
          </p>
        </div>
      </footer>
    </div>
  );
}
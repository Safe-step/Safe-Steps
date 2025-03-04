import React, { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import womanl from "../assets/womanl.jpg";
import About from "./about";
import Services from "./services";
import RideBookingPage from "./ride";
import PartnersPage from "./partener";
import DonationPage from "./DonationPage";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <motion.div
      className="container-fluid bg-light py-5"
      style={{ fontFamily: "Poppins, sans-serif" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home" style={{ color: "#ff8c00" }}>
            Safe Step
          </a>
          <button className="navbar-toggler d-md-none" onClick={() => setIsOpen(!isOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-none d-md-flex justify-content-end">
            <ul className="navbar-nav">
              {["Home", "About", "Services", "Partners", "Donation"].map((item, index) => (
                <li className="nav-item" key={index}>
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleScroll(item.toLowerCase())}
                    style={{ color: "#ff8c00", transition: "color 0.3s ease" }}
                    onMouseEnter={(e) => (e.target.style.color = "#e67300")}
                    onMouseLeave={(e) => (e.target.style.color = "#ff8c00")}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <motion.div
        className="position-fixed top-0 end-0 bg-white shadow-lg p-4 d-md-none"
        style={{ width: "50vw", height: "100vh", zIndex: 1050 }}
        initial={{ x: "100%", opacity: 0 }}
        animate={isOpen ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <button className="btn-close" onClick={() => setIsOpen(false)}></button>
        <ul className="nav flex-column mt-4">
          {["Home", "About", "Services", "Partners", "Donation"].map((item, index) => (
            <li className="nav-item" key={index}>
              <button
                className="nav-link btn btn-link"
                onClick={() => handleScroll(item.toLowerCase())}
                style={{ color: "#ff8c00" }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Hero Section */}
      <div id="home" className="container py-5 mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold text-dark">Empowering Women's Safety</h1>
            <p className="text-muted mt-3">
              At our women's safety platform, we are dedicated to protecting women during late-night emergencies.
            </p>
            <motion.button
              className="btn mt-4 px-4 py-2 fw-bold"
              style={{
                backgroundColor: "orange",
                color: "white",
                borderRadius: "10px",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
              }}
              whileHover={{ scale: 1.1, rotateY: 10 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleScroll("services")}
            >
              Get Help Now
            </motion.button>
          </div>
          <div className="col-md-6 text-center position-relative d-none d-md-block">
            <motion.div
              className="d-inline-flex align-items-center justify-content-center"
              style={{
                width: "350px",
                height: "350px",
                overflow: "hidden",
                borderRadius: "10px",
                border: "5px solid orange",
              }}
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
                transition: { repeat: Infinity, duration: 4, ease: "easeInOut" },
              }}
            >
              <motion.img
                src={womanl}
                alt="Woman smiling"
                className="img-fluid"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                animate={{
                  y: [0, -10, 0],
                  transition: { repeat: Infinity, duration: 3, ease: "easeInOut" },
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
      <div id="about"><About /></div>
      <div id="services"><Services /></div>
      <RideBookingPage />
      <div id="partners"><PartnersPage /></div>
      <div id="donation"><DonationPage /></div>
    </motion.div>
  );
};

export default App;

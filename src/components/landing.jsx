import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import womanl from "../assets/womanl.jpg";
import About from "./about";
import Services from "./services";
import RideBooking from "./ride";
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
      className="container-fluid py-5"
      style={{ fontFamily: "Poppins, sans-serif", backgroundColor: "#FFFFFF" }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home" style={{ color: "#FFD700" }}>
            Safe Step
          </a>
          <button className="navbar-toggler d-md-none" onClick={() => setIsOpen(!isOpen)}>
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="position-fixed top-0 start-0 w-75 vh-100 bg-white shadow-lg d-md-none"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: 1050 }}
              >
                <div className="p-4 d-flex flex-column">
                  <button className="btn-close align-self-end" onClick={() => setIsOpen(false)}></button>
                  <ul className="navbar-nav mt-4">
                    {["Home", "About", "Services", "Partners", "Donation"].map((item, index) => (
                      <li className="nav-item" key={index}>
                        <button
                          className="nav-link btn btn-link text-start fs-5"
                          onClick={() => handleScroll(item.toLowerCase())}
                          style={{
                            color: "#FFD700",
                            transition: "color 0.3s ease",
                            fontWeight: "bold",
                          }}
                          onMouseEnter={(e) => (e.target.style.color = "black")}
                          onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Navigation */}
          <div className="collapse navbar-collapse d-none d-md-flex justify-content-end">
            <ul className="navbar-nav">
              {["Home", "About", "Services", "Partners", "Donation"].map((item, index) => (
                <li className="nav-item" key={index}>
                  <button
                    className="nav-link btn btn-link"
                    onClick={() => handleScroll(item.toLowerCase())}
                    style={{
                      color: "#FFD700",
                      transition: "color 0.3s ease",
                      fontWeight: "bold",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "black")}
                    onMouseLeave={(e) => (e.target.style.color = "#FFD700")}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div id="home" className="container py-5 mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold" style={{ color: "#FFD700" }}>Empowering Women's Safety</h1>
            <p className="text-muted mt-3" style={{ color: "#FFD700" }}>
              At our women's safety platform, we are dedicated to protecting women during late-night emergencies.
            </p>
            <motion.button
              className="btn mt-4 px-4 py-2 fw-bold"
              style={{
                backgroundColor: "#FFD700",
                color: "white",
                borderRadius: "15px",
                boxShadow: "0px 5px 15px rgba(255, 215, 0, 0.4)",
              }}
              whileHover={{ scale: 1.1 }}
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
                borderRadius: "15px",
                border: "5px solid #FFD700",
              }}
              animate={{ rotate: [0, 5, -5, 0], transition: { repeat: Infinity, duration: 4 } }}
            >
              <motion.img
                src={womanl}
                alt="Woman smiling"
                className="img-fluid"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                animate={{ y: [0, -10, 0], transition: { repeat: Infinity, duration: 3 } }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div id="about"><About /></div>
      <div id="services"><Services /></div>
      <div id="partners"><PartnersPage /></div>
      <div id="donation"><DonationPage /></div>
    </motion.div>
  );
};

export default App;

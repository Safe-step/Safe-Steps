import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { motion } from "framer-motion";
import { Offcanvas } from "bootstrap";

import womanl from "../assets/womanl.png";
import About from "./about";
import Services from "./services";
import RideBookingPage from "./ride";
import PartnersPage from "./partener";
import DonationPage from "./DonationPage";

const App = () => {
  const closeOffcanvasAndScroll = (sectionId) => {
    const offcanvasElement = document.querySelector("#navbarDrawer");
    if (offcanvasElement) {
      const bsOffcanvas = Offcanvas.getInstance(offcanvasElement);
      if (bsOffcanvas) {
        bsOffcanvas.hide();
      }
    }
    setTimeout(() => {
      document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="container-fluid bg-light py-5" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm fixed-top">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#home">Safe Step</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarDrawer">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end d-none d-lg-block" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#about">About</a></li>
              <li className="nav-item"><a className="nav-link" href="#services">Services</a></li>
              <li className="nav-item"><a className="nav-link" href="#partners">Partners</a></li>
              <li className="nav-item"><a className="nav-link" href="#donation">Donation</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Offcanvas Navbar */}
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="navbarDrawer">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item"><a className="nav-link" href="#home" onClick={() => closeOffcanvasAndScroll("home")}>Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#about" onClick={() => closeOffcanvasAndScroll("about")}>About</a></li>
            <li className="nav-item"><a className="nav-link" href="#services" onClick={() => closeOffcanvasAndScroll("services")}>Services</a></li>
            <li className="nav-item"><a className="nav-link" href="#partners" onClick={() => closeOffcanvasAndScroll("partners")}>Partners</a></li>
            <li className="nav-item"><a className="nav-link" href="#donation" onClick={() => closeOffcanvasAndScroll("donation")}>Donation</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-5 mt-5">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold text-dark">Empowering Women's Safety</h1>
            <p className="text-muted mt-3">
              At our women's safety platform, we are dedicated to protecting women during late-night emergencies.
            </p>
            <button
              className="btn mt-4 px-4 py-2 fw-bold"
              style={{ backgroundColor: "orange", color: "white" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "darkorange")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "orange")}
              onClick={() => closeOffcanvasAndScroll("services")}
            >
              Get Help Now
            </button>
          </div>

          <div className="col-md-6 text-center position-relative d-none d-md-block">
            <motion.div
              className="rounded-circle bg-warning d-inline-flex align-items-center justify-content-center"
              style={{ width: "350px", height: "350px" }}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={womanl}
                alt="Woman smiling"
                className="rounded-circle img-fluid"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div id="about"><About /></div>
      <div id="services"><Services /></div>
      <RideBookingPage />
      <div id="partners"><PartnersPage /></div>
      <div id="donation"><DonationPage /></div>
    </div>
  );
};

export default App;

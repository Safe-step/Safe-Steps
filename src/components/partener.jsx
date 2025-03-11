import React from "react";
import { Card, CardBody } from "react-bootstrap";
import { 
  FaBalanceScale, FaBullhorn, FaHandHoldingHeart, FaFistRaised, FaGavel, FaShieldAlt 
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { motion } from "framer-motion";

const partners = [
  { name: "Sakshi", icon: <FaBalanceScale style={{ color: "#FFD700"  }} />, description:  "Works on gender justice and women's safety in India.", link: "https://sakshi-women.org" },
  { name: "Jagori", icon: <FaBullhorn style={{ color: "#FFD700" }} />, description: "Focuses on women's rights and safety in public spaces.", link: "https://jagori-safety.org" },
  { name: "Shakti Shalini", icon: <FaHandHoldingHeart style={{ color: "#FFD700" }} />, description: "Provides support for women facing violence.", link: "https://shakti-shelter.org" },
  { name: "Breakthrough India", icon: <FaFistRaised style={{ color: "#FFD700" }} />, description: "Works on preventing gender-based violence.", link: "https://breakthrough-india.org" },
  { name: "Majlis Manch", icon: <FaGavel style={{ color: "#FFD700" }} />, description: "Provides legal support for women.", link: "https://majlis-manch.org" },
  { name: "Sayfty", icon: <FaShieldAlt style={{ color: "#FFD700" }} />, description: "Works on self-defense training and safety awareness for women.", link: "https://sayfty-safe.org" }
];

const PartnersPage = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4" style={{ color: "#FFFFFF" }}>Our Partners</h2>
      <div className="row">
        {partners.map((partner, index) => (
          <div key={index} className={`col-md-4 col-sm-6 mb-4 ${index >= 3 ? 'd-none d-md-block' : ''}`}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card className="text-center shadow-lg border-0 rounded">
                <CardBody>
                  <div className="display-4 mb-3">{partner.icon}</div>
                  <h5 className="card-title" style={{ color: "black" }}>{partner.name}</h5>
                  <p className="card-text" style={{ color: "black" }}>{partner.description}</p>
                  <a 
                    href={partner.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn custom-button"
                  >
                    Learn More
                  </a>
                </CardBody>
              </Card>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnersPage;

import React from "react";
import { Card, CardBody } from "react-bootstrap";
import { FaHandsHelping, FaGlobe, FaPeopleCarry, FaUserShield, FaUsers, FaHeartbeat } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { motion } from "framer-motion";

const partners = [
  { name: "UN Women", icon: <FaGlobe style={{ color: "orange" }} />, description: "A global champion for gender equality.", link: "https://www.unwomen.org/" },
  { name: "CARE International", icon: <FaHandsHelping style={{ color: "orange" }} />, description: "Fighting poverty and empowering women worldwide.", link: "https://www.care-international.org/" },
  { name: "Women for Women International", icon: <FaPeopleCarry style={{ color: "orange" }} />, description: "Helping women survivors of war rebuild their lives.", link: "https://www.womenforwomen.org/" },
  { name: "SEWA (Self-Employed Women's Association)", icon: <FaUserShield style={{ color: "orange" }} />, description: "Empowering self-employed women in India.", link: "https://www.sewa.org/" },
  { name: "Nanhi Kali", icon: <FaUsers style={{ color: "orange" }} />, description: "Providing education for underprivileged girls in India.", link: "https://www.nanhikali.org/" },
  { name: "Snehalaya", icon: <FaHeartbeat style={{ color: "orange" }} />, description: "Supporting women and children in distress in India.", link: "https://www.snehalaya.org/" }
];

const PartnersPage = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Our Partners</h2>
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
                  <h5 className="card-title">{partner.name}</h5>
                  <p className="card-text">{partner.description}</p>
                  <a href={partner.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
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

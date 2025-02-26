import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import womana from "../assets/womana.jpg";
import RideBooking from "./ride";

const WomenSafety = () => {
  return (
    <Container className="my-5">
      <motion.h1 
        className="text-center mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        About Us
      </motion.h1>
      <Row className="align-items-center">
        <Col md={6} xs={12} className="text-center mb-4 mb-md-0">
          <motion.img
            src={womana}
            alt="Women Safety"
            className="img-fluid rounded w-75"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.05 }}
          />
        </Col>
        <Col md={6} xs={12}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.h2 
              className="mb-3 text-center text-md-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              Women Safety & Empowerment
            </motion.h2>
            <motion.p 
              className="text-justify"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              Our platform is dedicated to women's safety and empowerment. We collaborate with various NGOs to provide immediate assistance. If a woman feels lonely or frightened at night, she can visit our site, and we will connect her with a nearby NGO. The NGO will ensure her safe return home.
            </motion.p>
            <motion.h3 
              className="text-center text-md-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              Main Goals
            </motion.h3>
            <motion.ul 
              className="ps-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <motion.li whileHover={{ scale: 1.1 }}>
                <strong>Women Empowerment:</strong> We provide educational resources, skill development programs, and career guidance to help women achieve financial independence and self-confidence.
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <strong>Women Safety:</strong> Our platform ensures immediate support for women in distress by connecting them to nearby NGOs and emergency services, ensuring their safety at all times.
              </motion.li>
              <motion.li whileHover={{ scale: 1.1 }}>
                <strong>Safe Ride:</strong> We offer a secure ride service where verified NGO personnel provide bike rides to women in need. Every ride operates under police surveillance. When an NGO person accepts a ride request, an OTP is generated and sent to the police station, allowing law enforcement to track the woman's location for enhanced security.
              </motion.li>
            </motion.ul>
            <motion.div className="text-center mt-4">
              <Button 
                variant="primary" 
                size="lg" 
                whileHover={{ scale: 1.1 }}
                onClick={() => document.getElementById('RideBooking').scrollIntoView({ behavior: 'smooth' })}
              >
                Book Now
              </Button>
            </motion.div>
          </motion.div>
        </Col>
      </Row>
    </Container>
  ); 
};

export default WomenSafety;
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import { FaBriefcase, FaPhoneAlt, FaHeartbeat, FaShieldAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";

const services = [
  {
    title: "Women Entrepreneurship Programs",
    description:
      "Provide financial support, mentorship, and networking opportunities to help women start and grow their businesses.",
    icon: <FaBriefcase size={40} style={{ color: "#FFD700" }} />,
    buttonText: "Get Support"
  },
  {
    title: "24/7 Helpline for Women’s Safety",
    description:
      "Set up a helpline where women can report harassment, domestic violence, or seek emergency assistance.",
    icon: <FaPhoneAlt size={40} style={{ color: "#FFD700" }} />,
    buttonText: "Call Now",
    phoneNumber: "tel:+917362949785"
  },
  {
    title: "Free Health Check-ups for Women",
    description:
      "Provide medical support, especially for maternal health, menstrual health, and general well-being.",
    icon: <FaHeartbeat size={40} style={{ color: "#FFD700" }} />,
    buttonText: "Book a Check-up"
  },
  {
    title: "Self-Defense Training",
    description:
      "Organize workshops teaching martial arts, emergency response, and awareness about personal safety.",
    icon: <FaShieldAlt size={40} style={{ color: "#FFD700" }} />,
    buttonText: "Join a Session"
  }
];

const Services = () => {
  const [show, setShow] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleShow = (buttonText, phoneNumber) => {
    if (buttonText === "Call Now") {
      window.location.href = phoneNumber;
    } else {
      setSelectedService(buttonText);
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: "#FFD700" }}>Our Services</h2>
      <Row className="g-4 justify-content-center">
        {services.map((service, index) => (
          <Col key={index} xs={12} sm={6} md={6} lg={6}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card className="p-3 shadow-lg border-0 text-center h-100" style={{ backgroundColor: "#FFFFFF", color: "#000" }}>
                <div className="mb-3">{service.icon}</div>
                <Card.Body>
                  <Card.Title className="fs-5">{service.title}</Card.Title>
                  <Card.Text className="small">{service.description}</Card.Text>
                  <Button
                    style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "#FFFFFF" }}
                    className="mt-2"
                    onClick={() => handleShow(service.buttonText, service.phoneNumber)}
                  >
                    {service.buttonText}
                  </Button>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Registration Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#FFD700", color: "#FFFFFF" }}>
          <Modal.Title>Register for {selectedService}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#FFFFFF", color: "#000" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter your phone number" required />
            </Form.Group>
            <Button
              style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "#FFFFFF" }}
              type="submit"
              onClick={handleClose}
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#FFFFFF", color: "#000" }}>
          <p className="text-center w-100">Your response will be sent through your registered email or mobile number.</p>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Services;

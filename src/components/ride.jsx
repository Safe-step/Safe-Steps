import React from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaCar, FaShieldAlt, FaRoute } from "react-icons/fa";

const RideBooking = () => {
  return (
    <Container className="mt-4" id="RideBooking" >
      <h2 className="text-center mb-4">Ladies Ride Booking</h2>
      <Row>
        <Col md={12} className="mb-3">
          <Card className="p-3">
            <h4>Map View</h4>
            <div style={{ height: "300px", backgroundColor: "#ccc" }}>
              {/* Placeholder for Map */}
              {/* You should integrate a map API like Google Maps or OpenStreetMap here. 
                  The API key can be stored in an environment variable and accessed using 
                  process.env.REACT_APP_MAP_API_KEY. */}
              <p className="text-center">Map will be displayed here</p>
            </div>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-3">
          <Card className="p-3">
            <h4>Book a Ride</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Pickup Location</Form.Label>
                <Form.Control type="text" placeholder="Enter pickup location" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Drop Location</Form.Label>
                <Form.Control type="text" placeholder="Enter drop location" />
              </Form.Group>
              <Button variant="primary" className="w-100">
                <FaCar /> Book Ride
              </Button>
            </Form>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card className="p-3">
            <h4>Nearby Safety Resources</h4>
            <p><FaShieldAlt /> Nearest NGO</p>
            <p><FaMapMarkerAlt /> Nearest Police Station</p>
            <p><FaRoute /> Estimated Route Distance</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RideBooking;
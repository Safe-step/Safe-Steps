import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaCar, FaShieldAlt, FaRoute } from "react-icons/fa";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const defaultCenter = {
  lat: 28.7041, // Default: Delhi, India
  lng: 77.1025,
};

const RideBooking = () => {
  const [apiKey, setApiKey] = useState("");
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);

  useEffect(() => {
    if (window.REACT_APP_MAP_API_KEY) {
      setApiKey(window.REACT_APP_MAP_API_KEY);
    } else {
      console.error("Google Maps API key is missing!");
    }
  }, []);

  // Function to get coordinates from address
  const getCoordinates = async (address, setCoords, type) => {
    if (!apiKey || !address) return;

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        setCoords(location);
        setMapCenter(location); // Update map center dynamically
        console.log(`${type} Coordinates:`, location);
      } else {
        console.error(`Geocoding failed: ${data.status}`);
      }
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  return (
    <Container className="mt-4" id="RideBooking">
      <h2 className="text-center mb-4">Ladies Ride Booking</h2>

      {/* Map Section */}
      <Row>
        <Col md={12} className="mb-3">
          <Card className="p-3">
            <h4>Map View</h4>
            {apiKey ? (
              <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={12}>
                  {pickupCoords && <Marker position={pickupCoords} />}
                  {dropCoords && <Marker position={dropCoords} />}
                </GoogleMap>
              </LoadScript>
            ) : (
              <p className="text-center text-danger">API Key is missing!</p>
            )}
          </Card>
        </Col>
      </Row>

      {/* Booking Form */}
      <Row>
        <Col md={6} className="mb-3">
          <Card className="p-3">
            <h4>Book a Ride</h4>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Pickup Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onBlur={() => getCoordinates(pickup, setPickupCoords, "Pickup")}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Drop Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter drop location"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  onBlur={() => getCoordinates(drop, setDropCoords, "Drop")}
                />
              </Form.Group>

              <Button variant="primary" className="w-100">
                <FaCar /> Book Ride
              </Button>
            </Form>
          </Card>
        </Col>

        {/* Safety Section */}
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

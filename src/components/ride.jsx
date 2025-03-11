import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import driverImage1 from "../assets/driver1.jpg";
import driverImage2 from "../assets/driver2.jpg";
import driverImage3 from "../assets/driver3.jpg";

const LOCATIONIQ_API_KEY = "pk.6dcb1f6e87936b8fb3682305105f9fc9";

const RideBooking = () => {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [dropCoords, setDropCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [otp, setOtp] = useState(null);
  const [distance, setDistance] = useState(0);
  const mapRef = useRef(null);

  const drivers = [
    {
      name: "Tanshque singh",
      phone: "9876543211",
      bikeNumber: "WB 14 XY 1234",
      bikeName: "Hero Splendor",
      image: driverImage1,
    },
    {
      name: "Md pratyush",
      phone: "9123456789",
      bikeNumber: "KA 05 AB 5678",
      bikeName: "Honda Shine",
      image: driverImage2,
    },
    {
      name: "Shamun shaikh",
      phone: "9988776655",
      bikeNumber: "TN 09 RT 9876",
      bikeName: "Yamaha FZ",
      image: driverImage3,
    },
  ];

  const driver = drivers[Math.floor(Math.random() * drivers.length)];

  const getCoordinates = async (address, setCoords) => {
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/search.php?key=${LOCATIONIQ_API_KEY}&q=${encodeURIComponent(address)}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setCoords([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found!");
        setCoords(null);
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const getRoute = async () => {
    if (!pickupCoords || !dropCoords) return;
    try {
      const response = await fetch(
        `https://us1.locationiq.com/v1/directions/driving/${pickupCoords[1]},${pickupCoords[0]};${dropCoords[1]},${dropCoords[0]}?key=${LOCATIONIQ_API_KEY}&geometries=geojson`
      );
      const data = await response.json();
      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates.map((point) => [
          point[1],
          point[0],
        ]);
        setRoute(coordinates);
        setDistance(data.routes[0].distance / 1000); // Convert meters to km
      } else {
        alert("Route not found!");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const findRide = async () => {
    if (!pickup || !drop) {
      alert("Please enter both pickup and drop locations.");
      return;
    }
    await getCoordinates(pickup, setPickupCoords);
    await getCoordinates(drop, setDropCoords);
    setOtp(Math.floor(1000 + Math.random() * 9000));
    setShowModal(true);
  };

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setPickupCoords([latitude, longitude]);
        try {
          const response = await fetch(
            `https://us1.locationiq.com/v1/reverse.php?key=${LOCATIONIQ_API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          if (data.display_name) {
            setPickup(data.display_name);
          }
        } catch (error) {
          console.error("Error fetching location name:", error);
        }
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  };

  useEffect(() => {
    if (pickupCoords && dropCoords) {
      getRoute();
    }
  }, [pickupCoords, dropCoords]);

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4} className="p-4 shadow rounded">
          <h2 className="text-center mb-4">Lady a Ride</h2>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Pickup Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pickup location"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
              />
            <Button variant="secondary" className="w-100 mt-2" style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "#FFFFFF" }} onClick={useCurrentLocation}>
  Use Current Location
</Button>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Drop Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter drop location"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" className="w-100" style={{ backgroundColor: "#FFD700", borderColor: "#FFD700" }} onClick={findRide}>
  Find a Ride
</Button>
          </Form>
        </Col>

        <Col md={8}>
          <MapContainer
            center={[23.495, 87.32]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {pickupCoords && <Marker position={pickupCoords} />}
            {dropCoords && <Marker position={dropCoords} />}
            {route.length > 0 && <Polyline positions={route} color="blue" />}
            <FitMapBounds pickupCoords={pickupCoords} dropCoords={dropCoords} />
          </MapContainer>
        </Col>
      </Row>

      {/* Modal for Driver Details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ride Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={driver.image} alt="Driver" className="rounded-circle mb-3" width="180" height="180" />
            <h4>{driver.name}</h4>
            <p>📞 {driver.phone}</p>
            <p>🏍 {driver.bikeName} ({driver.bikeNumber})</p>
            <p>OTP: <strong>{otp}</strong></p>
            <p>Estimated Fare: ₹{(distance * 10).toFixed(2)}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "#FFFFFF" }} href={`tel:${driver.phone}`}>
  Call Driver
</Button>
<Button variant="danger" style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "#FFFFFF" }} onClick={() => setShowModal(false)}>
  Cancel Ride
</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

const FitMapBounds = ({ pickupCoords, dropCoords }) => {
  const map = useMap();
  useEffect(() => {
    if (pickupCoords && dropCoords) {
      map.fitBounds([pickupCoords, dropCoords], { padding: [50, 50] });
    }
  }, [pickupCoords, dropCoords, map]);
  return null;
};

export default RideBooking;

import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const OTPVerification = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.includes("")) {
      setError("Please enter the complete OTP.");
      return;
    }
    navigate("/landing");
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setTimer(30);
    alert("OTP sent to your phone number");
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-4">
      <div
        className="border p-4 rounded shadow-sm"
        style={{ width: "350px", borderColor: "#FFD700", borderRadius: "15px", backgroundColor: "#FFFFFF" }}
      >
        <h5 className="text-center fw-bold" style={{ color: "#FFD700" }}>Enter OTP</h5>
        <p className="text-center" style={{ color: "#FFD700" }}>We have sent a 6-digit OTP to your phone.</p>

        <Form onSubmit={handleSubmit} className="text-center">
          <Row className="justify-content-center mb-3">
            {otp.map((data, index) => (
              <Col xs={2} key={index} className="p-1">
                <Form.Control
                  type="text"
                  id={`otp-${index}`}
                  value={data}
                  maxLength={1}
                  className="text-center fs-4 fw-bold"
                  style={{
                    width: "40px",
                    height: "50px",
                    borderRadius: "8px",
                    border: "2px solid #FFD700",
                    backgroundColor: "#FFFFFF",
                    color: "#FFD700",
                  }}
                  onChange={(e) => handleChange(e, index)}
                />
              </Col>
            ))}
          </Row>
          {error && <p className="text-danger small">{error}</p>}
          <Button
            type="submit"
            className="w-100 fw-bold mt-2"
            style={{ backgroundColor: "#FFD700", borderColor: "#FFD700", color: "#FFFFFF", borderRadius: "8px" }}
          >
            Verify OTP
          </Button>
        </Form>
        <p className="text-center mt-3">
          {timer > 0 ? (
            <span style={{ color: "#FFD700" }}>Resend OTP in {timer}s</span>
          ) : (
            <span style={{ color: "#FFD700", cursor: "pointer" }} onClick={handleResend}>
              Resend OTP
            </span>
          )}
        </p>
      </div>
    </Container>
  );
};

export default OTPVerification;

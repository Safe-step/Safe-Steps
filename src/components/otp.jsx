import React, { useState, useEffect, useRef } from "react";
import { Container, Form, Button } from "react-bootstrap";
import App from "./landing";

const OTPPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(30);
  const [isVerified, setIsVerified] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all OTP fields are filled
    if (newOtp.every(num => num !== "")) {
      setTimeout(() => setIsVerified(true), 500); // Small delay for UX
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(""));
    setTimer(30);
  };

  // If OTP is verified, show the App component
  if (isVerified) {
    return <App />;
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="text-center p-4 shadow-lg rounded" style={{ backgroundColor: "#f8f9fa", maxWidth: "400px" }}>
        <h3 className="mb-3" style={{ color: "#333" }}>Enter OTP</h3>
        <div className="d-flex justify-content-center mb-3">
          {otp.map((data, index) => (
            <Form.Control
              key={index}
              type="text"
              className="mx-1 text-center border border-primary"
              style={{ width: "50px", height: "50px", fontSize: "20px", borderRadius: "8px" }}
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
        <p 
          style={{ 
            color: timer === 0 ? "orange" : "gray", 
            fontWeight: timer === 0 ? "bold" : "normal", 
            cursor: timer === 0 ? "pointer" : "default" 
          }}
          onClick={timer === 0 ? handleResend : null}
        >
          Resend OTP in {timer}s
        </p>
      </div>
    </Container>
  );
};

export default OTPPage;

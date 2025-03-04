import React, { useState } from "react";
import { Button, Form, Card, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import App from "./landing";

const slideAnimation = {
  hidden: { x: "100vw", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } },
  exit: { x: "-100vw", opacity: 0, transition: { type: "spring", stiffness: 50 } },
};

const RegistrationSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [navigateToApp, setNavigateToApp] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!isSignup && !formData.name.trim()) newErrors.name = "Name is required";
    if (!isSignup && !formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setNavigateToApp(true);
    }
  };

  const handleSocialSignup = () => {
    setNavigateToApp(true);
  };

  if (navigateToApp) {
    return <App />;
  }

  return (
    <motion.div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 shadow-lg bg-white rounded form-container d-flex flex-column align-items-center" style={{ width: "90%", maxWidth: "400px" }}>
        <Card className="p-4 text-center border-0 w-100 shadow-lg rounded-3">
          <h2 className="text-dark fw-bold mb-3">{isSignup ? "Sign Up" : "Register"}</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={isSignup ? "signup" : "register"}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideAnimation}
            >
              <Form className="text-start">
                {!isSignup && (
                  <>
                    <Form.Group className="mb-3">
                      <FloatingLabel controlId="name" label="Name">
                        <Form.Control
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          isInvalid={!!errors.name}
                          className="input-field"
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <FloatingLabel controlId="phone" label="Phone Number">
                        <Form.Control
                          type="text"
                          placeholder="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => {
                            const numericValue = e.target.value.replace(/\D/, "");
                            if (numericValue.length <= 10) {
                              setFormData({ ...formData, phone: numericValue });
                            }
                          }}
                          isInvalid={!!errors.phone}
                          maxLength="10"
                          className="input-field"
                        />
                        <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
                      </FloatingLabel>
                    </Form.Group>
                  </>
                )}
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="email" label="Email">
                    <Form.Control
                      type="email"
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isInvalid={!!errors.email}
                      className="input-field"
                    />
                    <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-3">
                  <FloatingLabel controlId="password" label="Password">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      isInvalid={!!errors.password}
                      className="input-field"
                    />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button className="w-100 mb-3 custom-btn" style={{ backgroundColor: "#ff8c00", borderColor: "#ff8c00" }} onClick={handleSubmit}>
                  {isSignup ? "Sign Up" : "Register"}
                </Button>
              </Form>
            </motion.div>
          </AnimatePresence>
        </Card>

        <div className="d-flex flex-column w-100 mt-3 gap-2">
          <Button variant="light" className="w-100 d-flex align-items-center justify-content-center shadow-sm" onClick={handleSocialSignup}>
            <FcGoogle className="me-2" size={20} /> Sign Up with Google
          </Button>
          <Button variant="dark" className="w-100 d-flex align-items-center justify-content-center shadow-sm" onClick={handleSocialSignup}>
            <FaApple className="me-2" size={20} /> Sign Up with Apple
          </Button>
        </div>

        <div className="d-flex justify-content-between w-100 mt-3 gap-3">
        <Button className="toggle-btn w-50" style={{ backgroundColor: "#ff8c00", borderColor: "#ff8c00" }} onClick={() => setIsSignup(false)}>Register</Button>
        <Button className="toggle-btn w-50" style={{ backgroundColor: "#ff8c00", borderColor: "#ff8c00" }} onClick={() => setIsSignup(true)}>Sign Up</Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationSignup;
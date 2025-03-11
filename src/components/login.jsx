import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaApple, FaUser, FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";
import App from "./landing";

const Login = () => {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [redirectToApp, setRedirectToApp] = useState(false);

  const correctPassword = "Souvik2003";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== correctPassword) {
      setAttempts(attempts + 1);
      setError("Incorrect password! Try again.");
    } else {
      setError("Login successful!");
      setTimeout(() => setRedirectToApp(true), 1000); // Redirect after 1 second
    }
  };

  if (redirectToApp) {
    return <App />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-4 shadow-lg"
            style={{
              border: "2px solid #FFD700",
              borderRadius: "15px",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div className="text-center mb-3">
              <FaUser size={50} color="#FFD700" />
            </div>
            <h2 className="text-center mb-4" style={{ color: "#FFD700" }}>
              Login
            </h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label style={{ color: "#FFD700", fontWeight: "bold" }}>
                  Enter your phone number or email
                </label>
                <input
                  type="text"
                  name="identifier"
                  className="form-control"
                  required
                  onChange={handleChange}
                  style={{
                    borderColor: "#FFD700",
                    backgroundColor: "#FFFFFF",
                  }}
                />
              </div>
              <div className="mb-3 position-relative">
                <label style={{ color: "#FFD700", fontWeight: "bold" }}>
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="form-control"
                  required
                  onChange={handleChange}
                  style={{
                    borderColor: "#FFD700",
                    backgroundColor: "#FFFFFF",
                  }}
                />
                <span
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "38px",
                    cursor: "pointer",
                    color: "#FFD700",
                  }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {attempts >= 5 && (
                <p className="text-danger text-center">Forgot Password?</p>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                type="submit"
                className="btn w-100"
                style={{
                  backgroundColor: "#FFD700",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                }}
              >
                Submit
              </motion.button>
            </form>
            <div className="text-center mt-3 d-flex justify-content-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn w-50 me-2"
                style={{ backgroundColor: "#FFD700", color: "#FFFFFF" }}
                onClick={() => setRedirectToApp(true)}
              >
                <FaGoogle /> Login with Google
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="btn w-50"
                style={{ backgroundColor: "#FFD700", color: "#FFFFFF" }}
                onClick={() => setRedirectToApp(true)}
              >
                <FaApple /> Login with Apple
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

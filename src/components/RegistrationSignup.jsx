import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaGoogle, FaApple, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";
import OTPVerification from "./otp";
import Login from "./login";
import App from "./landing";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [focused, setFocused] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const [redirectToApp, setRedirectToApp] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "number" && !/^\d{0,10}$/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (field) => {
    setFocused({ ...focused, [field]: true });
  };

  const handleBlur = (field) => {
    if (!formData[field]) {
      setFocused({ ...focused, [field]: false });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    if (!/^\d{10}$/.test(formData.number)) {
      setError("Number must be exactly 10 digits!");
      return;
    }
    setError("");
    setIsSubmitted(true);
  };

  if (isSubmitted) return <OTPVerification />;
  if (redirectToLogin) return <Login />;
  if (redirectToApp) return <App />;

  return (
    <div className="container mt-5 main-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card p-4 shadow-lg signup-card"
          >
            <div className="text-center mb-3">
              <FaUser size={50} color=" #E6C200" />
            </div>
            <h2 className="text-center mb-4" style={{ color: " #E6C200" }}>
              Sign Up
            </h2>
            {error && <p className="text-danger text-center">{error}</p>}
            <form onSubmit={handleSubmit}>
              {["name", "email", "number", "password", "confirmPassword"].map((field, index) => (
                <div key={index} className="input-container">
                  <label className={focused[field] || formData[field] ? "focused" : ""}>
                    {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field === "number" ? "tel" : field.includes("password") ? "password" : "text"}
                    name={field}
                    className="form-control"
                    required
                    maxLength={field === "number" ? 10 : undefined}
                    onFocus={() => handleFocus(field)}
                    onBlur={() => handleBlur(field)}
                    onChange={handleChange}
                    value={formData[field]}
                  />
                </div>
              ))}
              <motion.button whileHover={{ scale: 1.05 }} type="submit" className="btn w-100 custom-btn">
                Sign Up
              </motion.button>
            </form>
            <div className="text-center mt-3 d-flex justify-content-between">
              <motion.button whileHover={{ scale: 1.05 }} className="btn google-btn w-50 me-2" onClick={() => setRedirectToApp(true)}>
                <FaGoogle /> Sign Up with Google
              </motion.button>
              <motion.button whileHover={{ scale: 1.05 }} className="btn apple-btn w-50" onClick={() => setRedirectToApp(true)}>
                <FaApple /> Sign Up with Apple
              </motion.button>
            </div>
            <p className="text-center mt-3">
              If you sign up,{" "}
              <button className="btn btn-link p-0" onClick={() => setRedirectToLogin(true)}>
                tap there
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

// Internal CSS
const styles = `
.main-container{
  }
.signup-card {
    backdrop-filter: blur(7px) saturate(111%);
    -webkit-backdrop-filter: blur(7px) saturate(111%);
    background-color: rgba(17, 25, 40, 0.18);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.125);
}
.input-container {
  position: relative;
  margin-bottom: 20px;
}
.input-container label {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.3s ease;
  font-size: 16px;
  color: #FFD700; /* Gold */
}

.input-container input {
  background-color: #FFFFFF; /* White */
  border: 2px solid #FFD700; /* Gold */
  padding: 10px;
  border-radius: 8px;
}

.input-container input:focus {
  border-color: #E6C200; /* Slightly darker Gold */
  background-color: #FFFACD; /* Light Gold */
}

.input-container input:focus + label,
.input-container .focused {
  top: 5px;
  font-size: 12px;
  color: #FFD700; /* Gold */
}

.custom-btn {
  background-color: #FFD700 !important; /* Gold */
  color: #FFFFFF !important; /* White */
  border: none !important;
  border-radius: 10px;
  padding: 10px;
}

.custom-btn:hover {
  background-color: #E6C200 !important; /* Slightly darker Gold */
}

.google-btn {
  background-color: #FFD700; /* Gold */
  color: #FFFFFF; /* White */
  border-radius: 10px;
}

.google-btn:hover {
  background-color: #E6C200; /* Slightly darker Gold */
}

.apple-btn {
  background-color: #FFD700; /* Gold */
  color: #FFFFFF; /* White */
  border-radius: 10px;
}

.apple-btn:hover {
  background-color: #E6C200; /* Slightly darker Gold */
}

`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

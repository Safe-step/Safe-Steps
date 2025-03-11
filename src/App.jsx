import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPage from "./components/EntryPage"; // Adjust the path if needed
import  Signup  from "./components/RegistrationSignup"; // Adjust the path if needed
import App from "./components/landing";
import OTPVerification from "./components/otp";


const main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/register" element={< Signup />} />
        <Route path="/" element={<OTPVerification />} />
      <Route path="/landing" element={<App />} />
   
      </Routes>
    </Router>
  );
};

export default main;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EntryPage from "./components/EntryPage"; // Adjust the path if needed
import RegistrationSignup from "./components/RegistrationSignup"; // Adjust the path if needed



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EntryPage />} />
        <Route path="/register" element={<RegistrationSignup />} />
      </Routes>
    </Router>
  );
};

export default App;

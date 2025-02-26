import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";




const EntryPage = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="entry-page">
      <div className="overlay">
        <div className="content">
          <h1 className="animated-title">Welcome to Safe Steps</h1>
          <p className="animated-text">
            Your one-stop solution for women's safety and empowerment.
          </p>
          <button
  className="btn btn-lg animated-button"
  onClick={() => navigate("/register")}
>
  Get Started
</button>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;

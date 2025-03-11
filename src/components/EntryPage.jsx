import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import entry from "../assets/entry.mp4";

const textArray = ["Safe Steps"];

const EntryPage = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Slow when typing in, fast when deleting
  const typingSpeed = isDeleting ? 30 : 80; 

  useEffect(() => {
    let typingInterval;

    if (!isDeleting && text.length === textArray[index].length) {
      setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % textArray.length);
    }

    typingInterval = setTimeout(() => {
      setText((prev) =>
        isDeleting ? prev.slice(0, -1) : textArray[index].slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(typingInterval);
  }, [text, isDeleting, index]);

  return (
    <motion.div className="entry-page container-fluid d-flex align-items-center justify-content-center">
      {/* Video Background */}
      <motion.video
        autoPlay
        loop
        muted
        className="background-video"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <source src={entry} type="video/mp4" />
      </motion.video>

      {/* Overlay Content */}
      <motion.div className="overlay text-center p-4 p-md-5 col-12 col-md-8">
        {/* Animated Title */}
        <motion.h1
          key={index}
          className="animated-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.span className="typing-text">{text}</motion.span>
        </motion.h1>

        {/* Subtitle and Button (Delayed appearance) */}
        <motion.p
          className="animated-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3 }}
        >
          Your one-stop solution for women's safety and empowerment.
        </motion.p>

        <motion.button
          className="btn btn-lg animated-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 3.2 }}
          onClick={() => navigate("/register")}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default EntryPage;

// Updated CSS
const styles = `
@import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&display=swap");

body {
  font-family: "Roboto", sans-serif;
  background: #f7f7f7;
  margin: 0;
  padding: 0;
}

.entry-page {
  height: 100vh;
  text-align: center;
}

/* Animated Title */
.animated-title {
  font-family: "Dancing Script", cursive;
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #FFD700; /* Updated to gold */
  text-shadow: 2px 2px 10px #FFD700;
}

/* Typing Effect */
.typing-text {
  display: inline-block;
  padding-right: 6px;
  font-size: 3.5rem;
  color: #FFD700; /* Updated to gold */
  animation: blink 0.5s infinite alternate;
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.animated-text {
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.6;
  text-align: center;
  color: #FFFFFF; /* Updated to white */
}

/* Updated Button Styles */
.animated-button {
  background-color: #FFD700; /* Gold */
  color: #FFFFFF; /* White */
  border: none;
  padding: 15px 40px;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.animated-button:hover {
  background-color: #FFC107; /* Slightly darker gold */
  transform: scale(1.1);
}

.animated-button:active {
  background-color: #FFB300;
  transform: scale(0.95);
}

/* 🌟 Mobile Responsive Adjustments */
@media (max-width: 768px) {
  .animated-title {
    font-size: 3rem;
  }
  .typing-text {
    font-size: 2.5rem;
  }
  .animated-text {
    font-size: 1.2rem;
  }
  .animated-button {
    padding: 12px 30px;
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .animated-title {
    font-size: 2.5rem;
  }
  .typing-text {
    font-size: 2rem;
  }
  .animated-text {
    font-size: 1rem;
  }
  .animated-button {
    padding: 10px 25px;
    font-size: 1rem;
  }
}

`;

document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);

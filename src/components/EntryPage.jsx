import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "../App.css";

const textArray = ["সেফ স্টেপস", "सेफ स्टेप्स", "Safe Steps"]; // Bengali, Hindi, English

const EntryPage = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = isDeleting ? 20 : 30; // Faster typing and deleting

  useEffect(() => {
    let typingInterval;

    if (!isDeleting && text.length === textArray[index].length) {
      setTimeout(() => setIsDeleting(true), 500); // Pause before deleting
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
      <motion.div className="overlay text-center p-4 p-md-5 col-12 col-md-8">
        {/* Animated Title */}
        <motion.h1
          key={index}
          className="animated-title"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.2, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <motion.span className="typing-text">{text}</motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="animated-text">Your one-stop solution for women's safety and empowerment.</motion.p>

        {/* Button */}
        <motion.button
          className="btn btn-lg animated-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate("/register")}
        >
          Get Started
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default EntryPage;

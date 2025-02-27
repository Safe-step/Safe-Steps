import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../App.css";

const textArray = ["সেফ স্টেপস", "सेफ स्टेप्स", "Safe Steps"]; // Bengali, Hindi, English

const EntryPage = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = isDeleting ? 40 : 80; // Faster deletion, smooth typing

  useEffect(() => {
    let typingInterval;

    if (!isDeleting && text.length === textArray[index].length) {
      setTimeout(() => setIsDeleting(true), 800); // Hold before deleting
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % textArray.length); // Switch to next text
    }

    typingInterval = setTimeout(() => {
      setText((prev) =>
        isDeleting ? prev.slice(0, -1) : textArray[index].slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(typingInterval);
  }, [text, isDeleting, index]);

  return (
    <div className="entry-page">
      <div className="overlay">
        <div className="content">
          {/* Animated Text */}
          <motion.h1
            key={index}
            className="animated-title"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: 20 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <span className="typing-text">{text}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="animated-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          >
            Your one-stop solution for women's safety and empowerment.
          </motion.p>

          {/* Get Started Button */}
          <motion.button
            className="btn btn-lg animated-button"
            whileHover={{ scale: 1.1, backgroundColor: "#FFA500", color: "#fff" }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => navigate("/register")}
          >
            Get Started
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;

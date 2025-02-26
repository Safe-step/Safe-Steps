import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const textArray = ["সেফ স্টেপস", "सेफ स्टेप्स", "Safe Steps"]; // Bengali, Hindi, English

const EntryPage = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const speed = isDeleting ? 100 : 150; // Typing and deleting speed

  useEffect(() => {
    let typingInterval;

    if (!isDeleting && text.length === textArray[index].length) {
      setTimeout(() => setIsDeleting(true), 1000); // Hold text for 1s before deleting
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % textArray.length); // Move to next language
    }

    typingInterval = setTimeout(() => {
      setText((prev) =>
        isDeleting ? prev.slice(0, -1) : textArray[index].slice(0, prev.length + 1)
      );
    }, speed);

    return () => clearTimeout(typingInterval);
  }, [text, isDeleting, index]);

  return (
    <div className="entry-page">
      <div className="overlay">
        <div className="content">
          <h1 className="animated-title">
            <span className="typing-text">{text}</span>
          </h1>
          <p className="animated-text">
            Your one-stop solution for women's safety and empowerment.
          </p>
          <button className="btn btn-lg animated-button" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryPage;

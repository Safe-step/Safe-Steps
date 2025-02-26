import React, { useState } from "react";
import QRCode from "react-qr-code";
import { motion } from "framer-motion";

const DonationPage = () => {
  const [amount, setAmount] = useState(100);
  const upiId = "mondalsouvik31695@okhdfcbank";
  
  const qrValue = `upi://pay?pa=${upiId}&pn=Donation&am=${amount}&cu=INR`;

  const getEmoji = () => {
    if (amount <= 50) return "😢"; // Sad
    if (amount <= 100) return "😐"; // Okay
    if (amount <= 400) return "🙂"; // Satisfied
    if (amount <= 700) return "😊"; // Happy
    return "😁"; // Very Happy
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-10 bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen text-center">
      <motion.h1 
        className="text-4xl font-extrabold text-blue-800 drop-shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Support the Cause
      </motion.h1>
      <p className="text-lg text-gray-800 font-medium">Your contribution helps us make a difference.</p>
      
      <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-lg w-80">
        <label className="text-lg font-semibold mb-2 text-gray-700">Select Donation Amount: ₹{amount}</label>
        <input
          type="range"
          min="1"
          max="1000"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full cursor-pointer accent-blue-600"
        />
          <div className="text-[200px]">{getEmoji()}</div>
      </div>
      
      <div className="flex flex-row items-center bg-white p-6 rounded-2xl shadow-lg w-96 justify-between">
        <div className="flex flex-col items-center">
          <p className="text-lg font-semibold mb-2 text-gray-700">Scan to Donate via UPI</p>
          <QRCode value={qrValue} size={200} className="border-2 border-blue-600 p-2 rounded-lg shadow-md" />
          <p className="text-sm text-gray-500 mt-2">UPI ID: <span className="font-semibold text-gray-700">{upiId}</span></p>
        </div>
      
      </div>
    </div>
  );
};

export default DonationPage;

import React, { useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
import { QRCodeCanvas } from "qrcode.react";

const DonationPage = () => {
  const [amount, setAmount] = useState(100);
  const upiId = "mondalsouvik31695@okhdfcbank";

  // Handle Razorpay Payment
  const handleRazorpayPayment = () => {
    const options = {
      key: "rzp_test_zwUrEZLZDKkOGT",
      amount: amount * 100, // Convert to paise
      currency: "INR",
      name: "Donation",
      description: "Support the cause",
      handler: function (response) {
        alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Souvik Mondal",
        email: "mondaksouvik289@gmail.com",
        contact: "7362949785",
      },
      theme: {
        color: "#FFD700", // Updated color to gold
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card style={{ width: "400px", padding: "20px", borderRadius: "15px", backgroundColor: "#FFFFFF", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <h2 className="text-center mb-4" style={{ color: "#FFD700" }}>Make a Donation</h2>

        {/* Range Slider */}
        <Form.Group className="p-2">
          <Form.Label className="fw-bold">Donation Amount: ₹{amount}</Form.Label>
          <Form.Range
            min="1"
            max="100000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="animated-range"
            style={{ accentColor: "#FFD700" }}
          />
        </Form.Group>

        {/* QR Code */}
        <div className="text-center mt-3">
          <QRCodeCanvas value={`upi://pay?pa=${upiId}&pn=Souvik Mondal&am=${amount}&cu=INR`} size={150} />
          <p className="mt-2" style={{ color: "#666" }}>Scan to Pay</p>
        </div>

        {/* Button */}
        <div className="d-flex justify-content-center mt-3">
          <Button 
            style={{ 
              backgroundColor: "#FFD700", 
              borderColor: "#FFD700", 
              color: "#000", 
              fontWeight: "bold",
              padding: "10px 20px",
              borderRadius: "25px",
              transition: "0.3s"
            }} 
            onClick={handleRazorpayPayment} 
            className="mx-2"
            onMouseOver={(e) => e.target.style.backgroundColor = "#FFC107"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#FFD700"}
          >
            Pay with Razorpay
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default DonationPage;

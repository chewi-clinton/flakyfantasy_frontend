import React from "react";
import "../styles/Orderconfirmation.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const OrderConfirmation = () => {
  return (
    <>
      <Header />
      <div className="order-confirmation-page">
        <div className="confirmation-card">
          <div className="cake-image-container">
            <img
              src="path-to-cake-image.jpg"
              alt="Cake"
              className="cake-image"
            />
          </div>
          <div className="confirmation-details">
            <h1>Order Confirmed!</h1>
            <p>Thank you! Your order has been successfully placed.</p>
            <p>We've sent an email with your order details.</p>
            <div className="order-number">Order #1234567890</div>
            <button className="view-order-btn">View Order Details</button>
            <div className="contact-info">
              <p>Need help? Contact us at support@flakyfantasies.com</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConfirmation;

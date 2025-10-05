import React, { useState } from "react";
import "../styles/Cart.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const CartPage = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const cartItems = [
    {
      id: 1,
      name: "Chocolate Fudge Cake",
      price: 35.0,
      quantity: 1,
      image: "path-to-image-1.jpg",
    },
    {
      id: 2,
      name: "Almond Croissant",
      price: 4.5,
      quantity: 2,
      image: "path-to-image-2.jpg",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = discountApplied ? 5.0 : 0;
  const total = subtotal - discount;

  const handleApplyDiscount = () => {
    if (discountCode.trim() === "DISCOUNT5") {
      setDiscountApplied(true);
    } else {
      alert("Invalid discount code");
    }
  };

  const handleProceedToCheckout = () => {
    alert("Proceeding to checkout...");
  };

  const handleContinueShopping = () => {
    alert("Continuing shopping...");
  };

  return (
    <>
      <Header />
      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                </div>
                <div className="item-quantity">
                  <div className="quantity-display">Qty: {item.quantity}</div>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span className="discount-amount">-${discount.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="discount-section">
              <input
                type="text"
                placeholder="Discount code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="discount-input"
              />
              <button
                className="apply-btn"
                onClick={handleApplyDiscount}
                disabled={discountApplied}
              >
                Apply
              </button>
            </div>

            <button className="checkout-btn" onClick={handleProceedToCheckout}>
              Proceed to Checkout
            </button>

            <button
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;

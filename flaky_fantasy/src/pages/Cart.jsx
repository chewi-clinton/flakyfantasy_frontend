import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useApp } from "../context/AppContext.jsx";

const CartPage = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const { cart, removeFromCart, updateCartItem, getCartTotal, clearCart } =
    useApp();

  const discount = discountApplied ? 3000 : 0;
  const total = getCartTotal() - discount;

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

  const formatCurrency = (amount) => {
    return `FCFA ${amount.toLocaleString()}`;
  };

  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="cart-page">
          <div className="empty-cart">
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added any items to your cart yet.</p>
            <Link to="/shop" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>

        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  {item.image ? (
                    <img src={item.image} alt={item.name} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-price">{formatCurrency(item.price)}</div>
                </div>
                <div className="item-quantity">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateCartItem(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-total">
                  {formatCurrency(item.price * item.quantity)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{formatCurrency(getCartTotal())}</span>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <span className="discount-amount">
                -{formatCurrency(discount)}
              </span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
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

            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;

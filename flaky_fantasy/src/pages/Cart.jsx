import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Cart.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useApp } from "../context/AppContext.jsx";
import { getImageUrl } from "../api/api.jsx";

const CartPage = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { cart, removeFromCart, updateQuantity, clearCart } = useApp();

  const handleApplyDiscount = () => {
    if (discountCode.trim() === "DISCOUNT5") {
      setDiscountApplied(true);
    } else {
      alert("Invalid discount code");
    }
  };

  const handleCheckoutViaWhatsApp = () => {
    const productList = cart
      .map((item) => {
        const imageUrl = item.image ? getImageUrl(item.image) : null;
        const imageText = imageUrl ? `\nImage: ${imageUrl}` : "";
        return `${item.name}: Quantity ${item.quantity}${imageText}`;
      })
      .join("\n\n");

    const message = `Hello, I'm interested in the following products:\n\n${productList}\n\nDelivery Address: ${
      deliveryAddress || "Not specified"
    }\n\nDiscount Code: ${
      discountApplied ? discountCode : "None"
    }\n\nPlease let me know the total price and payment options.`;

    const phoneNumber = "237650966992";

    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    const isLikelyAndroidIssue = navigator.userAgent
      .toLowerCase()
      .includes("android");
    if (isLikelyAndroidIssue) {
      alert(
        "Opening WhatsApp...\n\nNote: If the phone number displays incorrectly (e.g., as a local number like +65966992), tap the contact name > View contact > Edit, and enter +237650966992 manually to fix the display. The chat will still work correctly!"
      );
    }

    window.open(whatsappLink, "_blank");
    setShowConfirmation(true);
    clearCart();
  };

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({
      ...prev,
      [itemId]: true,
    }));
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
                    imageErrors[item.id] ? (
                      <div className="no-image">Image not available</div>
                    ) : (
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.name}
                        onError={() => handleImageError(item.id)}
                      />
                    )
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-description">
                    {item.description || "No description available"}
                  </div>
                </div>
                <div className="item-quantity">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
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

            <div className="order-items-summary">
              <h3>Items in your order:</h3>
              <ul className="summary-items-list">
                {cart.map((item) => (
                  <li key={item.id} className="summary-item">
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-quantity">
                      Qty: {item.quantity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="delivery-address-section">
              <h3>Delivery Address</h3>
              <textarea
                placeholder="Enter your delivery address"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="delivery-address-input"
                rows={3}
              />
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
              {discountApplied && (
                <div className="discount-applied-message">
                  Discount code applied successfully!
                </div>
              )}
            </div>

            <div className="whatsapp-checkout-section">
              <div className="whatsapp-instructions">
                <p>
                  Instead of completing your payment on this website, we'll send
                  your order details via WhatsApp. Please follow these steps
                  carefully:
                </p>
                <ol>
                  <li>
                    Click the <strong>"Send via WhatsApp"</strong> button below.
                  </li>
                  <li>
                    Your order details will automatically appear in WhatsApp —
                    <strong>do not edit or modify</strong> the message.
                  </li>
                  <li>
                    Simply tap <strong>Send</strong> to share your order with
                    our team.
                  </li>
                  <li>
                    Our team will then contact you with pricing information and
                    payment options.
                  </li>
                </ol>
                <p>Thank you for your cooperation!</p>
              </div>

              <button
                className="whatsapp-checkout-btn"
                onClick={handleCheckoutViaWhatsApp}
              >
                Checkout via WhatsApp
              </button>
            </div>

            {showConfirmation && (
              <div className="confirmation-message">
                <p>
                  Your order has been sent via WhatsApp! Our team will contact
                  you shortly with pricing information.
                </p>
              </div>
            )}

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

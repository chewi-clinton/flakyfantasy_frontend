import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/product_detail.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import heroCake from "../assets/hero-cake.png";
import ndcake from "../assets/Birthday_cakes.JPG";

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("medium");
  const [customText, setCustomText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id") || "1";

  const product = {
    id: 1,
    name: "Chocolate Fudge Cake",
    price: 35.0,
    image: productId === "1" ? heroCake : "path-to-image.jpg",
    sizes: [
      { name: "Small", price: 25.0 },
      { name: "Medium", price: 35.0 },
      { name: "Large", price: 45.0 },
    ],
  };

  const handleAddToCart = () => {
    alert(
      `Added to cart: ${
        product.name
      }, Size: ${selectedSize}, Quantity: ${quantity}, Custom: ${
        customText || "None"
      }`
    );
  };

  const getSizePrice = () => {
    const size = product.sizes.find(
      (s) => s.name.toLowerCase() === selectedSize
    );
    return size ? size.price : product.price;
  };

  return (
    <>
      <Header />
      <div className="product-detail-page">
        <div className="product-container">
          <div className="product-image-container">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
          </div>

          <div className="product-details">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-price">
              {getSizePrice().toFixed(2)} FCFA
            </div>

            <div className="size-selection">
              <h3>Select Size</h3>
              <div className="size-options">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`size-btn ${
                      selectedSize === size.name.toLowerCase() ? "active" : ""
                    }`}
                    onClick={() => setSelectedSize(size.name.toLowerCase())}
                  >
                    {size.name}
                    <span className="size-price">
                      {size.price.toFixed(2)} FCFA
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="quantity-input"
                />
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="customization">
              <h3>Customize Your Cake</h3>
              <textarea
                placeholder="Enter any custom name or special features for your cake (e.g., Happy Birthday John, extra chocolate, etc.)"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                className="custom-text-input"
                rows={3}
              />
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>

        <div className="related-products">
          <h2>You Might Also Like</h2>
          <div className="related-grid">
            <div className="related-product">
              <img
                src={heroCake}
                alt="Chocolate Fudge Cake"
                className="related-image"
              />
              <h3>Chocolate Fudge Cake</h3>
              <div className="related-price">35.00 FCFA</div>
            </div>
            <div className="related-product">
              <img
                src={ndcake}
                alt="Strawberry Cheesecake"
                className="related-image"
              />
              <h3>Strawberry Cheesecake</h3>
              <div className="related-price">32.00 FCFA</div>
            </div>
            <div className="related-product">
              <img src={heroCake} alt="Lemon Tart" className="related-image" />
              <h3>Lemon Tart</h3>
              <div className="related-price">28.00 FCFA</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;

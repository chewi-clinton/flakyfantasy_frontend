import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { productsAPI, getImageUrl } from "../api/api.jsx";
import { useApp } from "../context/AppContext.jsx";
import "../styles/Product_detail.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("medium");
  const [customText, setCustomText] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useApp();

  // Extract product ID from URL
  const queryParams = new URLSearchParams(location.search);
  const productId = queryParams.get("id");

  useEffect(() => {
    if (!productId) {
      setError("Product ID is missing");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getProduct(productId);
        setProduct(response);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    // Calculate price based on selected size
    let price = parseFloat(product.price) || 0;
    if (product.sizes && product.sizes.length > 0) {
      const sizeObj = product.sizes.find(
        (s) => s.name.toLowerCase() === selectedSize
      );
      if (sizeObj) price = parseFloat(sizeObj.price) || 0;
    }

    const cartItem = {
      ...product,
      selectedSize,
      customText,
      quantity,
      price,
    };

    addToCart(cartItem);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getSizePrice = () => {
    if (!product) return 0;

    let price = parseFloat(product.price) || 0;

    if (product.sizes && product.sizes.length > 0) {
      const size = product.sizes.find(
        (s) => s.name.toLowerCase() === selectedSize
      );
      if (size) {
        price = parseFloat(size.price) || 0;
      }
    }

    return price;
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="product-detail-page">
          <div className="loading">Loading product details...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="product-detail-page">
          <div className="error">
            {error || "Product not found"}
            <button className="back-button" onClick={() => navigate("/shop")}>
              Back to Shop
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="product-detail-page">
        <div className="product-container">
          <div className="product-image-container">
            {product.images && product.images.length > 0 ? (
              imageError ? (
                <div className="no-image">Image not available</div>
              ) : (
                <img
                  src={getImageUrl(product.images[0].image)}
                  alt={product.name}
                  className="product-image"
                  onError={handleImageError}
                />
              )
            ) : (
              <div className="no-image">No Image Available</div>
            )}
          </div>

          <div className="product-details">
            <h1 className="product-name">{product.name}</h1>
            <div className="product-price">
              {getSizePrice().toFixed(2)} FCFA
            </div>

            {product.description && (
              <div className="product-description">{product.description}</div>
            )}

            {product.sizes && product.sizes.length > 0 && (
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
                      {/* Removed price display from size options */}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
            {/* You can implement related products fetching here */}
            <div className="related-product">
              <div className="no-image">Related Product 1</div>
              <h3>Related Product</h3>
              <div className="related-price">0.00 FCFA</div>
            </div>
            <div className="related-product">
              <div className="no-image">Related Product 2</div>
              <h3>Related Product</h3>
              <div className="related-price">0.00 FCFA</div>
            </div>
            <div className="related-product">
              <div className="no-image">Related Product 3</div>
              <h3>Related Product</h3>
              <div className="related-price">0.00 FCFA</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;

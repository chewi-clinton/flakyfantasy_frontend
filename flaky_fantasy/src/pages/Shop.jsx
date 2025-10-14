import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productsAPI } from "../api/api";
import { useApp } from "../context/AppContext.jsx";
import "../styles/Shop.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ShopPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useApp();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          productsAPI.getProducts(),
          productsAPI.getCategories(),
        ]);

        const productsData = productsRes.results || productsRes || [];
        setProducts(productsData);
        setFilteredProducts(productsData);

        const categoriesData = categoriesRes.results || categoriesRes || [];
        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let result = products;

    if (selectedFilter !== "All") {
      if (
        Array.isArray(categories) &&
        categories.some((cat) => cat && cat.name === selectedFilter)
      ) {
        result = result.filter(
          (product) =>
            product.category && product.category.name === selectedFilter
        );
      } else if (selectedFilter === "Price: Low to High") {
        result = [...result].sort((a, b) => a.price - b.price);
      } else if (selectedFilter === "Price: High to Low") {
        result = [...result].sort((a, b) => b.price - a.price);
      } else if (selectedFilter === "New Items") {
        result = result.filter(
          (product) =>
            product.labels &&
            Array.isArray(product.labels) &&
            product.labels.some((label) => label.name === "NEW")
        );
      } else if (selectedFilter === "Best Sellers") {
        result = result.filter(
          (product) =>
            product.labels &&
            Array.isArray(product.labels) &&
            product.labels.some((label) => label.name === "BEST SELLER")
        );
      } else if (selectedFilter === "Discounts") {
        result = result.filter(
          (product) =>
            product.labels &&
            Array.isArray(product.labels) &&
            product.labels.some(
              (label) => label.name && label.name.includes("OFF")
            )
        );
      }
    }

    setFilteredProducts(result);
  }, [products, selectedFilter, categories]);

  const filterOptions = [
    "All",
    ...(Array.isArray(categories)
      ? categories.map((cat) => (cat ? cat.name : "")).filter(Boolean)
      : []),
    "Price: Low to High",
    "Price: High to Low",
    "New Items",
    "Best Sellers",
    "Discounts",
  ];

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleProductClick = (id) => {
    navigate(`/product-details?id=${id}`);
  };

  const getTagClass = (tag) => {
    if (!tag) return "";

    switch (tag) {
      case "NEW":
        return "tag-new";
      case "BEST SELLER":
        return "tag-best-seller";
      default:
        if (tag.includes("OFF")) {
          return "tag-discount";
        }
        return "";
    }
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowDropdown(false);
  };

  if (loading)
    return (
      <>
        <Header />
        <div className="shop-page">
          <div className="loading">Loading products...</div>
        </div>
        <Footer />
      </>
    );

  if (error)
    return (
      <>
        <Header />
        <div className="shop-page">
          <div className="error">{error}</div>
        </div>
        <Footer />
      </>
    );

  return (
    <>
      <Header />
      <div className="shop-page">
        <div className="shop-header">
          <h1>Our Delicious Creations</h1>
          <p>Handcrafted with love, baked to perfection.</p>
        </div>

        <div className="shop-filters">
          <div className="filter-dropdown">
            <button
              className="filter-dropdown-btn"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {selectedFilter}
              <span
                className={`dropdown-arrow ${showDropdown ? "open" : ""}`}
              ></span>
            </button>
            {showDropdown && (
              <div className="dropdown-content">
                {filterOptions.map((option, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleFilterSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="products-grid">
          {Array.isArray(filteredProducts) && filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div
                  className="product-image-container"
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  {product.images &&
                  Array.isArray(product.images) &&
                  product.images.length > 0 ? (
                    <img
                      src={product.images[0].image}
                      alt={product.name}
                      className="product-image"
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                  <div className="product-tags">
                    {product.labels &&
                      Array.isArray(product.labels) &&
                      product.labels.map((label, index) => (
                        <span
                          key={index}
                          className={`tag ${getTagClass(label.name)}`}
                        >
                          {label.name}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="product-info">
                  <h3
                    className="product-name"
                    onClick={() => handleProductClick(product.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {product.name}
                  </h3>
                  <div className="product-price">
                    {product.price.toLocaleString()} FCFA
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">No products found</div>
          )}
        </div>

        <div className="pagination">
          <button
            className={`page-btn ${activePage === 1 ? "active" : ""}`}
            onClick={() => setActivePage(1)}
          >
            1
          </button>
          <button
            className={`page-btn ${activePage === 2 ? "active" : ""}`}
            onClick={() => setActivePage(2)}
          >
            2
          </button>
          <button
            className={`page-btn ${activePage === 3 ? "active" : ""}`}
            onClick={() => setActivePage(3)}
          >
            3
          </button>
          <button
            className="page-btn next"
            onClick={() => setActivePage((prev) => Math.min(prev + 1, 3))}
          >
            Next
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productsAPI, getImageUrl } from "../api/api.jsx";
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
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useApp();

  // Pagination settings
  const productsPerPage = 9; // Number of products per page
  const [totalPages, setTotalPages] = useState(0);
  const [currentPageProducts, setCurrentPageProducts] = useState([]);

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
    setActivePage(1); // Reset to first page when filter changes
  }, [products, selectedFilter, categories]);

  // Update pagination when filtered products change
  useEffect(() => {
    // Calculate total pages
    const pages = Math.ceil(filteredProducts.length / productsPerPage);
    setTotalPages(pages);

    // Ensure active page is within valid range
    if (activePage > pages && pages > 0) {
      setActivePage(pages);
    }

    // Get products for current page
    const startIndex = (activePage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setCurrentPageProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, activePage, productsPerPage]);

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

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({
      ...prev,
      [productId]: true,
    }));
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

  const handlePageChange = (page) => {
    setActivePage(page);
    // Scroll to top of products section
    window.scrollTo({
      top: document.querySelector(".products-grid").offsetTop - 100,
      behavior: "smooth",
    });
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of page buttons to show

    let startPage = Math.max(1, activePage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pageNumbers.push(
      <button
        key="prev"
        className={`page-btn ${activePage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(activePage - 1)}
        disabled={activePage === 1}
      >
        Previous
      </button>
    );

    // First page
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          className={`page-btn ${activePage === 1 ? "active" : ""}`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );

      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis1" className="ellipsis">
            ...
          </span>
        );
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`page-btn ${activePage === i ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis2" className="ellipsis">
            ...
          </span>
        );
      }

      pageNumbers.push(
        <button
          key={totalPages}
          className={`page-btn ${activePage === totalPages ? "active" : ""}`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    // Next button
    pageNumbers.push(
      <button
        key="next"
        className={`page-btn ${activePage === totalPages ? "disabled" : ""}`}
        onClick={() => handlePageChange(activePage + 1)}
        disabled={activePage === totalPages}
      >
        Next
      </button>
    );

    return <div className="pagination">{pageNumbers}</div>;
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

        <div className="products-info">
          <p>
            Showing {currentPageProducts.length} of {filteredProducts.length}{" "}
            products
          </p>
        </div>

        <div className="products-grid">
          {Array.isArray(currentPageProducts) &&
          currentPageProducts.length > 0 ? (
            currentPageProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div
                  className="product-image-container"
                  onClick={() => handleProductClick(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  {product.images &&
                  Array.isArray(product.images) &&
                  product.images.length > 0 ? (
                    imageErrors[product.id] ? (
                      <div className="no-image">Image not available</div>
                    ) : (
                      <img
                        src={getImageUrl(product.images[0].image)}
                        alt={product.name}
                        className="product-image"
                        onError={() => handleImageError(product.id)}
                      />
                    )
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
                  {/* Removed price display */}
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

        {renderPagination()}
      </div>
      <Footer />
    </>
  );
};

export default ShopPage;

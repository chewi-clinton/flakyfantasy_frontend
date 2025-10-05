import React, { useState } from "react";
import "../styles/Shop.css";

const ShopPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);

  const desserts = [
    {
      id: 1,
      name: "Chocolate Fudge Cake",
      price: 35.0,
      tags: ["NEW"],
      category: "Cakes",
      image: "path-to-image-1.jpg",
    },
    {
      id: 2,
      name: "Vanilla Bean Cupcakes",
      price: 20.0,
      tags: ["BEST SELLER"],
      category: "Cupcakes",
      image: "path-to-image-2.jpg",
    },
    {
      id: 3,
      name: "Strawberry Cheesecake",
      price: 28.0,
      tags: [],
      category: "Cakes",
      image: "path-to-image-3.jpg",
    },
    {
      id: 4,
      name: "Lemon Tart",
      price: 22.0,
      tags: ["20% OFF"],
      category: "Tarts",
      image: "path-to-image-4.jpg",
    },
    {
      id: 5,
      name: "Red Velvet Cake",
      price: 32.0,
      tags: [],
      category: "Cakes",
      image: "path-to-image-5.jpg",
    },
    {
      id: 6,
      name: "Tiramisu",
      price: 26.0,
      tags: ["NEW"],
      category: "Desserts",
      image: "path-to-image-6.jpg",
    },
  ];

  const filterOptions = [
    "All",
    "Category",
    "Price: Low to High",
    "Price: High to Low",
    "New Items",
    "Best Sellers",
    "Discounts",
  ];

  const handleAddToCart = (id) => {
    alert(`Added item #${id} to cart!`);
  };

  const getTagClass = (tag) => {
    switch (tag) {
      case "NEW":
        return "tag-new";
      case "BEST SELLER":
        return "tag-best-seller";
      case "20% OFF":
        return "tag-discount";
      default:
        return "";
    }
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowDropdown(false);
  };

  return (
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
        {desserts.map((dessert) => (
          <div key={dessert.id} className="product-card">
            <div className="product-image-container">
              <img
                src={dessert.image}
                alt={dessert.name}
                className="product-image"
              />
              <div className="product-tags">
                {dessert.tags.map((tag, index) => (
                  <span key={index} className={`tag ${getTagClass(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="product-info">
              <h3 className="product-name">{dessert.name}</h3>
              <div className="product-price">${dessert.price.toFixed(2)}</div>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(dessert.id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
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
  );
};

export default ShopPage;

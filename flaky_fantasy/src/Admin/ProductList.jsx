// Admin/ProductList.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: "Chocolate Fudge Cake",
        category: "Cakes",
        price: 35.0,
        discountPrice: null,
        inStock: true,
        stockQuantity: 15,
        image: "chocolate-cake.jpg",
      },
      {
        id: 2,
        name: "Vanilla Bean Cupcakes",
        category: "Cupcakes",
        price: 20.0,
        discountPrice: 18.0,
        inStock: true,
        stockQuantity: 24,
        image: "vanilla-cupcakes.jpg",
      },
      {
        id: 3,
        name: "Strawberry Cheesecake",
        category: "Cakes",
        price: 28.0,
        discountPrice: null,
        inStock: false,
        stockQuantity: 0,
        image: "strawberry-cheesecake.jpg",
      },
      {
        id: 4,
        name: "Almond Croissant",
        category: "Pastries",
        price: 4.5,
        discountPrice: null,
        inStock: true,
        stockQuantity: 30,
        image: "almond-croissant.jpg",
      },
      {
        id: 5,
        name: "Lemon Tart",
        category: "Pastries",
        price: 22.0,
        discountPrice: 18.0,
        inStock: true,
        stockQuantity: 12,
        image: "lemon-tart.jpg",
      },
      {
        id: 6,
        name: "Chocolate Chip Cookies",
        category: "Cookies",
        price: 12.0,
        discountPrice: null,
        inStock: true,
        stockQuantity: 50,
        image: "chocolate-cookies.jpg",
      },
    ];

    const mockCategories = [
      "all",
      "Cakes",
      "Cupcakes",
      "Pastries",
      "Cookies",
      "Bread",
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setCategories(mockCategories);
  }, []);

  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (availabilityFilter === "available") {
      result = result.filter((product) => product.inStock);
    } else if (availabilityFilter === "sold-out") {
      result = result.filter((product) => !product.inStock);
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, availabilityFilter]);

  const deleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div className="product-list-page">
      <div className="admin-page-header">
        <button className="back-btn" onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>
        <h1>Products</h1>
        <Link to="/admin/products/new" className="btn btn-primary">
          <span className="btn-icon">+</span> Add New Product
        </Link>
      </div>

      <div className="filters-section">
        <div className="search-filter">
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="filter-options">
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Availability:</label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="sold-out">Sold Out</option>
            </select>
          </div>
        </div>
      </div>

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Discount Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="product-info">
                    <div className="product-image">
                      <img
                        src={`./src/assets/${product.image}`}
                        alt={product.name}
                      />
                    </div>
                    <div className="product-name">{product.name}</div>
                  </td>
                  <td>{product.category}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>
                    {product.discountPrice ? (
                      <div className="discount-price">
                        <span className="original-price">
                          ${product.price.toFixed(2)}
                        </span>
                        <span className="discounted-price">
                          ${product.discountPrice.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{product.stockQuantity}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        product.inStock ? "in-stock" : "sold-out"
                      }`}
                    >
                      {product.inStock ? "In Stock" : "Sold Out"}
                    </span>
                  </td>
                  <td className="actions">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="action-btn edit-btn"
                    >
                      ✏️
                    </Link>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;

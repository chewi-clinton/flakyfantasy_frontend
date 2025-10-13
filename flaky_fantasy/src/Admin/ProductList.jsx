import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { adminProductsAPI } from "../api/AdminApi.jsx";
import "../styles/ProductList.css";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          adminProductsAPI.getProducts(),
          adminProductsAPI.getCategories(),
        ]);

        setProducts(productsRes.results);
        setFilteredProducts(productsRes.results);
        setCategories(categoriesRes);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        (product) => product.category.name === selectedCategory
      );
    }

    if (availabilityFilter === "available") {
      result = result.filter((product) => product.in_stock);
    } else if (availabilityFilter === "sold-out") {
      result = result.filter((product) => !product.in_stock);
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, availabilityFilter]);

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await adminProductsAPI.deleteProduct(id);
        setProducts(products.filter((product) => product.id !== id));
      } catch (err) {
        setError("Failed to delete product");
      }
    }
  };

  const toggleStockStatus = async (id, currentStatus) => {
    try {
      const product = products.find((p) => p.id === id);
      await adminProductsAPI.updateStock(id, currentStatus ? 0 : 10);

      setProducts(
        products.map((p) =>
          p.id === id
            ? {
                ...p,
                in_stock: !currentStatus,
                stock_quantity: currentStatus ? 0 : 10,
              }
            : p
        )
      );
    } catch (err) {
      setError("Failed to update stock status");
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="product-list-page">
      <div className="admin-page-header">
        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
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
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
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
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0].image} alt={product.name} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    <div className="product-name">{product.name}</div>
                  </td>
                  <td>{product.category.name}</td>
                  <td>{product.price.toLocaleString()} FCFA</td>
                  <td>{product.stock_quantity}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        product.in_stock ? "in-stock" : "sold-out"
                      }`}
                    >
                      {product.in_stock ? "In Stock" : "Sold Out"}
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
                      className={`action-btn ${
                        product.in_stock ? "stock-out-btn" : "stock-in-btn"
                      }`}
                      onClick={() =>
                        toggleStockStatus(product.id, product.in_stock)
                      }
                      title={
                        product.in_stock
                          ? "Mark as out of stock"
                          : "Mark as in stock"
                      }
                    >
                      {product.in_stock ? "📦" : "✅"}
                    </button>
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
                <td colSpan="6" className="no-results">
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

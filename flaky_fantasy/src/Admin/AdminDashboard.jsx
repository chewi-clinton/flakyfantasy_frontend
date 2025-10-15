import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { adminProductsAPI } from "../api/AdminApi";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch products data
        const productsRes = await adminProductsAPI.getProducts();
        const products = productsRes.results || productsRes;
        const lowStockProducts = products.filter(
          (p) => p.stock_quantity < 10
        ).length;

        setStats({
          totalProducts: products.length,
          lowStockProducts,
        });
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {admin?.first_name || admin?.username}!</p>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon products-icon">🍰</div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon low-stock-icon">⚠️</div>
          <div className="stat-info">
            <h3>Low Stock Products</h3>
            <p className="stat-value">{stats.lowStockProducts}</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/admin/products/new" className="action-card">
            <div className="action-icon">➕</div>
            <h3>Add Product</h3>
          </Link>

          <Link to="/admin/products" className="action-card">
            <div className="action-icon">🍰</div>
            <h3>Manage Products</h3>
          </Link>

          <Link to="/admin/categories" className="action-card">
            <div className="action-icon">📁</div>
            <h3>Categories</h3>
          </Link>

          <Link to="/admin/discounts" className="action-card">
            <div className="action-icon">🏷️</div>
            <h3>Discounts</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

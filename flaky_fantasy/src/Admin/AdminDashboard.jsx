// Admin/AdminDashboard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const dashboardCards = [
    {
      title: "Products",
      description:
        "Manage your products, add new items, edit existing ones, and control inventory.",
      icon: "🧁",
      link: "/admin/products",
      color: "#f0c05a",
    },
    {
      title: "Categories",
      description:
        "Organize your products into categories for better navigation and management.",
      icon: "📂",
      link: "/admin/categories",
      color: "#3498db",
    },
    {
      title: "Discounts",
      description:
        "Create and manage discount codes to attract more customers.",
      icon: "💰",
      link: "/admin/discounts",
      color: "#2ecc71",
    },
    {
      title: "Services",
      description:
        "Manage your service offerings and customize them as needed.",
      icon: "🎂",
      link: "/admin/services",
      color: "#9b59b6",
    },
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome to Flaky Fantasies Admin Panel</p>
      </div>

      <div className="dashboard-cards">
        {dashboardCards.map((card, index) => (
          <Link to={card.link} key={index} className="dashboard-card">
            <div className="card-icon" style={{ backgroundColor: card.color }}>
              {card.icon}
            </div>
            <div className="card-content">
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
            <div className="card-arrow">
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <div className="stat-value">24</div>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <div className="stat-value">142</div>
        </div>
        <div className="stat-card">
          <h3>Active Discounts</h3>
          <div className="stat-value">5</div>
        </div>
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <div className="stat-value">$8,420</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

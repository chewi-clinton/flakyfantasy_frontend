import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();

  const handleLogout = () => {
    logout();
    navigate("/Admin-login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        <Link to="/admin" className="admin-logo">
          Flaky Fantasy Admin
        </Link>
        <nav className="admin-nav-menu">
          <Link to="/admin" className="admin-nav-link">
            Dashboard
          </Link>
          <Link to="/admin/products" className="admin-nav-link">
            Products
          </Link>
          <Link to="/admin/categories" className="admin-nav-link">
            Categories
          </Link>
          <Link to="/admin/discounts" className="admin-nav-link">
            Discounts
          </Link>
          <Link to="/admin/services" className="admin-nav-link">
            Services
          </Link>
        </nav>
        <div className="admin-header-actions">
          <div className="admin-user-info">
            <span className="admin-name">
              {admin?.first_name || admin?.username}
            </span>
            <span className="admin-role">{admin?.role}</span>
          </div>
          <button className="admin-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

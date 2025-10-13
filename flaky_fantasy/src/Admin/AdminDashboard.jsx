import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import {
  adminProductsAPI,
  adminOrdersAPI,
  adminNotificationsAPI,
} from "../api/AdminApi.jsx";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { admin, logout } = useAdmin();
  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsRes = await adminProductsAPI.getProducts();
        const products = productsRes.results;
        const lowStockProducts = products.filter(
          (p) => p.stock_quantity < 10
        ).length;

        const ordersRes = await adminOrdersAPI.getOrders();
        const orders = ordersRes.results;
        const pendingOrders = orders.filter(
          (o) => o.status === "pending"
        ).length;

        const notificationsRes = await adminNotificationsAPI.getNotifications();

        setStats({
          totalProducts: products.length,
          lowStockProducts,
          totalOrders: orders.length,
          pendingOrders,
        });

        setRecentOrders(orders.slice(0, 5));
        setNotifications(notificationsRes.results.slice(0, 5));
      } catch (err) {
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

  const markAsRead = async (id) => {
    try {
      await adminNotificationsAPI.markAsRead(id);
      setNotifications(
        notifications.map((n) => (n.id === id ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
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
          <div className="notification-icon">
            <span className="icon">🔔</span>
            {notifications.filter((n) => !n.is_read).length > 0 && (
              <span className="notification-count">
                {notifications.filter((n) => !n.is_read).length}
              </span>
            )}
          </div>
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

        <div className="stat-card">
          <div className="stat-icon orders-icon">📋</div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending-orders-icon">⏳</div>
          <div className="stat-info">
            <h3>Pending Orders</h3>
            <p className="stat-value">{stats.pendingOrders}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="content-section">
          <div className="section-header">
            <h2>Recent Orders</h2>
            <Link to="/admin/orders" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="recent-orders">
            {recentOrders.length > 0 ? (
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.order_number}</td>
                      <td>{order.customer_name}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.total_amount.toLocaleString()} FCFA</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data">No recent orders</p>
            )}
          </div>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>Notifications</h2>
            <Link to="/admin/notifications" className="view-all-link">
              View All
            </Link>
          </div>

          <div className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item ${
                    !notification.is_read ? "unread" : ""
                  }`}
                >
                  <div className="notification-content">
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <div className="notification-meta">
                      <span className="notification-type">
                        {notification.notification_type}
                      </span>
                      <span className="notification-date">
                        {new Date(notification.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {!notification.is_read && (
                    <button
                      className="mark-read-btn"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="no-data">No notifications</p>
            )}
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

          <Link to="/admin/orders" className="action-card">
            <div className="action-icon">📋</div>
            <h3>View Orders</h3>
          </Link>

          <Link to="/admin/discounts" className="action-card">
            <div className="action-icon">🏷️</div>
            <h3>Manage Discounts</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

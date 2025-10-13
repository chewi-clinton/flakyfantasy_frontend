import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminProductsAPI } from "../api/AdminApi.jsx";
import "../styles/ServiceList.css";

const ServiceList = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    is_active: true,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await adminProductsAPI.getServices();
        setServices(response);
      } catch (err) {
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewService({
      ...newService,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (newService.name.trim() && newService.description.trim()) {
      try {
        await adminProductsAPI.createService(newService);
        const response = await adminProductsAPI.getServices();
        setServices(response);
        setNewService({
          name: "",
          description: "",
          price: "",
          is_active: true,
        });
      } catch (err) {
        setError("Failed to create service");
      }
    }
  };

  const toggleServiceStatus = async (id, currentStatus) => {
    try {
      await adminProductsAPI.toggleService(id);
      setServices(
        services.map((service) =>
          service.id === id
            ? { ...service, is_active: !currentStatus }
            : service
        )
      );
    } catch (err) {
      setError("Failed to toggle service status");
    }
  };

  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      try {
        await adminProductsAPI.deleteService(id);
        setServices(services.filter((service) => service.id !== id));
      } catch (err) {
        setError("Failed to delete service");
      }
    }
  };

  if (loading) return <div className="loading">Loading services...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="service-list-page">
      <div className="admin-page-header">
        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
        <h1>Services</h1>
      </div>

      <div className="service-form-container">
        <form onSubmit={handleAddService} className="service-form">
          <div className="form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              value={newService.name}
              onChange={handleInputChange}
              placeholder="Enter service name"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              placeholder="Enter service description"
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label>Price (FCFA)</label>
            <input
              type="number"
              name="price"
              value={newService.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              min="0"
              step="0.01"
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="is_active"
                checked={newService.is_active}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              Active
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Service
          </button>
        </form>
      </div>

      <div className="service-table-container">
        <table className="service-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price ? `${service.price} FCFA` : "-"}</td>
                <td>
                  <span
                    className={`status-badge ${
                      service.is_active ? "active" : "inactive"
                    }`}
                  >
                    {service.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className={`action-btn ${
                      service.is_active ? "deactivate-btn" : "activate-btn"
                    }`}
                    onClick={() =>
                      toggleServiceStatus(service.id, service.is_active)
                    }
                    title={service.is_active ? "Deactivate" : "Activate"}
                  >
                    {service.is_active ? "⏸️" : "▶️"}
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteService(service.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceList;

// Admin/ServiceList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const mockServices = [
      {
        id: 1,
        name: "Custom Cakes",
        description: "Bespoke cakes designed for your special occasions",
        price: 35.0,
        is_active: true,
      },
      {
        id: 2,
        name: "Event Catering",
        description: "Professional catering services for all your events",
        price: null,
        is_active: true,
      },
      {
        id: 3,
        name: "Pastry Buffets",
        description: "Stunning dessert tables for any occasion",
        price: null,
        is_active: true,
      },
      {
        id: 4,
        name: "Home Delivery",
        description: "Fresh desserts delivered to your doorstep",
        price: 5.0,
        is_active: true,
      },
    ];

    setServices(mockServices);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewService({
      ...newService,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (newService.name && newService.description) {
      const service = {
        id: services.length + 1,
        name: newService.name,
        description: newService.description,
        price: newService.price ? parseFloat(newService.price) : null,
        is_active: newService.is_active,
      };

      setServices([...services, service]);
      setNewService({
        name: "",
        description: "",
        price: "",
        is_active: true,
      });
    }
  };

  const toggleServiceStatus = (id) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? { ...service, is_active: !service.is_active }
          : service
      )
    );
  };

  const deleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((service) => service.id !== id));
    }
  };

  return (
    <div className="service-list-page">
      <div className="admin-page-header">
        <button className="back-btn" onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>
        <h1>Services</h1>
      </div>

      <div className="service-form-container">
        <form onSubmit={handleAddService} className="service-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Service Name</label>
              <input
                type="text"
                name="name"
                value={newService.name}
                onChange={handleInputChange}
                placeholder="Service name"
                required
              />
            </div>

            <div className="form-group">
              <label>Price ($)</label>
              <input
                type="number"
                name="price"
                value={newService.price}
                onChange={handleInputChange}
                placeholder="Price (optional)"
                min="0"
                step="0.01"
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={newService.description}
                onChange={handleInputChange}
                placeholder="Service description"
                rows="3"
                required
              ></textarea>
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
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="service-name">{service.name}</td>
                <td className="service-description">{service.description}</td>
                <td>{service.price ? `$${service.price.toFixed(2)}` : "-"}</td>
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
                    onClick={() => toggleServiceStatus(service.id)}
                  >
                    {service.is_active ? "⏸️" : "▶️"}
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteService(service.id)}
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

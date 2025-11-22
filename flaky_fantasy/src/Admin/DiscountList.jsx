import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminDiscountsAPI } from "../api/AdminApi.jsx";
import "../styles/DiscountList.css";

const DiscountList = () => {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({
    code: "",
    discount_type: "percentage",
    value: "",
    max_uses: "1",
    valid_from: "",
    valid_until: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        setLoading(true);
        const response = await adminDiscountsAPI.getDiscountCodes();
        setDiscounts(response.results);
      } catch (err) {
        setError("Failed to load discounts");
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount({
      ...newDiscount,
      [name]: value,
    });
  };

  const handleAddDiscount = async (e) => {
    e.preventDefault();

    try {
      const discount = {
        code: newDiscount.code,
        discount_type: newDiscount.discount_type,
        value: parseFloat(newDiscount.value),
        max_uses: parseInt(newDiscount.max_uses),
        valid_from: newDiscount.valid_from,
        valid_until: newDiscount.valid_until,
      };

      await adminDiscountsAPI.createDiscountCode(discount);
      const response = await adminDiscountsAPI.getDiscountCodes();
      setDiscounts(response.results);

      setNewDiscount({
        code: "",
        discount_type: "percentage",
        value: "",
        max_uses: "1",
        valid_from: "",
        valid_until: "",
      });
    } catch (err) {
      setError("Failed to create discount");
    }
  };

  const toggleDiscountStatus = async (id) => {
    try {
      await adminDiscountsAPI.toggleDiscountCode(id);
      setDiscounts(
        discounts.map((discount) =>
          discount.id === id
            ? { ...discount, is_active: !discount.is_active }
            : discount
        )
      );
    } catch (err) {
      setError("Failed to toggle discount status");
    }
  };

  const deleteDiscount = async (id) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      try {
        await adminDiscountsAPI.deleteDiscountCode(id);
        setDiscounts(discounts.filter((discount) => discount.id !== id));
      } catch (err) {
        setError("Failed to delete discount");
      }
    }
  };

  if (loading) return <div className="loading">Loading discounts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="discount-list-page">
      <div className="admin-page-header">
        <button className="back-btn" onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>
        <h1>Discount Codes</h1>
      </div>

      <div className="discount-form-container">
        <form onSubmit={handleAddDiscount} className="discount-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Code</label>
              <input
                type="text"
                name="code"
                value={newDiscount.code}
                onChange={handleInputChange}
                placeholder="Discount code"
                required
              />
            </div>

            <div className="form-group">
              <label>Discount Type</label>
              <select
                name="discount_type"
                value={newDiscount.discount_type}
                onChange={handleInputChange}
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed Amount</option>
              </select>
            </div>

            <div className="form-group">
              <label>Value</label>
              <input
                type="number"
                name="value"
                value={newDiscount.value}
                onChange={handleInputChange}
                placeholder="Discount value"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label>Max Uses</label>
              <input
                type="number"
                name="max_uses"
                value={newDiscount.max_uses}
                onChange={handleInputChange}
                placeholder="Maximum uses"
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Valid From</label>
              <input
                type="date"
                name="valid_from"
                value={newDiscount.valid_from}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Valid Until</label>
              <input
                type="date"
                name="valid_until"
                value={newDiscount.valid_until}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Add Discount
          </button>
        </form>
      </div>

      <div className="discount-table-container">
        <table className="discount-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Usage</th>
              <th>Validity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((discount) => (
              <tr key={discount.id}>
                <td className="code-cell">{discount.code}</td>
                <td>
                  {discount.discount_type === "percentage"
                    ? "Percentage"
                    : "Fixed Amount"}
                </td>
                <td>
                  {discount.discount_type === "percentage"
                    ? `${discount.value}%`
                    : `${discount.value} FCFA`}
                </td>
                <td>
                  {discount.used_count}/{discount.max_uses}
                </td>
                <td>
                  <div className="validity-dates">
                    <div>
                      {new Date(discount.valid_from).toLocaleDateString()}
                    </div>
                    <div>to</div>
                    <div>
                      {new Date(discount.valid_until).toLocaleDateString()}
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`status-badge ${
                      discount.is_active ? "active" : "inactive"
                    }`}
                  >
                    {discount.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className={`action-btn ${
                      discount.is_active ? "deactivate-btn" : "activate-btn"
                    }`}
                    onClick={() => toggleDiscountStatus(discount.id)}
                    title={discount.is_active ? "Deactivate" : "Activate"}
                  >
                    {discount.is_active ? "⏸️" : "▶️"}
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteDiscount(discount.id)}
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

export default DiscountList;

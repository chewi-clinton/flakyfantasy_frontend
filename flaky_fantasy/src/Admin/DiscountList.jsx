// Admin/DiscountList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DiscountList.css";

const DiscountList = () => {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState([]);
  const [newDiscount, setNewDiscount] = useState({
    code: "",
    discountType: "percentage",
    value: "",
    maxUses: "1",
    validFrom: "",
    validUntil: "",
  });

  useEffect(() => {
    const mockDiscounts = [
      {
        id: 1,
        code: "SAVE10",
        discountType: "percentage",
        value: 10,
        maxUses: 50,
        usedCount: 15,
        validFrom: "2023-01-01",
        validUntil: "2023-12-31",
        is_active: true,
      },
      {
        id: 2,
        code: "WELCOME5",
        discountType: "fixed",
        value: 5,
        maxUses: 100,
        usedCount: 42,
        validFrom: "2023-06-01",
        validUntil: "2023-12-31",
        is_active: true,
      },
      {
        id: 3,
        code: "HOLIDAY20",
        discountType: "percentage",
        value: 20,
        maxUses: 30,
        usedCount: 30,
        validFrom: "2023-11-01",
        validUntil: "2023-12-25",
        is_active: false,
      },
    ];

    setDiscounts(mockDiscounts);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiscount({
      ...newDiscount,
      [name]: value,
    });
  };

  const handleAddDiscount = (e) => {
    e.preventDefault();
    if (
      newDiscount.code &&
      newDiscount.value &&
      newDiscount.validFrom &&
      newDiscount.validUntil
    ) {
      const discount = {
        id: discounts.length + 1,
        code: newDiscount.code,
        discountType: newDiscount.discountType,
        value: parseFloat(newDiscount.value),
        maxUses: parseInt(newDiscount.maxUses),
        usedCount: 0,
        validFrom: newDiscount.validFrom,
        validUntil: newDiscount.validUntil,
        is_active: true,
      };

      setDiscounts([...discounts, discount]);
      setNewDiscount({
        code: "",
        discountType: "percentage",
        value: "",
        maxUses: "1",
        validFrom: "",
        validUntil: "",
      });
    }
  };

  const toggleDiscountStatus = (id) => {
    setDiscounts(
      discounts.map((discount) =>
        discount.id === id
          ? { ...discount, is_active: !discount.is_active }
          : discount
      )
    );
  };

  const deleteDiscount = (id) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      setDiscounts(discounts.filter((discount) => discount.id !== id));
    }
  };

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
                name="discountType"
                value={newDiscount.discountType}
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
                name="maxUses"
                value={newDiscount.maxUses}
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
                name="validFrom"
                value={newDiscount.validFrom}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Valid Until</label>
              <input
                type="date"
                name="validUntil"
                value={newDiscount.validUntil}
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
                  {discount.discountType === "percentage"
                    ? "Percentage"
                    : "Fixed Amount"}
                </td>
                <td>
                  {discount.discountType === "percentage"
                    ? `${discount.value}%`
                    : `$${discount.value}`}
                </td>
                <td>
                  {discount.usedCount}/{discount.maxUses}
                </td>
                <td>
                  <div className="validity-dates">
                    <div>
                      {new Date(discount.validFrom).toLocaleDateString()}
                    </div>
                    <div>to</div>
                    <div>
                      {new Date(discount.validUntil).toLocaleDateString()}
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
                  >
                    {discount.is_active ? "⏸️" : "▶️"}
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteDiscount(discount.id)}
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

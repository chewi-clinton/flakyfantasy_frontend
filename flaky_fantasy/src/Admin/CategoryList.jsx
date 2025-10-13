import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { adminProductsAPI } from "../api/AdminApi.jsx";
import "../styles/CategoryList.css";

const CategoryList = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await adminProductsAPI.getCategories();
        setCategories(response);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (newCategory.name.trim()) {
      try {
        await adminProductsAPI.createCategory(newCategory);
        const response = await adminProductsAPI.getCategories();
        setCategories(response);
        setNewCategory({ name: "" });
      } catch (err) {
        setError("Failed to create category");
      }
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await adminProductsAPI.deleteCategory(id);
        setCategories(categories.filter((category) => category.id !== id));
      } catch (err) {
        setError("Failed to delete category");
      }
    }
  };

  if (loading) return <div className="loading">Loading categories...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="category-list-page">
      <div className="admin-page-header">
        <button
          className="back-btn"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
        <h1>Categories</h1>
      </div>

      <div className="category-form-container">
        <form onSubmit={handleAddCategory} className="category-form">
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              placeholder="Enter category name"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </form>
      </div>

      <div className="category-table-container">
        <table className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>{new Date(category.created_at).toLocaleDateString()}</td>
                <td className="actions">
                  <button
                    className="action-btn delete-btn"
                    onClick={() => deleteCategory(category.id)}
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

export default CategoryList;

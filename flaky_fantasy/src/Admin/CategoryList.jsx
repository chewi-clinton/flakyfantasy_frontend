// Admin/CategoryList.jsx
import React, { useState, useEffect } from "react";
import "../styles/CategoryList.css";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    const mockCategories = [
      { id: 1, name: "Cakes" },
      { id: 2, name: "Cupcakes" },
      { id: 3, name: "Pastries" },
      { id: 4, name: "Cookies" },
      { id: 5, name: "Bread" },
    ];

    setCategories(mockCategories);
  }, []);

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (newCategory.trim()) {
      const newCat = {
        id: categories.length + 1,
        name: newCategory.trim(),
      };
      setCategories([...categories, newCat]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    if (editName.trim()) {
      setCategories(
        categories.map((category) =>
          category.id === editingId
            ? { ...category, name: editName.trim() }
            : category
        )
      );
      setEditingId(null);
      setEditName("");
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  return (
    <div className="category-list-page">
      <div className="page-header">
        <h1>Categories</h1>
      </div>

      <div className="category-form-container">
        <form onSubmit={handleAddCategory} className="category-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="category-input"
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
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>
                  {editingId === category.id ? (
                    <form onSubmit={handleUpdateCategory} className="edit-form">
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="edit-input"
                        required
                        autoFocus
                      />
                      <div className="edit-actions">
                        <button type="submit" className="action-btn save-btn">
                          ✓
                        </button>
                        <button
                          type="button"
                          className="action-btn cancel-btn"
                          onClick={cancelEditing}
                        >
                          ✗
                        </button>
                      </div>
                    </form>
                  ) : (
                    category.name
                  )}
                </td>
                <td className="actions">
                  {editingId !== category.id && (
                    <>
                      <button
                        className="action-btn edit-btn"
                        onClick={() => startEditing(category)}
                      >
                        ✏️
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeleteCategory(category.id)}
                      >
                        🗑️
                      </button>
                    </>
                  )}
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

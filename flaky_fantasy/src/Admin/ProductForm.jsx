// Admin/ProductForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductForm.css";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    discountPrice: "",
    description: "",
    ingredients: "",
    inStock: true,
    stockQuantity: 0,
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    const mockCategories = [
      "Cakes",
      "Cupcakes",
      "Pastries",
      "Cookies",
      "Bread",
    ];
    setCategories(mockCategories);

    if (isEditing) {
      const mockProduct = {
        id: 1,
        name: "Chocolate Fudge Cake",
        category: "Cakes",
        price: "35.00",
        discountPrice: "",
        description:
          "Rich and moist chocolate cake with layers of smooth chocolate fudge frosting. Perfect for chocolate lovers!",
        ingredients:
          "Flour, Sugar, Eggs, Cocoa Powder, Butter, Milk, Vanilla Extract",
        inStock: true,
        stockQuantity: 15,
        images: ["chocolate-cake-1.jpg", "chocolate-cake-2.jpg"],
      };

      setFormData({
        name: mockProduct.name,
        category: mockProduct.category,
        price: mockProduct.price,
        discountPrice: mockProduct.discountPrice,
        description: mockProduct.description,
        ingredients: mockProduct.ingredients,
        inStock: mockProduct.inStock,
        stockQuantity: mockProduct.stockQuantity,
        images: mockProduct.images,
      });

      setImagePreview(
        mockProduct.images.map((img) => ({
          name: img,
          url: `./src/assets/${img}`,
        }))
      );
    }
  }, [isEditing, id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setImagePreview([...imagePreview, ...newImages]);
    setFormData({
      ...formData,
      images: [...formData.images, ...files],
    });
  };

  const removeImage = (index) => {
    const newImagePreview = [...imagePreview];
    newImagePreview.splice(index, 1);
    setImagePreview(newImagePreview);

    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({
      ...formData,
      images: newImages,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product data:", formData);
    alert(
      isEditing
        ? "Product updated successfully!"
        : "Product added successfully!"
    );
    navigate("/admin/products");
  };

  return (
    <div className="product-form-page">
      <div className="admin-page-header">
        <button
          className="back-btn"
          onClick={() => navigate("/admin/products")}
        >
          ← Back to Products
        </button>
        <h1>{isEditing ? "Edit Product" : "Add New Product"}</h1>
      </div>

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">Price ($) *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="discountPrice">Discount Price ($)</label>
                <input
                  type="number"
                  id="discountPrice"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="stockQuantity">Stock Quantity *</label>
                <input
                  type="number"
                  id="stockQuantity"
                  name="stockQuantity"
                  value={formData.stockQuantity}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleInputChange}
                  />
                  <span className="checkmark"></span>
                  In Stock
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="ingredients">Ingredients</label>
              <textarea
                id="ingredients"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="form-column">
            <div className="form-group">
              <label>Product Images</label>
              <div className="image-upload-container">
                <label className="upload-btn">
                  <span className="upload-icon">📷</span>
                  <span>Upload Images</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />
                </label>

                <div className="image-preview-container">
                  {imagePreview.length > 0 ? (
                    imagePreview.map((image, index) => (
                      <div key={index} className="image-preview">
                        <img src={image.url} alt={image.name} />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => removeImage(index)}
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="no-images">No images uploaded</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/admin/products")}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

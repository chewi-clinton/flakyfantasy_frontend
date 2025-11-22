import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminProductsAPI } from "../api/AdminApi.jsx";
import "../styles/ProductForm.css";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock_quantity: "",
    in_stock: true,
    labels: [],
  });

  const [categories, setCategories] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [primaryImageId, setPrimaryImageId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, labelsRes] = await Promise.all([
          adminProductsAPI.getCategories(),
          adminProductsAPI.getLabels(),
        ]);

        setCategories(Array.isArray(categoriesRes) ? categoriesRes : []);
        setLabels(Array.isArray(labelsRes) ? labelsRes : []);

        if (isEditing) {
          const productRes = await adminProductsAPI.getProduct(id);
          const product = productRes;

          setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            category: product.category?.id || "",
            stock_quantity: product.stock_quantity,
            in_stock: product.in_stock,
            labels: Array.isArray(product.labels)
              ? product.labels.map((label) => label.id)
              : [],
          });

          setSelectedLabels(
            Array.isArray(product.labels)
              ? product.labels.map((label) => label.id)
              : []
          );
          setExistingImages(
            Array.isArray(product.images) ? product.images : []
          );

          const primaryImage = Array.isArray(product.images)
            ? product.images.find((img) => img.is_primary)
            : null;
          if (primaryImage) {
            setPrimaryImageId(primaryImage.id);
          }
        } else {
          // Set default values for new products
          setFormData((prev) => ({
            ...prev,
            description: "",
            price: "0",
          }));
          setSelectedLabels([]);
        }
      } catch (err) {
        setError("Failed to load data");
        setCategories([]);
        setLabels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isEditing, id]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLabelChange = (e) => {
    const labelId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedLabels([...selectedLabels, labelId]);
    } else {
      setSelectedLabels(selectedLabels.filter((id) => id !== labelId));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImageFiles([...imageFiles, ...files]);
    setImagePreview([...imagePreview, ...newImagePreviews]);
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      const newImages = [...existingImages];
      newImages.splice(index, 1);
      setExistingImages(newImages);
    } else {
      const newFiles = [...imageFiles];
      const newPreviews = [...imagePreview];
      newFiles.splice(index, 1);
      newPreviews.splice(index, 1);
      setImageFiles(newFiles);
      setImagePreview(newPreviews);
    }
  };

  const setAsPrimary = (imageId, isExisting = false) => {
    if (isExisting) {
      setPrimaryImageId(imageId);
    } else {
      setPrimaryImageId(
        `new-${imagePreview.findIndex((img) => img.url === imageId)}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productData = {
        name: formData.name,
        description: isEditing ? formData.description : "",
        price: isEditing ? parseFloat(formData.price) : 0,
        category: parseInt(formData.category),
        stock_quantity: parseInt(formData.stock_quantity),
        in_stock: formData.in_stock,
        labels: isEditing ? selectedLabels : [],
      };

      // Add image files if any
      if (imageFiles.length > 0) {
        productData.image_files = imageFiles;
      }

      let product;
      if (isEditing) {
        product = await adminProductsAPI.updateProduct(id, productData);
      } else {
        product = await adminProductsAPI.createProduct(productData);
      }

      // Set primary image if needed
      if (primaryImageId) {
        if (primaryImageId.toString().startsWith("new-")) {
          const imageIndex = parseInt(primaryImageId.toString().split("-")[1]);
          if (imageIndex < imageFiles.length) {
            const updatedProduct = await adminProductsAPI.getProduct(
              product.id
            );
            if (
              updatedProduct.images &&
              updatedProduct.images.length > imageIndex
            ) {
              await adminProductsAPI.setPrimaryImage(
                product.id,
                updatedProduct.images[imageIndex].id
              );
            }
          }
        } else {
          await adminProductsAPI.setPrimaryImage(product.id, primaryImageId);
        }
      }

      alert(
        isEditing
          ? "Product updated successfully!"
          : "Product added successfully!"
      );
      navigate("/admin/products");
    } catch (err) {
      setError("Failed to save product");
      console.error("Save product error:", err.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing)
    return <div className="loading">Loading product data...</div>;
  if (error) return <div className="error">{error}</div>;

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
                {Array.isArray(categories) &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* Only show price field when editing */}
            {isEditing && (
              <div className="form-group">
                <label htmlFor="price">Price (FCFA) *</label>
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
            )}

            <div className="form-group">
              <label htmlFor="stock_quantity">Stock Quantity *</label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleInputChange}
                min="0"
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="in_stock"
                  checked={formData.in_stock}
                  onChange={handleInputChange}
                />
                <span className="checkmark"></span>
                In Stock
              </label>
            </div>

            {/* Only show labels field when editing */}
            {isEditing && (
              <div className="form-group">
                <label>Labels</label>
                <div className="labels-container">
                  {Array.isArray(labels) && labels.length > 0 ? (
                    labels.map((label) => (
                      <div key={label.id} className="label-item">
                        <input
                          type="checkbox"
                          id={`label-${label.id}`}
                          value={label.id}
                          checked={selectedLabels.includes(label.id)}
                          onChange={handleLabelChange}
                        />
                        <label htmlFor={`label-${label.id}`}>
                          {label.name}
                        </label>
                      </div>
                    ))
                  ) : (
                    <p className="no-labels">No labels available</p>
                  )}
                </div>
              </div>
            )}

            {/* Only show description field when editing */}
            {isEditing && (
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
            )}
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
                  {Array.isArray(existingImages) &&
                    existingImages.map((image, index) => (
                      <div
                        key={`existing-${image.id}`}
                        className="image-preview"
                      >
                        <img
                          src={image.image}
                          alt={image.alt_text || "Product"}
                        />
                        <div className="image-actions">
                          <button
                            type="button"
                            className={`set-primary-btn ${
                              primaryImageId === image.id ? "active" : ""
                            }`}
                            onClick={() => setAsPrimary(image.id, true)}
                            title="Set as primary image"
                          >
                            ⭐
                          </button>
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={() => removeImage(index, true)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}

                  {Array.isArray(imagePreview) &&
                    imagePreview.map((image, index) => (
                      <div key={`new-${index}`} className="image-preview">
                        <img src={image.url} alt="Preview" />
                        <div className="image-actions">
                          <button
                            type="button"
                            className={`set-primary-btn ${
                              primaryImageId === `new-${index}` ? "active" : ""
                            }`}
                            onClick={() => setAsPrimary(image.url, false)}
                            title="Set as primary image"
                          >
                            ⭐
                          </button>
                          <button
                            type="button"
                            className="remove-image-btn"
                            onClick={() => removeImage(index, false)}
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}

                  {existingImages.length === 0 && imagePreview.length === 0 && (
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
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading
              ? "Saving..."
              : isEditing
              ? "Update Product"
              : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

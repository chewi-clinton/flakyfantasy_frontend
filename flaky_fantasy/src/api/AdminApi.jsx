import axios from "axios";

const API_URL = "https://backend.flakyfantasy.com";

const adminApi = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminAccessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

adminApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("adminRefreshToken");
        const response = await axios.post(`${API_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        localStorage.setItem("adminAccessToken", response.data.access);
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

        return adminApi(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("adminAccessToken");
        localStorage.removeItem("adminRefreshToken");
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const adminAuthAPI = {
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login/`, credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await adminApi.get("/auth/profile/");
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await adminApi.patch("/auth/profile/", userData);
    return response.data;
  },
};

export const adminProductsAPI = {
  getProducts: async (params = {}) => {
    const response = await adminApi.get("/products/", { params });
    return response.data;
  },

  getProduct: async (id) => {
    const response = await adminApi.get(`/products/${id}/`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await adminApi.post("/products/", productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await adminApi.put(`/products/${id}/`, productData);
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await adminApi.delete(`/products/${id}/`);
    return response.data;
  },

  updateStock: async (id, quantity) => {
    const response = await adminApi.post(`/products/${id}/update_stock/`, {
      quantity,
    });
    return response.data;
  },

  // FIXED: Ensure getCategories always returns an array
  getCategories: async () => {
    try {
      const response = await adminApi.get("/categories/");
      const data = response.data;

      // Handle different response formats
      if (Array.isArray(data)) {
        return data;
      } else if (data && data.results && Array.isArray(data.results)) {
        return data.results;
      } else if (data && Array.isArray(data.categories)) {
        return data.categories;
      } else {
        console.warn("Unexpected categories response format:", data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      return []; // Return empty array on error
    }
  },

  createCategory: async (categoryData) => {
    const response = await adminApi.post("/categories/", categoryData);
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const response = await adminApi.put(`/categories/${id}/`, categoryData);
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await adminApi.delete(`/categories/${id}/`);
    return response.data;
  },

  getLabels: async () => {
    const response = await adminApi.get("/product-labels/");
    return response.data;
  },

  uploadProductImage: async (productId, imageData) => {
    const formData = new FormData();
    formData.append("image", imageData);
    formData.append("product", productId);

    const response = await adminApi.post("/product-images/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  setPrimaryImage: async (productId, imageId) => {
    const response = await adminApi.post(
      `/products/${productId}/set_primary_image/`,
      { image_id: imageId }
    );
    return response.data;
  },

  getServices: async () => {
    const response = await adminApi.get("/services/");
    return response.data;
  },

  createService: async (serviceData) => {
    const response = await adminApi.post("/services/", serviceData);
    return response.data;
  },

  updateService: async (id, serviceData) => {
    const response = await adminApi.put(`/services/${id}/`, serviceData);
    return response.data;
  },

  deleteService: async (id) => {
    const response = await adminApi.delete(`/services/${id}/`);
    return response.data;
  },

  toggleService: async (id) => {
    const response = await adminApi.post(`/services/${id}/toggle_active/`);
    return response.data;
  },
};

export const adminDiscountsAPI = {
  getDiscountCodes: async (params = {}) => {
    const response = await adminApi.get("/discount-codes/", { params });
    return response.data;
  },

  getDiscountCode: async (id) => {
    const response = await adminApi.get(`/discount-codes/${id}/`);
    return response.data;
  },

  createDiscountCode: async (discountData) => {
    const response = await adminApi.post("/discount-codes/", discountData);
    return response.data;
  },

  updateDiscountCode: async (id, discountData) => {
    const response = await adminApi.put(`/discount-codes/${id}/`, discountData);
    return response.data;
  },

  deleteDiscountCode: async (id) => {
    const response = await adminApi.delete(`/discount-codes/${id}/`);
    return response.data;
  },

  toggleDiscountCode: async (id) => {
    const response = await adminApi.post(
      `/discount-codes/${id}/toggle_active/`
    );
    return response.data;
  },

  getProductDiscounts: async (params = {}) => {
    const response = await adminApi.get("/product-discounts/", { params });
    return response.data;
  },

  createProductDiscount: async (discountData) => {
    const response = await adminApi.post("/product-discounts/", discountData);
    return response.data;
  },

  updateProductDiscount: async (id, discountData) => {
    const response = await adminApi.put(
      `/product-discounts/${id}/`,
      discountData
    );
    return response.data;
  },

  deleteProductDiscount: async (id) => {
    const response = await adminApi.delete(`/product-discounts/${id}/`);
    return response.data;
  },

  toggleProductDiscount: async (id) => {
    const response = await adminApi.post(
      `/product-discounts/${id}/toggle_active/`
    );
    return response.data;
  },
};

export const adminOrdersAPI = {
  getOrders: async (params = {}) => {
    const response = await adminApi.get("/orders/", { params });
    return response.data;
  },

  getOrder: async (id) => {
    const response = await adminApi.get(`/orders/${id}/`);
    return response.data;
  },

  updateOrder: async (id, orderData) => {
    const response = await adminApi.put(`/orders/${id}/`, orderData);
    return response.data;
  },

  exportOrders: async () => {
    const response = await adminApi.get("/orders/export_csv/", {
      responseType: "blob",
    });
    return response.data;
  },
};

export const adminNotificationsAPI = {
  getNotifications: async (params = {}) => {
    const response = await adminApi.get("/notifications/", { params });
    return response.data;
  },

  markAsRead: async (id) => {
    const response = await adminApi.post(`/notifications/${id}/mark_as_read/`);
    return response.data;
  },

  sendOrderAlert: async (orderId, message) => {
    const response = await adminApi.post("/notifications/send_order_alert/", {
      order_id: orderId,
      message,
    });
    return response.data;
  },
};

export default adminApi;

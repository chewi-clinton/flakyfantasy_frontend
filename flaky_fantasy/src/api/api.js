import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productsAPI = {
  getProducts: async (params = {}) => {
    const response = await api.get("/products/", { params });
    return response.data;
  },

  getProduct: async (id) => {
    const response = await api.get(`/products/${id}/`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get("/categories/");
    return response.data;
  },

  getLabels: async () => {
    const response = await api.get("/product-labels/");
    return response.data;
  },
};

export const discountAPI = {
  validateCode: async (code) => {
    const response = await api.get(`/discount-codes/?code=${code}`);
    return response.data;
  },
};

export const cartAPI = {
  getCart: () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  },

  addToCart: (product, quantity = 1, options = {}) => {
    const cart = cartAPI.getCart();
    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        JSON.stringify(item.options) === JSON.stringify(options)
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.image || "",
        quantity,
        options,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  },

  updateCartItem: (index, quantity) => {
    const cart = cartAPI.getCart();
    if (cart[index]) {
      if (quantity > 0) {
        cart[index].quantity = quantity;
      } else {
        cart.splice(index, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  },

  removeFromCart: (index) => {
    const cart = cartAPI.getCart();
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    return [];
  },
};

export default api;

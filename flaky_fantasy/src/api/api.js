import axios from "axios";

const BASE_URL =
  "http://http://qgkogwksg8koskwwck00gc80.46.62.211.155.sslip.io";

const getImageUrl = (imagePath) => {
  if (!imagePath) return "";

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  const normalizedPath = imagePath.startsWith("/")
    ? imagePath.slice(1)
    : imagePath;

  return `${BASE_URL}/media/${normalizedPath}`;
};

const API_URL = `${BASE_URL}/api`;

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
      // Get the full image URL
      const imageUrl = product.images?.[0]?.image
        ? getImageUrl(product.images[0].image)
        : "";

      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageUrl, // Store the full URL
        quantity,
        options,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    return cart;
  },

  updateCartItem: (productId, quantity) => {
    const cart = cartAPI.getCart();
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      if (quantity > 0) {
        cart[itemIndex].quantity = quantity;
      } else {
        cart.splice(itemIndex, 1);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  },

  removeFromCart: (productId) => {
    const cart = cartAPI.getCart();
    const itemIndex = cart.findIndex((item) => item.id === productId);

    if (itemIndex !== -1) {
      cart.splice(itemIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    return cart;
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    return [];
  },
};

// Export the getImageUrl function for use in components
export { getImageUrl };

export default api;

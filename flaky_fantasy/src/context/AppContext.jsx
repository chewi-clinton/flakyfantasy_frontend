import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { cartAPI } from "../api/api.js";
import Toast from "../components/Toast.jsx";

const AppContext = createContext();

const initialState = {
  cart: [],
};

const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART":
      return { ...state, cart: action.payload };
    case "UPDATE_CART_ITEM":
      return { ...state, cart: action.payload };
    case "REMOVE_FROM_CART":
      return { ...state, cart: action.payload };
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [toast, setToast] = useState({ show: false, message: "" });

  useEffect(() => {
    const cart = cartAPI.getCart();
    dispatch({ type: "SET_CART", payload: cart });
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
  };

  const hideToast = () => {
    setToast({ show: false, message: "" });
  };

  const addToCart = (product, quantity = 1, options = {}) => {
    const updatedCart = cartAPI.addToCart(product, quantity, options);
    dispatch({ type: "ADD_TO_CART", payload: updatedCart });
    showToast(`Successfully added ${product.name} to cart`);
  };

  const updateCartItem = (productId, quantity) => {
    const itemIndex = state.cart.findIndex((item) => item.id === productId);
    if (itemIndex === -1) return;

    const updatedCart = cartAPI.updateCartItem(itemIndex, quantity);
    dispatch({ type: "UPDATE_CART_ITEM", payload: updatedCart });
  };

  const removeFromCart = (productId) => {
    const itemIndex = state.cart.findIndex((item) => item.id === productId);
    if (itemIndex === -1) return;

    const updatedCart = cartAPI.removeFromCart(itemIndex);
    dispatch({ type: "REMOVE_FROM_CART", payload: updatedCart });
  };

  const clearCart = () => {
    cartAPI.clearCart();
    dispatch({ type: "CLEAR_CART" });
  };

  const getCartCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartTotal,
        showToast,
        hideToast,
      }}
    >
      {children}
      <Toast message={toast.message} show={toast.show} onClose={hideToast} />
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

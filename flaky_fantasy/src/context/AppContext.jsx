import React, { createContext, useContext, useReducer, useEffect } from "react";
import { cartAPI } from "../api/api";

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

  useEffect(() => {
    const cart = cartAPI.getCart();
    dispatch({ type: "SET_CART", payload: cart });
  }, []);

  const addToCart = (product, quantity = 1, options = {}) => {
    const updatedCart = cartAPI.addToCart(product, quantity, options);
    dispatch({ type: "ADD_TO_CART", payload: updatedCart });
  };

  const updateCartItem = (index, quantity) => {
    const updatedCart = cartAPI.updateCartItem(index, quantity);
    dispatch({ type: "UPDATE_CART_ITEM", payload: updatedCart });
  };

  const removeFromCart = (index) => {
    const updatedCart = cartAPI.removeFromCart(index);
    dispatch({ type: "REMOVE_FROM_CART", payload: updatedCart });
  };

  const clearCart = () => {
    cartAPI.clearCart();
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

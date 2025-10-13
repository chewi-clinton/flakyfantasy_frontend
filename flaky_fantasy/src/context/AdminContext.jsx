import React, { createContext, useContext, useReducer, useEffect } from "react";
import { adminAuthAPI } from "../api/AdminApi.jsx";

const AdminContext = createContext();

const initialState = {
  admin: null,
  isAuthenticated: false,
  loading: true,
};

const adminReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ADMIN":
      return {
        ...state,
        admin: action.payload,
        isAuthenticated: !!action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        admin: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("adminAccessToken");
    if (token) {
      adminAuthAPI
        .getProfile()
        .then((admin) => {
          dispatch({ type: "SET_ADMIN", payload: admin });
        })
        .catch(() => {
          localStorage.removeItem("adminAccessToken");
          localStorage.removeItem("adminRefreshToken");
          dispatch({ type: "LOGOUT" });
        });
    } else {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, []);

  const login = async (credentials) => {
    try {
      const { access, refresh, user_id, role } = await adminAuthAPI.login(
        credentials
      );
      localStorage.setItem("adminAccessToken", access);
      localStorage.setItem("adminRefreshToken", refresh);

      const admin = await adminAuthAPI.getProfile();
      dispatch({ type: "SET_ADMIN", payload: admin });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminAccessToken");
    localStorage.removeItem("adminRefreshToken");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AdminContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

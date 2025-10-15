import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();

  useEffect(() => {
    document.getElementById("username-input")?.focus();
    if (isAuthenticated) {
      navigate("/admin"); // Fixed case sensitivity
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login({ username, password });
      if (!result.success) {
        setError(result.error);
      } else {
        navigate("/admin"); // Consistent with App.jsx routing
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        const status = err.response.status;
        const errorData = err.response.data;
        if (status === 400) {
          setError("Please enter both username and password");
        } else if (status === 401) {
          setError("Invalid username or password");
        } else if (status === 403) {
          setError("User is not an admin");
        } else if (status === 500) {
          setError(errorData.error || "Server error. Please try again later.");
        } else {
          setError(
            `Login failed: ${
              errorData.error || errorData.detail || "Unknown error"
            }`
          );
        }
      } else if (err.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError(`An error occurred: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login-form">
        <div className="form-content">
          <div className="logo-container">
            <img
              src="./src/assets/logo.png"
              alt="CareBridge Admin"
              className="logo"
            />
          </div>
          <h1 className="title">
            <span className="title-word">Holla,</span>
            <span className="title-word">Welcome</span>
            <span className="title-word">Back</span>
          </h1>
          <p className="subtitle">
            Secure admin gateway for managing CareBridge's healthcare services
            and analytics.
          </p>
          <form className="form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            <div className="input-group">
              <label htmlFor="username-input">Username</label>
              <input
                id="username-input"
                type="text"
                placeholder="Enter your username"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password-input">Password</label>
              <input
                id="password-input"
                type="password"
                placeholder="Enter your password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? <span className="button-loader"></span> : "Sign In"}
            </button>
          </form>
          <div className="form-footer"></div>
        </div>
        <div className="decorative-elements">
          <div className="decorative-circle circle-1"></div>
          <div className="decorative-circle circle-2"></div>
          <div className="decorative-circle circle-3"></div>
          <div className="decorative-circle circle-4"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

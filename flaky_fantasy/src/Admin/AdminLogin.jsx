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
  const adminContext = useAdmin();

  // Safely destructure with fallback values
  const login =
    adminContext?.login ||
    (() =>
      Promise.resolve({
        success: false,
        error: "Authentication service unavailable",
      }));
  const isAuthenticated = adminContext?.isAuthenticated || false;

  useEffect(() => {
    document.getElementById("username-input")?.focus();
    if (isAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login({ username, password });
      if (result.success) {
        navigate("/admin/dashboard");
      } else {
        setError(
          result.error || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error(err);
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
              alt="Flaky Fantasy"
              className="logo"
            />
          </div>
          <h1 className="title">
            <span className="title-word">Holla,</span>
            <span className="title-word">Welcome</span>
            <span className="title-word">Back</span>
          </h1>
          <p className="subtitle">
            Crafting a delightful online haven for cake and pastry delights,
            this is the Flaky Fantasy admin gateway.
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

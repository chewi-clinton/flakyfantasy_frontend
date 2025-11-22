import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useAdmin } from "../context/AdminContext";
import "../styles/Adminlogin.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAdmin();

  useEffect(() => {
    document.getElementById("username-input")?.focus();
    if (isAuthenticated) {
      navigate("/admin");
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
        navigate("/admin");
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="login-form">
        <div className="form-content">
          <div className="logo-container">
            <img src={Logo} alt="Flaky Fantasy Admin" className="logo" />
          </div>
          <h1 className="title">
            <span className="title-word">Holla,</span>
            <span className="title-word">Welcome</span>
            <span className="title-word">Back</span>
          </h1>
          <p className="subtitle">
            Secure admin gateway for managing Flaky Fantasy.
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
              <div className="password-input-container">
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"} // Toggle between text and password
                  placeholder="Enter your password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  )}
                </button>
              </div>
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

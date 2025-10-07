// AdminLogin.jsx
import React, { useState, useEffect } from "react";
import "../styles/AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Focus on email input when component mounts
    document.getElementById("email-input")?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setEmail("");
        setPassword("");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="container">
      {/* Login Form */}
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
            <div className="input-group">
              <label htmlFor="email-input">Email Address</label>
              <input
                id="email-input"
                type="email"
                placeholder="Enter your email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            {showSuccess && (
              <div className="success-message">
                Login successful! Redirecting...
              </div>
            )}
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

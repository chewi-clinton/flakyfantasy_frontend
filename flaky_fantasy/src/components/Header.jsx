import React, { useState } from "react";
import "../styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src="./src/assets/logo.png" alt="Logo" className="logo-image" />
        </div>

        <nav className={`nav-menu ${isMenuOpen ? "mobile-open" : ""}`}>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#Menu">Menu</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#aboutus">About Us</a>
            </li>

            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#Terms of Services">Terms of Services</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="cart-icon">
            <a href="#cart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-count">0</span>
            </a>
          </div>

          <button className="hamburger-menu" onClick={toggleMenu}>
            <span
              className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${isMenuOpen ? "open" : ""}`}
            ></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

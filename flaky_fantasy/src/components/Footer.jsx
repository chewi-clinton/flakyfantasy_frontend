import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <Link to="/terms">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/contact">Contact Us</Link>
        </div>

        <div className="social-icons">
          <a
            href="https://wa.link/shgoo4"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Whatsapp"
          >
            <img
              src="./src/assets/whatsapp.png"
              alt="Whatsapp"
              className="social-icon"
            />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61567911930957&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <img
              src="./src/assets/facebook.png"
              alt="Facebook"
              className="social-icon"
            />
          </a>
          <a
            href="https://vm.tiktok.com/ZSH7RfJSGnW8w-Lm1r9/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Tiktok"
          >
            <img
              src="/src/assets/tiktok.png"
              alt="Tiktok"
              className="social-icon"
            />
          </a>
          <a
            href="https://www.instagram.com/sami2ra2025?igsh=YzljYTk1ODg3Zg=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img
              src="/src/assets/instagram2.jpg"
              alt="Instagram"
              className="social-icon"
            />
          </a>
        </div>

        <div className="copyright">
          <p>© {currentYear} Flaky Fantasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

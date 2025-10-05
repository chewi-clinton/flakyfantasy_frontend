import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="#privacy-policy">Privacy Policy</a>
          <a href="#terms-of-service">Terms of Service</a>
          <a href="#contact-us">Contact Us</a>
        </div>

        <div className="social-icons">
          <a href="https://wa.link/shgoo4" aria-label="Twitter">
            <img
              src="./src/assets/whatsapp.png"
              alt="Whatsapp"
              className="social-icon"
            />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61567911930957&mibextid=ZbWKwL"
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

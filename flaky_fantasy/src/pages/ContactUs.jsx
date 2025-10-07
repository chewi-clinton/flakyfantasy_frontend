import React, { useState } from "react";
import "../styles/ContactUs.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      <Header />
      <div className="contact-container">
        <div className="contact-content">
          <div className="contact-header">
            <h1>CONTACT US</h1>
            <p>
              If you have any questions, please feel free to get in touch with
              us via phone, text, email, the form below, or even on social
              media!
            </p>
          </div>

          <div className="contact-main">
            <div className="get-in-touch">
              <h2>GET IN TOUCH</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>NAME</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your name*"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>PHONE NUMBER</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number*"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>YOUR MESSAGE</label>
                  <textarea
                    name="message"
                    placeholder=""
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn">
                  SEND MESSAGE
                </button>
              </form>
            </div>

            <div className="contact-info-section">
              <div className="contact-information">
                <h2>CONTACT INFORMATION</h2>
                <div className="info-item">
                  <div className="info-icon phone-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="info-text">
                    <p className="info-label">PHONE</p>
                    <p className="info-value">+73-382-0410</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon email-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <polyline
                        points="22,6 12,13 2,6"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div className="info-text">
                    <p className="info-label">EMAIL</p>
                    <p className="info-value">office@divinesweettreats.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon address-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                  <div className="info-text">
                    <p className="info-label">ADDRESS</p>
                    <p className="info-value">1425 N McLean Blvd, Elgin, IL</p>
                  </div>
                </div>
              </div>

              <div className="business-hours">
                <h2>BUSINESS HOURS</h2>
                <div className="hours-grid">
                  <div className="hours-item">
                    <p className="day">MONDAY - FRIDAY</p>
                    <p className="time">8:00 am - 8:00 pm</p>
                  </div>
                  <div className="hours-item">
                    <p className="day">SATURDAY</p>
                    <p className="time">8:00 am - 6:00 pm</p>
                  </div>
                  <div className="hours-item">
                    <p className="day">SUNDAY</p>
                    <p className="time">8:00 am - 5:00 pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="map-section">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3004.8974305631944!2d-88.3128!3d42.0354!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDAyJzA3LjQiTiA4OMKwMTgnNDYuMSJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;

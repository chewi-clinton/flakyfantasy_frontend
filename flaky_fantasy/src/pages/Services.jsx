import React from "react";
import "../styles/Services.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Services = () => {
  return (
    <>
      <Header />
      <div className="services-container">
        <div className="services-header">
          <h1>Our Divine Services</h1>
          <p>
            Explore our range of services designed to make your special moments
            even sweeter.
          </p>
        </div>

        <div className="services-list">
          <div className="service-item">
            <div className="service-text">
              <img
                src="cake-icon.png"
                alt="Cake Icon"
                className="service-icon-img"
              />
              <h2>Custom Cakes</h2>
              <p>
                Create a cake that perfectly matches your vision, from flavors
                to decorations, we'll bring your ideas to life for any occasion,
                ensuring a centerpiece that's as delicious as it is beautiful.
              </p>
              <button className="book-btn">Book a Service</button>
            </div>
            <div className="service-image">
              <img src="cake-image.jpg" alt="Custom Cake" />
            </div>
          </div>

          <div className="service-item reverse">
            <div className="service-image">
              <img src="catering-image.jpg" alt="Event Catering" />
            </div>
            <div className="service-text">
              <img
                src="catering-icon.png"
                alt="Catering Icon"
                className="service-icon-img"
              />
              <h2>Event Catering</h2>
              <p>
                Our catering service offers a delightful selection of pastries,
                cakes, and desserts to make your event unforgettable. We handle
                everything from setup to service with elegance and care.
              </p>
              <button className="book-btn">Book a Service</button>
            </div>
          </div>

          <div className="service-item">
            <div className="service-text">
              <img
                src="pastry-icon.png"
                alt="Pastry Icon"
                className="service-icon-img"
              />
              <h2>Pastry Buffets</h2>
              <p>
                Treat your guests to a delectable array of our finest pastries,
                macarons, and tarts. Perfect for weddings, corporate events, or
                any gathering that deserves a touch of sweetness.
              </p>
              <button className="book-btn">Book a Service</button>
            </div>
            <div className="service-image">
              <img src="pastry-image.jpg" alt="Pastry Buffets" />
            </div>
          </div>

          <div className="service-item reverse">
            <div className="service-image">
              <img src="delivery-image.jpg" alt="Home Delivery" />
            </div>
            <div className="service-text">
              <img
                src="delivery-icon.png"
                alt="Delivery Icon"
                className="service-icon-img"
              />
              <h2>Home Delivery</h2>
              <p>
                Enjoy our delicious cakes and pastries from the comfort of your
                home. Our reliable delivery service ensures your treats arrive
                fresh and ready to be devoured.
              </p>
              <button className="book-btn">Book a Service</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;

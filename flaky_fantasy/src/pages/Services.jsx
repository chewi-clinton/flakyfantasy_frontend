import React from "react";
import "../styles/Services.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import cakeIcon from "../assets/homedelivery.png";
import cakeImage from "../assets/homedelivery.png";
import cateringIcon from "../assets/homedelivery.png";
import cateringImage from "../assets/homedelivery.png";
import foodTrayIcon from "../assets/homedelivery.png";
import foodTrayImage from "../assets/homedelivery.png";
import deliveryIcon from "../assets/homedelivery.png";
import deliveryImage from "../assets/homedelivery.png";
import chefIcon from "../assets/homedelivery.png";
import chefImage from "../assets/homedelivery.png";

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
                src={cakeIcon}
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
              <img src={cakeImage} alt="Custom Cake" />
            </div>
          </div>

          <div className="service-item reverse">
            <div className="service-image">
              <img src={cateringImage} alt="Event Catering" />
            </div>
            <div className="service-text">
              <img
                src={cateringIcon}
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
                src={foodTrayIcon}
                alt="Food Tray Icon"
                className="service-icon-img"
              />
              <h2>Food Trays</h2>
              <p>
                Delight your guests with a diverse selection of our finest food
                trays, featuring an assortment of savory and sweet options.
                Perfect for weddings, corporate events, or any gathering that
                deserves a touch of culinary excellence.
              </p>
              <button className="book-btn">Book a Service</button>
            </div>
            <div className="service-image">
              <img src={foodTrayImage} alt="Food Trays" />
            </div>
          </div>

          <div className="service-item reverse">
            <div className="service-image">
              <img src={deliveryImage} alt="Home Delivery" />
            </div>
            <div className="service-text">
              <img
                src={deliveryIcon}
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

          <div className="service-item">
            <div className="service-text">
              <img
                src={chefIcon}
                alt="Chef Icon"
                className="service-icon-img"
              />
              <h2>Private Chef</h2>
              <p>
                Experience authentic African cuisine in the comfort of your home
                with our private chef service. Specializing in traditional
                dishes like achu, fried rice, ndole, and more, i bring the rich
                flavors of Africa to your table for an unforgettable dining
                experience.
              </p>
              <button className="book-btn">Book a Service</button>
            </div>
            <div className="service-image">
              <img src={chefImage} alt="Private Chef" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;

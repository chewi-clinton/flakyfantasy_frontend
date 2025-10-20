import React from "react";
import "../styles/Services.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomCake from "../assets/custom-cake.png";
import EventCatering from "../assets/event-catering.png";
import FoodTrays from "../assets/food-trays.png";
import HomeDelivery from "../assets/home-delivery.png";
import PrivateChef from "../assets/private-chef.png";

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
                src={CustomCake}
                alt="Cake Icon"
                className="service-icon-img"
              />
              <h2>Custom Cakes</h2>
              <p>
                Create a cake that perfectly matches your vision, from flavors
                to decorations, we'll bring your ideas to life for any occasion,
                ensuring a centerpiece that's as delicious as it is beautiful.
              </p>
              <a href="https://wa.link/augltt" className="book-btn">
                Book a Service
              </a>
            </div>
            <div className="service-image">
              <img src={CustomCake} alt="Custom Cake" />
            </div>
          </div>

          <div className="service-item reverse">
            <div className="service-image">
              <img src={EventCatering} alt="Event Catering" />
            </div>
            <div className="service-text">
              <img
                src={EventCatering}
                alt="Catering Icon"
                className="service-icon-img"
              />
              <h2>Event Catering</h2>
              <p>
                Our catering service offers a delightful selection of pastries,
                cakes, and desserts to make your event unforgettable. We handle
                everything from setup to service with elegance and care.
              </p>
              <a href="https://wa.link/sf4hbn" className="book-btn">
                Book a Service
              </a>
            </div>
          </div>

          <div className="service-item">
            <div className="service-text">
              <img
                src={FoodTrays}
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
              <a href="https://wa.link/ryv7k1" className="book-btn">
                Book a Service
              </a>
            </div>
            <div className="service-image">
              <img src={FoodTrays} alt="Food Trays" />
            </div>
          </div>

          <div className="service-item reverse">
            <div className="service-image">
              <img src={HomeDelivery} alt="Home Delivery" />
            </div>
            <div className="service-text">
              <img
                src={HomeDelivery}
                alt="Delivery Icon"
                className="service-icon-img"
              />
              <h2>Home Delivery</h2>
              <p>
                Enjoy our delicious cakes and pastries from the comfort of your
                home. Our reliable delivery service ensures your treats arrive
                fresh and ready to be devoured.
              </p>
              <a href="https://wa.link/17hk5t" className="book-btn">
                Book a Service
              </a>
            </div>
          </div>

          <div className="service-item">
            <div className="service-text">
              <img
                src={PrivateChef}
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
              <a href="https://wa.link/xru3fr" className="book-btn">
                Book a Service
              </a>
            </div>
            <div className="service-image">
              <img src={PrivateChef} alt="Private Chef" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Services;

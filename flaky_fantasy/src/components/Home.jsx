import React, { useEffect, useRef, useState } from "react";
import "../styles/Home.css";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const products = [
    {
      id: 1,
      name: "Cupcakes",
      description: "Delicious chocolate cupcakes with creamy frosting",
      image: "./src/assets/Cup_cakes.JPG",
    },
    {
      id: 2,
      name: "Wedding Cakes",
      description: "Crunchy peanut butter cookies stacked to perfection",
      image: "./src/assets/Wedding_cakes.JPG",
    },
    {
      id: 3,
      name: "Doughnuts",
      description: "Freshly made doughnuts with colorful toppings",
      image: "./src/assets/doughnut.jpg",
    },
    {
      id: 4,
      name: "Birthday Cakes",
      description: "Multi-layered pastries with rich fillings",
      image: "./src/assets/Birthday_cakes.JPG",
    },
    {
      id: 5,
      name: "Food Tray",
      description: "Multi-layered pastries with rich fillings",
      image: "./src/assets/Food_trays.JPG",
    },
    {
      id: 6,
      name: "Small Chops",
      description: "Multi-layered pastries with rich fillings",
      image: "./src/assets/Small_chops.JPG",
    },
    {
      id: 7,
      name: "Cake Parfait",
      description: "Multi-layered pastries with rich fillings",
      image: "./src/assets/cake_parfait.JPG",
    },
    {
      id: 8,
      name: "Celebration Cake",
      description: "Multi-layered pastries with rich fillings",
      image: "./src/assets/Celebration_cakes.JPG",
    },
  ];

  const reviews = [
    {
      id: 1,
      reviewer: "Etienne Mbarga",
      rating: 5.0,
      text: "Ordered cakes and pastries for a family gathering; quality was exceptional. Swift delivery ensured everything arrived fresh. Highly recommended for catering services.",
    },
    {
      id: 2,
      reviewer: "Nadine Fongang",
      rating: 4.8,
      text: "The variety of food trays and small chops is impressive. Wedding cupcakes were stunning and delicious. Swift delivery despite no physical shop.",
    },
    {
      id: 3,
      reviewer: "Paul Ndongo",
      rating: 4.9,
      text: "Custom cake parfait for a corporate event was a hit. Beautifully presented, with prompt delivery. Top choice for catering and meals.",
    },
    {
      id: 4,
      reviewer: "Chantal Abena",
      rating: 5.0,
      text: "Doughnuts and pastries were fresh and flavorful for my tea party. Swift delivery made it seamless despite no storefront. Excellent service.",
    },
    {
      id: 5,
      reviewer: "Armand Ngu",
      rating: 4.7,
      text: "Wedding catering with food trays and small chops was superb. Generous portions, prompt delivery. Great choice for events.",
    },
    {
      id: 6,
      reviewer: "Mireille Mbah",
      rating: 4.6,
      text: "Cooked meals and cake parfaits for a family dinner were delicious. Swift delivery ensured freshness. Ideal for personalized orders.",
    },
    {
      id: 7,
      reviewer: "Blaise Etoa",
      rating: 4.9,
      text: "Pastries and doughnuts were fresh and tasty. Catering options are excellent. Swift delivery ensured perfect condition. Highly reliable.",
    },
    {
      id: 8,
      reviewer: "Yolande Nfon",
      rating: 5.0,
      text: "Wedding cupcakes and small chops were beautifully crafted. Swift delivery to my venue. Exceptional quality without a physical shop.",
    },
    {
      id: 9,
      reviewer: "Serge Atangana",
      rating: 4.8,
      text: "Ordered food trays and pastries for a birthday party. Flavors were spot-on, and delivery was quick. Outstanding catering service.",
    },
    {
      id: 10,
      reviewer: "Florence Tchuente",
      rating: 4.7,
      text: "Small chops and cake parfaits for an event were delightful. Swift delivery and great presentation. Perfect for any occasion.",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "What types of cakes do you offer?",
      answer:
        "We offer a wide variety of cakes, including classic flavors like vanilla, chocolate, and red velvet, as well as specialty cakes such as carrot cake, lemon cake, and seasonal fruit cakes. We also have a selection of vegan and gluten-free options available.",
    },
    {
      id: 2,
      question: "How far in advance should I place my order?",
      answer:
        "For custom cakes and large orders, we recommend placing your order at least 48-72 hours in advance. For simple items like cupcakes or standard cakes, 24 hours notice is usually sufficient. Rush orders may be accommodated depending on availability.",
    },
    {
      id: 3,
      question: "Do you offer custom cake designs?",
      answer:
        "Yes! We specialize in custom cake designs for all occasions. Share your vision with us, including theme, colors, size, and any specific design elements you want. Our team will work with you to create the perfect cake for your celebration.",
    },
    {
      id: 4,
      question: "What are your delivery options?",
      answer:
        "We offer swift delivery throughout Yaoundé and surrounding areas. Delivery fees vary based on location and order size. For large events or catering orders, we can arrange special delivery times to ensure everything arrives fresh and on schedule.",
    },
    {
      id: 5,
      question: "Can I cancel or modify my order?",
      answer:
        "Order modifications can be made up to 24 hours before your scheduled delivery or pickup time. Cancellations made more than 24 hours in advance receive a full refund. Cancellations within 24 hours may be subject to a fee depending on the order status.",
    },
  ];

  const [openFaqId, setOpenFaqId] = useState(null);

  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const buttonsRef = useRef(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const productsRef = useRef(null);
  const promoRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    if (textRef.current) observer.observe(textRef.current);
    if (imageRef.current) observer.observe(imageRef.current);
    if (buttonsRef.current) observer.observe(buttonsRef.current);
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (productsRef.current) observer.observe(productsRef.current);
    if (promoRef.current) observer.observe(promoRef.current);
    if (reviewsRef.current) observer.observe(reviewsRef.current);
    if (faqRef.current) observer.observe(faqRef.current);

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
      if (textRef.current) observer.unobserve(textRef.current);
      if (imageRef.current) observer.unobserve(imageRef.current);
      if (buttonsRef.current) observer.unobserve(buttonsRef.current);
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (productsRef.current) observer.unobserve(productsRef.current);
      if (promoRef.current) observer.unobserve(promoRef.current);
      if (reviewsRef.current) observer.unobserve(reviewsRef.current);
      if (faqRef.current) observer.unobserve(faqRef.current);
    };
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const maxStars = 5;

    for (let i = 1; i <= maxStars; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <span key={`star-${i}`} className="star filled">
            ★
          </span>
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <span key={`star-${i}`} className="star half">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={`star-${i}`} className="star empty">
            ★
          </span>
        );
      }
    }

    return <div className="rating">{stars}</div>;
  };

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <>
      <Header />
      <section className="hero" ref={heroRef}>
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text" ref={textRef}>
              <h1>
                Every Bite, a Taste of{" "}
                <span className="highlight">Happiness</span>
              </h1>
              <div className="hero-buttons" ref={buttonsRef}>
                <button className="btn btn-primary">Shop Now</button>
                <button className="btn btn-secondary">Explore Services</button>
              </div>
            </div>
            <div className="hero-image-container" ref={imageRef}>
              <div className="hero-image-wrapper">
                <img
                  src="./src/assets/hero-cake.png"
                  alt="Delicious Cake"
                  className="hero-image"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sweet-treats-section" ref={sectionRef}>
        <div className="section-header" ref={titleRef}>
          <h2 className="section-title">Our Featured Products</h2>
        </div>

        <div className="products-container" ref={productsRef}>
          <div className="products-scroll">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <h3 className="product-name">{product.name}</h3>
              </div>
            ))}
            {products.map((product) => (
              <div key={`duplicate-${product.id}`} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                </div>
                <h3 className="product-name">{product.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="promo-section" ref={promoRef}>
        <div className="promo-container">
          <div className="promo-content">
            <img
              src="./src/assets/20_off.png"
              alt="20% Off"
              className="promo-discount-image"
            />
            <h2 className="promo-text">On Birthday Cakes this week</h2>
          </div>
          <button className="promo-btn">Order Now</button>
        </div>
      </section>

      <section className="reviews-section" ref={reviewsRef}>
        <div className="reviews-container">
          <div className="reviews-header">
            <h2 className="reviews-title">What Our Customers Say</h2>
            <p className="reviews-subtitle">
              Sweet words from our happy customers.
            </p>
          </div>

          <div className="reviews-scroll">
            {reviews.map((review) => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <h3 className="reviewer-name">{review.reviewer}</h3>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                    <span className="rating-value">{review.rating}</span>
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
            {reviews.map((review) => (
              <div key={`duplicate-${review.id}`} className="review-card">
                <div className="review-header">
                  <h3 className="reviewer-name">{review.reviewer}</h3>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                    <span className="rating-value">{review.rating}</span>
                  </div>
                </div>
                <p className="review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="faq-section" ref={faqRef}>
        <div className="faq-container">
          <div className="faq-header">
            <h2 className="faq-title">Frequently Asked Questions</h2>
            <p className="faq-subtitle">
              Can't find the answer you're looking for? Reach out to our
              customer support team.
            </p>
          </div>

          <div className="faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className="faq-item">
                <button
                  className={`faq-question ${
                    openFaqId === faq.id ? "active" : ""
                  }`}
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">
                    {openFaqId === faq.id ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`faq-answer ${openFaqId === faq.id ? "open" : ""}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Home;

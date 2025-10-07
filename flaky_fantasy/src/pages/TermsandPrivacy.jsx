import React from "react";
import "../styles/TermsandConditions.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const TermsConditions = () => {
  return (
    <>
      <Header />
      <div className="terms-container">
        <div className="terms-content">
          <div className="terms-header">
            <h1>Terms & Conditions</h1>
            <p className="last-updated">Last Updated: October 2025</p>
          </div>

          <div className="welcome-section">
            <p className="welcome-text">
              Welcome to Flaky Fantasy! By placing an order with us, you agree
              to the following terms and conditions.
            </p>
          </div>

          <div className="terms-sections">
            <div className="term-card">
              <div className="term-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 11l3 3L22 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2>Order Acceptance</h2>
              <p>
                All orders placed through our website are subject to acceptance
                by Flaky Fantasy. We reserve the right to refuse service for any
                reason.
              </p>
            </div>

            <div className="term-card">
              <div className="term-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M12 6v6l4 2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h2>Payment Terms</h2>
              <p>
                A non-refundable deposit of{" "}
                <strong>75% of the total order amount</strong> is required at
                the time of placing your order. This secures your order and
                allows us to begin preparation. The remaining{" "}
                <strong>25% is due upon delivery</strong> of your order.
              </p>
            </div>

            <div className="term-card">
              <div className="term-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h2>Delivery & Transportation</h2>
              <p>
                Customers are responsible for covering the transportation costs
                associated with the delivery of their orders. The delivery fee
                will be calculated at checkout based on your location and the
                size of your order.
              </p>
            </div>

            <div className="term-card">
              <div className="term-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path
                    d="M15 9l-6 6M9 9l6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <h2>Cancellation Policy</h2>
              <p>
                Orders can be canceled within{" "}
                <strong>48 hours of placement</strong> for a full refund of the
                upfront payment. No refunds will be issued for cancellations
                made after this period or for orders that have already been
                prepared.
              </p>
            </div>

            <div className="term-card">
              <div className="term-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2>Quality Assurance</h2>
              <p>
                At Flaky Fantasy, we strive to provide high-quality products. If
                you receive an order that does not meet your expectations,
                please contact us within <strong>24 hours of delivery</strong>{" "}
                so we can address your concerns.
              </p>
            </div>

            <div className="term-card">
              <div className="term-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 9v4M12 17h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2>Limitation of Liability</h2>
              <p>
                Flaky Fantasy is not liable for any indirect, incidental, or
                consequential damages arising from the use of our services or
                products.
              </p>
            </div>
          </div>

          <div className="terms-footer">
            <div className="footer-notice">
              <p>
                By placing an order with Flaky Fantasy, you acknowledge that you
                have read, understood, and agree to be bound by these Terms and
                Conditions.
              </p>
            </div>
            <div className="footer-contact">
              <p>
                Questions about our terms? <a href="/contact">Contact us</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;

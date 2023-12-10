import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap'; // Importing Col and Row from react-bootstrap
import '../styles/paymentchoice.css';

const PaymentChoice = () => {
  return (
    <div className="analytics-report">
      <div className="header">
        <Link to="/services/analytics">
          <img src="../assets/logo.png" alt="Logo" className="logo" />
        </Link>
        <Link to="/services/analytics/">
          <button className="back-button">Back</button>
        </Link>
      </div>
      <div className="payment-container">
        <Row> {/* Using Row to maintain consistent styling */}
          <Col>
            <div className="payment-card">
              <span className="payment-type">Card</span>
              <span className="payment-number">1234</span>
            </div>
          </Col>
          <Col>
            <div className="payment-cash">
              <span className="payment-type">Cash</span>
              <span className="payment-number">5678</span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PaymentChoice;

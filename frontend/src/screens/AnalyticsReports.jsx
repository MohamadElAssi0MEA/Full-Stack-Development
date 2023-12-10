import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap'; // Importing Col from react-bootstrap for consistent styling
import '../styles/analyticsreports.css';

const AnalyticsReports = () => {
  return (
    <Col md={3} className="analytics-reports"> {/* Adjust md={3} based on your layout */}
      <div className="header">
        <Link to="/services">
          <img src="../assets/logo.png" alt="Logo" className="logo" />
        </Link>
        <Link to="/services">
          <i className="fas fa-home"></i>
        </Link>
      </div>
      <div className="buttons">
        {/* Connect each button to its respective route */}
        <Link to="/services/analytics/inventorysummary">
          <button className="analytics-button">Inventory Summary</button>
        </Link>
        <Link to="/services/analytics/mostsold">
          <button className="analytics-button">Most Sold</button>
        </Link>
        <Link to="/services/analytics/wastedproducts">
          <button className="analytics-button">Wasted Products</button>
        </Link>
        <Link to="/services/analytics/paymentchoice">
          <button className="analytics-button">Payment Choice</button>
        </Link>
      </div>
    </Col>
  );
}

export default AnalyticsReports;

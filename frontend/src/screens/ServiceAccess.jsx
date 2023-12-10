import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';  // Import Button from react-bootstrap
import '../styles/servicesaccess.css';

function ServiceAccess() {
  return (
    <div className="services-access">
      <div className="button-container">
        {/* Connect each button to its respective route */}
        <Link to="/services/inventory" className="card-link">
          <Button variant="primary" className="service-button card">
            <span>Inventory</span>
          </Button>
        </Link>
        <Link to="/services/analytics" className="card-link">
          <Button variant="primary" className="service-button card">
            <span>Analytics Reports</span>
          </Button>
        </Link>
        <Link to="/services/pointofsale" className="card-link">
          <Button variant="primary" className="service-button card">
            <span>Point Of Sale</span>
          </Button>
        </Link>
        {/* Add similar Link components for Microservice 2, Microservice 3, and Microservice 4 */}
      </div>
    </div>
  );
}

export default ServiceAccess;

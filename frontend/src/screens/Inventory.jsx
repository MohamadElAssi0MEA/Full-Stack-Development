import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import '../styles/inventory.css';

const Inventory = () => {
  return (
    <div className="inventory">
      <div className="header">
        <Link to="/services">
          <img src="../assets/logo.png" alt="Logo" className="logo" />
        </Link>
        <Link to="/services">
          <i className="fas fa-home"></i>
        </Link>
      </div>
      <div className="buttons">
        <Link to="/services/inventory/newproduct" className="button-link">
          <Button className="inventory-button card">
            New Product
          </Button>
        </Link>
        <Link to="/services/inventory/modifyproduct" className="button-link">
          <Button className="inventory-button card">
            Modify Product
          </Button>
        </Link>
        <Link to="/services/inventory/changepricebulk" className="button-link">
          <Button className="inventory-button card">
            Modify Price Bulk
          </Button>
        </Link>
        <Link to="/services/inventory/productswasted" className="button-link">
          <Button className="inventory-button card">
            Products Wasted
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Inventory;

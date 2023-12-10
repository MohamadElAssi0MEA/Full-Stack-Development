import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; // Import necessary styling components
// import '../styles/WastedProducts.css';

const WastedProducts = () => {
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
      <div className="table-container">
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* Add table rows with product data here */}
            <tr>
              <td>Product 1</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Product 2</td>
              <td>5</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
        <Button variant="primary" className="rearrange-button">
          Rearrange
        </Button>
      </div>
    </div>
  );
};

export default WastedProducts;

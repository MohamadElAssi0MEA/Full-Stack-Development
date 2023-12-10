import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; // Importing Form and Button from react-bootstrap
// import '../styles/MostSold.css';

function MostSold() {
  return (
    <div className="analytics-report">
      <div className="header">
        <Link to="/services/analytics">
          <img src="../assets/logo.png" alt="Logo" className="logo" />
        </Link>
        <Link to="/services/analytics/">
          <Button className="back-button">Back</Button>
        </Link>
      </div>
      <div className="search-bar">
        <Form>
          <Form.Control type="text" placeholder="Search..." />
          <Button variant="primary">Search</Button>
        </Form>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* Add your table rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MostSold;

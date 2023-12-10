import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';  // Import Button from react-bootstrap
import '../styles/newproduct.css';

const NewProduct = () => {
  const [barcodeID, setBarcodeID] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [thresholdValue, setThresholdValue] = useState('');
  const [wasted, setWasted] = useState(''); // New state for wasted

  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/services/inventory/');
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          barcodeID,
          productName,
          category,
          price,
          quantity,
          expiryDate,
          thresholdValue,
          wasted, // Include wasted in the request body
        }),
      });
  
      console.log('Response:', response); // Log the entire response object
  
      if (response.ok) {
        console.log('Product submitted successfully!');
        navigate('/services/inventory/');
      } else {
        console.error('Error submitting form:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <div className="new-product">
      <div className="header">
        <Link to="/services/inventory/">
          <img src="../assets/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="form">
        <label htmlFor="barcodeID">Barcode ID:</label>
        <input
          type="text"
          id="barcodeID"
          value={barcodeID}
          onChange={(e) => setBarcodeID(e.target.value)}
        />

        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />

        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <label htmlFor="expiryDate">Expiry Date:</label>
        <input
          type="text"
          id="expiryDate"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />

        <label htmlFor="thresholdValue">Threshold Value:</label>
        <input
          type="text"
          id="thresholdValue"
          value={thresholdValue}
          onChange={(e) => setThresholdValue(e.target.value)}
        />

        <label htmlFor="wasted">Wasted:</label>
        <input
          type="text"
          id="wasted"
          value={wasted}
          onChange={(e) => setWasted(e.target.value)}
        />
      </div>
      <div className="buttons">
        <Button className="cancel-button" onClick={handleCancel}>
          Cancel
        </Button>
        <Button className="submit-button" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}

export default NewProduct;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'; // Importing Bootstrap components
// import '../styles/ModifyProduct.css';

const ModifyProduct = () => {
  const [barcodeID, setBarcodeID] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [thresholdValue, setThresholdValue] = useState('');

  const navigate = useNavigate();

  const handleCancel = () => {
    // Navigate back to the inventory page
    navigate('/services/inventory/');
  };

  const handleBarcodeChange = async (enteredBarcode) => {
    // Fetch product details based on the enteredBarcode
    try {
      const response = await fetch(`/api/products/${enteredBarcode}`);
      if (response.ok) {
        const productDetails = await response.json();
        // Update the state with the fetched details
        setProductName(productDetails.productName);
        setCategory(productDetails.category);
        setPrice(productDetails.price);
        setQuantity(productDetails.quantity);
        setExpiryDate(productDetails.expiryDate);
        setThresholdValue(productDetails.thresholdValue);
      } else {
        // Barcode not found, reset other fields
        setProductName('');
        setCategory('');
        setPrice('');
        setQuantity('');
        setExpiryDate('');
        setThresholdValue('');
        // Optionally, display a popup message indicating the product was not found
        alert('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/products/${barcodeID}`, {
        method: 'PUT', // Change the method to PUT
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
        }),
      });
  
      if (response.ok) {
        console.log('Product updated successfully!');
        // Optionally, navigate back to the inventory page
        navigate('/services/inventory/');
      } else {
        console.error('Error updating product:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="modify-product">
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
          onBlur={(e) => handleBarcodeChange(e.target.value)}
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

        <Button
          className="search-button"
          onClick={() => handleBarcodeChange(barcodeID)}
        >
          Search
        </Button>
          

       
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
};

export default ModifyProduct;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pointofsale.css';

const PointOfSale = () => {
  // State to manage table data
  const [sales, setSales] = useState([]);
  const [currentSale, setCurrentSale] = useState({
    barcodeId: '',
    productName: '',
    price: 0,
    amount: 0,
    total: 0,
    paymentChoice: '', // 'cash' or 'card'
  });

  // State for products database (simulated)
  const [productsDatabase, setProductsDatabase] = useState([
    { barcodeId: '123', productName: 'Product A', price: 10 },
    { barcodeId: '456', productName: 'Product B', price: 15 },
    // Add more products as needed
  ]);

  // Function to handle barcode input
  const handleBarcodeInput = (barcode) => {
    const product = productsDatabase.find((p) => p.barcodeId === barcode);
    if (product) {
      setCurrentSale({
        ...currentSale,
        barcodeId: barcode,
        productName: product.productName,
        price: product.price,
      });
    }
  };

  

  // Function to handle amount input
  const handleAmountInput = (amount) => {
    setCurrentSale({
      ...currentSale,
      amount: amount,
      total: currentSale.price * amount,
    });
  };

  // Function to add current sale to the table
  const handleAddToTable = () => {
    setSales([...sales, currentSale]);
    setCurrentSale({
      barcodeId: '',
      productName: '',
      price: 0,
      amount: 0,
      total: 0,
      paymentChoice: '',
    });
  };

  // Function to end the sale and save to MongoDB
  const handleEndSale = () => {
    // Implement MongoDB save operation here
    console.log('Sale saved to MongoDB:', sales);
    // Clear the table
    setSales([]);
  };

  // Function to cancel the current sale and clear the table
  const handleCancelSale = () => {
    setSales([]);
    setCurrentSale({
      barcodeId: '',
      productName: '',
      price: 0,
      amount: 0,
      total: 0,
      paymentChoice: '',
    });
  };

  

  // useEffect to simulate fetching data from MongoDB
  useEffect(() => {
    // Simulate fetching products data from MongoDB
    // Update the productsDatabase state accordingly
  }, []);

  return (
    <div>
      <Link to="/services">
          <img src="../assets/logo.png" alt="Logo" className="logo" />
        </Link>
      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Barcode ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Amount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.barcodeId}</td>
              <td>{sale.productName}</td>
              <td>{sale.price}</td>
              <td>{sale.amount}</td>
              <td>{sale.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Inputs and Buttons */}
      <div>
        <input
          type="text"
          placeholder="Barcode ID"
          value={currentSale.barcodeId}
          onChange={(e) => handleBarcodeInput(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={currentSale.amount}
          onChange={(e) => handleAmountInput(e.target.value)}
        />
        {/* Add Camera Button for barcode scanning */}
        <button>Scan Barcode</button>
        {/* Customizable Buttons */}
        <button onClick={() => handleBarcodeInput('123')}>Fruits</button>
        <button onClick={() => handleBarcodeInput('456')}>Vegetables</button>
        {/* Add to Table Button */}
        <button onClick={handleAddToTable}>Add to Table</button>
      </div>

      {/* End Sale Buttons */}
      <div>
        <button onClick={handleEndSale}>End Sale - Cash</button>
        <button onClick={handleEndSale}>End Sale - Card</button>
        <button onClick={handleCancelSale}>Cancel Sale</button>
      </div>
    </div>
  );
};

export default PointOfSale;

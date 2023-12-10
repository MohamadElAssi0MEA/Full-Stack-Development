import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ModifyPriceBulk = () => {
  const [bulkInputs, setBulkInputs] = useState([]);
  const navigate = useNavigate();

  const handleCancel = () => {
    // Navigate back to the inventory page
    navigate('/services/inventory/');
  };

  const handleAddInput = () => {
    // Add a new set of barcode, product name, and price to the bulkInputs array
    if (bulkInputs.length < 5) {
      setBulkInputs([...bulkInputs, { barcode: '', product: '', price: '' }]);
    }
  };

  const handleDeleteInput = () => {
    // Remove the last set of barcode, product name, and price from the bulkInputs array
    if (bulkInputs.length > 0) {
      const newBulkInputs = [...bulkInputs];
      newBulkInputs.pop();
      setBulkInputs(newBulkInputs);
    }
  };

  const handleInputValueChange = async (index, type, value) => {
    const newBulkInputs = [...bulkInputs];
    newBulkInputs[index][type] = value;
  
    if (type === 'barcode') {
      try {
        const response = await fetch(`/api/products/${value}`);
        if (response.ok) {
          const productDetails = await response.json();
          newBulkInputs[index].product = productDetails.productName;
          newBulkInputs[index].price = productDetails.price; // Autofill price as well
          setBulkInputs(newBulkInputs);
        } else {
          newBulkInputs[index].product = ''; // Clear the product name if not found
          newBulkInputs[index].price = ''; // Clear the price as well
          setBulkInputs(newBulkInputs);
          alert('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    } else if (type === 'price') {
      // If the type is 'price', update the price value
      newBulkInputs[index].price = value;
      setBulkInputs(newBulkInputs);
    }
  };
  

  const handleSubmit = async () => {
    try {
      // Extract barcodeID, product name, and price for each product
      const updates = bulkInputs.map(input => ({
        barcodeID: input.barcode,
        newPrice: input.price,
      }));

      // Your API call to update prices individually
      const updatePromises = updates.map(async ({ barcodeID, newPrice }) => {
        const response = await fetch(`/api/products/${barcodeID}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            price: newPrice,
          }),
        });

        return response.ok;
      });

      const results = await Promise.all(updatePromises);

      // Check if all products were successfully updated
      if (results.every(success => success)) {
        console.log('Prices updated successfully!');
        // Optionally, navigate back to the inventory page
        navigate('/services/inventory/');
      } else {
        console.error('Error updating prices for some products');
      }
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  };

  return (
    <div className="modify-price-bulk">
      {bulkInputs.map((input, index) => (
  <div key={index}>
    <label htmlFor={`barcodeInput${index}`}>Barcode {index + 1}:</label>
    <input
      type="text"
      id={`barcodeInput${index}`}
      value={input.barcode}
      onChange={(e) => handleInputValueChange(index, 'barcode', e.target.value)}
    />
    <label htmlFor={`productInput${index}`}>Product {index + 1}:</label>
    <input
      type="text"
      id={`productInput${index}`}
      value={input.product}
      readOnly
    />
    <label htmlFor={`priceInput${index}`}>Price {index + 1}:</label>
    <input
      type="text"
      id={`priceInput${index}`}
      value={input.price}
      onChange={(e) => handleInputValueChange(index, 'price', e.target.value)}
    />
  </div>
))}

      <div className="buttons">
        <Button className="add-button" onClick={handleAddInput}>
          Add Input
        </Button>
        <Button className="delete-button" onClick={handleDeleteInput}>
          Delete Last
        </Button>
      </div>
      <div>
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

export default ModifyPriceBulk;

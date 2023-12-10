import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';  // Make sure to import necessary components from react-bootstrap
// import '../styles/ProductsWasted.css';

function ProductsWasted() {
  const [barcodeId] = useState('');
  const [productName] = useState('');
  const [wastedInputs, setWastedInputs] = useState([
    { barcode: '', product: '', wasted: '' },
  ]); // Add this line to declare and initialize 'wasted'


  const navigate = useNavigate();

  const handleCancel = () => {
    // Navigate back to the inventory page
    navigate('/services/inventory/');
  };

  const handleAddInput = () => {
    // Add a new set of barcode, product name, and quantity to the wastedInputs array
    if (wastedInputs.length < 5) {
      setWastedInputs([...wastedInputs, { barcode: '', product: '', quantity: '' }]);
    }
  };

  const handleDeleteInput = () => {
    // Remove the last set of barcode, product name, and quantity from the wastedInputs array
    if (wastedInputs.length > 0) {
      const newWastedInputs = [...wastedInputs];
      newWastedInputs.pop();
      setWastedInputs(newWastedInputs);
    }
  };



  const handleBarcodeChange = async (index, barcode) => {
    try {
      const response = await fetch(`/api/products/${barcode}`);
      if (response.ok) {
        const productDetails = await response.json();
        handleInputValueChange(index, 'product', productDetails.productName);
      } else {
        // Handle the case where the product is not found or an error occurs
        handleInputValueChange(index, 'product', '');
        console.error('Error fetching product details:', response.statusText);
        alert('Product not found or an error occurred');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      alert('An error occurred while fetching product details');
    }
  };

  const handleQuantityChange = (index, value) => {
    const newWastedInputs = [...wastedInputs];
    newWastedInputs[index].wasted = value;
    setWastedInputs(newWastedInputs);
  };

  const handleInputValueChange = (index, type, value) => {
    // Update the value of barcode, product name, or quantity based on the input index and type
    const newWastedInputs = [...wastedInputs];
    newWastedInputs[index][type] = value;
    setWastedInputs(newWastedInputs);
  };

  const handleSubmit = async () => {
    try {
      // Extract relevant data from wastedInputs
      const wastedProducts = wastedInputs.map(({ barcode, product, wasted }) => ({
        barcode,
        productName: product,
        wasted, // Use 'wasted' instead of 'quantity'
      }));
  
      // Your API call to submit data
      const updatePromises = wastedProducts.map(async ({ barcode, wasted }) => {
        const response = await fetch(`/api/products/${barcode}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            barcodeId,
            productName,
            wasted, // Change from 'quantity' to 'wasted'
            wastedProducts,
          }),
        });
  
        return response.ok;
      });

        

      const updateResults = await Promise.all(updatePromises);

      // Check if all updates were successful
      if (updateResults.every(result => result)) {
        console.log('Product quantities updated successfully!');

        // Now, you can submit the wasted form or navigate to another page
        // You may choose to submit the wasted form directly here if you don't have a separate wasted API endpoint
        // Example:
        const wastedResponse = await fetch('/api/products/wasted', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            barcodeId,
            productName,
            wasted, // Use the declared 'wasted' variable here
            wastedProducts,
          }),
        });

        if (wastedResponse.ok) {
          console.log('Wasted form submitted successfully!');
          // Optionally, navigate back to the inventory page or perform other actions
          navigate('/services/inventory/');
        } else {
          console.error('Error submitting wasted form:', wastedResponse.statusText);
        }
      } else {
        console.error('Error updating product quantities.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };




  return (
    <div className="products-wasted">
      <div className="header">
        <Link to="/services/inventory/">
          <img src="../assets/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <div className="form">


        {wastedInputs.map((input, index) => (
          <div key={index}>
            <Form.Group controlId={`barcode${index + 1}`}>
              <Form.Label>Barcode {index + 1}:</Form.Label>
              <Form.Control
                type="text"
                value={input.barcode}
                onChange={(e) => handleInputValueChange(index, 'barcode', e.target.value)}
                onBlur={(e) => handleBarcodeChange(index, e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={`product${index + 1}`}>
              <Form.Label>Product {index + 1}:</Form.Label>
              <Form.Control
                type="text"
                value={input.product}
                onChange={(e) => handleInputValueChange(index, 'product', e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId={`wasted${index + 1}`}>
              <Form.Label>Wasted {index + 1}:</Form.Label>
              <Form.Control
                type="text"
                value={input.wasted}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
              />
            </Form.Group>
          </div>
        ))}

        <div className="buttons">
          <Button className="add-button" onClick={handleAddInput}>
            Add More
          </Button>

          <Button className="delete-button" onClick={handleDeleteInput}>
            Delete Last
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
    </div>
  );
}

export default ProductsWasted;

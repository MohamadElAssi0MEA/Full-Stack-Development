import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/inventorysummary.css';

function InventorySummary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch data from your API when the component mounts or when searchTerm changes
    fetchData();
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      setLoading(true);
  
      const response = await fetch(`/api/products?searchTerm=${searchTerm}`);
  
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched data:', data);
        setFilteredData(data);
      } else {
        const errorData = await response.json(); // Attempt to parse error response
        console.error('Error fetching data:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleSearch = () => {
    // Call fetchData to update the data based on the new searchTerm
    fetchData();
  };

  return (
    <div className="analytics-report">
      <Link to="/services/analytics/">
          <Button className="back-button">Back</Button>
        </Link>
      {/* ... (rest of your component) */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through your filteredData and create rows */}
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InventorySummary;

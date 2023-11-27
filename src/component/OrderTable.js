// OrderTable.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const OrderTable = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from the JSON server based on the user ID from the route
    axios.get(`http://localhost:3001/orders?userId=${userId}`)
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders data:', error));
  }, [userId]); // Re-run effect when userId changes

  return (
    <div className="container mt-4">
      <h2>Order Dashboard for User ID {userId}</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.product}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;

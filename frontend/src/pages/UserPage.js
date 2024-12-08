import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect to login if the user is not logged in
      return;
    }

    // Fetch orders for the logged-in user from the server
    axios.get(`http://localhost:5000/api/orders/${user.id}`)
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no previous orders.</p>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.orderId} style={{ marginBottom: '20px' }}>
              <h3>Order #{order.orderId}</h3>
              <p>Date: {order.date}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total}</p>
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    Product ID: {item.productId}, Size: {item.size}, Quantity: {item.quantity}, Price: ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;

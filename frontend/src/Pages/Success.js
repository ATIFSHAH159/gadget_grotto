import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '../Services/api';
import '../Assets/Css/Auth.css';

function Success() {
  const [orderSaved, setOrderSaved] = useState(false);
  const [orderError, setOrderError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saveOrder = async () => {
      const orderCart = localStorage.getItem('order_cart');
      const user = JSON.parse(localStorage.getItem('user'));
      if (orderCart && user && user.token) {
        try {
          const orderData = JSON.parse(orderCart);
          await createOrder(orderData);
          setOrderSaved(true);
          localStorage.removeItem('order_cart');
          // Optionally clear the cart in your context/state here
        } catch (err) {
          setOrderError('Order could not be saved. Please contact support.');
        }
      }
    };
    saveOrder();
  }, [navigate]);

  return (
    <div className="auth-container">
      <div className="auth-form" style={{ textAlign: 'center', maxWidth: 500 }}>
        <h2 style={{ color: '#00FFE5', marginBottom: 20 }}>Payment Successful!</h2>
        <div style={{ fontSize: 60, color: '#00FFE5', marginBottom: 20 }}>
          <span role="img" aria-label="success">✅</span>
        </div>
        <p style={{ color: '#B0B0B8', fontSize: '1.1rem', marginBottom: 30 }}>
          Thank you for your purchase!<br />
          Your payment was successful and your order is being processed.
        </p>
        {orderSaved && <p style={{ color: '#00FFE5', marginBottom: 10 }}>Order saved to your history!</p>}
        {orderError && <p style={{ color: 'red', marginBottom: 10 }}>{orderError}</p>}
        <Link to="/" className="auth-button" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 10 }}>
          Go to Home
        </Link>
        <Link to="/orders" className="auth-button" style={{ textDecoration: 'none', display: 'inline-block', marginTop: 10, background: 'linear-gradient(135deg, #7B5CFF 0%, #00FFE5 100%)' }}>
          View Order History
        </Link>
      </div>
    </div>
  );
}

export default Success; 
import React, { useEffect, useState } from 'react';
import { getAllOrders, updateOrderStatus } from '../Services/api';
import '../Assets/Css/Auth.css';

const STATUS_OPTIONS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          setError('Not authorized');
          return;
        }
        const response = await getAllOrders();
        setOrders(response.orders || response);
      } catch (err) {
        setError('Could not fetch orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders => orders.map(o => o._id === orderId ? { ...o, deliveryStatus: newStatus } : o));
    } catch (err) {
      alert('Failed to update status');
    } finally {
      setUpdating('');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form" style={{ textAlign: 'center', maxWidth: 1000 }}>
        <h2 style={{ color: '#00FFE5', marginBottom: 20 }}>Admin Order History</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : orders.length === 0 ? (
          <p style={{ color: '#B0B0B8' }}>No orders found.</p>
        ) : (
          <div style={{ marginTop: 20, overflowX: 'auto' }}>
            <table style={{ width: '100%', color: '#fff', borderCollapse: 'collapse', minWidth: 900 }}>
              <thead>
                <tr style={{ color: '#00FFE5', borderBottom: '1px solid #2A2A30' }}>
                  <th style={{ padding: 8 }}>Order ID</th>
                  <th style={{ padding: 8 }}>User</th>
                  <th style={{ padding: 8 }}>Date</th>
                  <th style={{ padding: 8 }}>Total</th>
                  <th style={{ padding: 8 }}>Payment</th>
                  <th style={{ padding: 8 }}>Delivery Status</th>
                  <th style={{ padding: 8 }}>Items</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id} style={{ borderBottom: '1px solid #2A2A30', verticalAlign: 'top' }}>
                    <td style={{ padding: 8, fontSize: 13 }}>{order._id}</td>
                    <td style={{ padding: 8, fontSize: 13 }}>
                      <div style={{ fontWeight: 500 }}>
                        {order.user?.name || 'Unknown User'}
                      </div>
                      <div style={{ color: '#B0B0B8', fontSize: 12 }}>
                        {order.user?.email || 'No email available'}
                      </div>
                    </td>
                    <td style={{ padding: 8, fontSize: 13 }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td style={{ padding: 8, fontWeight: 600 }}>Rs.{order.totalPrice}</td>
                    <td style={{ padding: 8, color: order.status === 'Paid' ? '#00FFE5' : '#FF3B5B', fontWeight: 500 }}>
                      {order.status || (order.isPaid ? 'Paid' : 'Pending')}
                    </td>
                    <td style={{ padding: 8 }}>
                      <select
                        value={order.deliveryStatus || 'Pending'}
                        onChange={e => handleStatusChange(order._id, e.target.value)}
                        disabled={updating === order._id}
                        style={{ padding: 4, borderRadius: 4, background: '#23233a', color: '#00FFE5', border: '1px solid #00FFE5' }}
                      >
                        {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </td>
                    <td style={{ padding: 8 }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {order.orderItems && order.orderItems.map((item, idx) => (
                          <div key={idx} style={{ background: '#23233a', borderRadius: 8, padding: 6, minWidth: 120, maxWidth: 140, textAlign: 'center', boxShadow: '0 1px 6px #00ffe522', marginBottom: 4 }}>
                            {item.image && <img src={`http://localhost:5000/${item.image}`} alt={item.name} style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: 6, border: '1px solid #00FFE5', marginBottom: 4 }} />}
                            <div style={{ color: '#00FFE5', fontWeight: 500, fontSize: 13 }}>{item.name}</div>
                            <div style={{ color: '#B0B0B8', fontSize: 12 }}>Qty: {item.quantity}</div>
                            <div style={{ color: '#fff', fontWeight: 500, fontSize: 13 }}>Rs.{item.price}</div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminOrders; 
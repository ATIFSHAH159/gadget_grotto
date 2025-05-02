import React, { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useContextData } from "../Common/Context";
import { FaPlus, FaMinus, FaTrashAlt, FaShoppingBag, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { createCheckoutSession } from '../Services/api';
import '../Assets/Css/Addtocart.css';

function AddtoCart() {
  const { cart, incrementQty, decrementQty, removeFromCart } = useContextData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Calculate cart totals
  const cartSubtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = cart.length > 0 ? 99 : 0;
  const tax = cartSubtotal * 0.18; // 18% tax
  const cartTotal = cartSubtotal + shipping + tax;

  const handleCheckout = async () => {
    try {
      // Check if user is logged in
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        // Redirect to login page, storing the current URL to return after login
        navigate('/login', { state: { from: '/addtocart' } });
        return;
      }

      setLoading(true);
      // Transform cart items to match the expected format
      const items = cart.map(item => {
        // Clean and encode the image path
        const cleanImagePath = item.pic.replace(/\\/g, '/').replace('Images/', '');
        const encodedImagePath = encodeURIComponent(cleanImagePath);
        
        return {
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: `http://localhost:5000/Images/${encodedImagePath}`
        };
      });
      
      const { url } = await createCheckoutSession(items);
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      if (error.message === 'Not authorized, no token') {
        navigate('/login', { state: { from: '/addtocart' } });
      }
      // You might want to add error notification here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <Container>
        <div className="cart-header">
          <h1>Your Shopping Cart</h1>
          <p>{cart.length} item{cart.length !== 1 ? 's' : ''} in your cart</p>
        </div>
        
        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">
              <FaShoppingBag />
            </div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link to="/" className="btn-continue-shopping">
              Start Shopping
            </Link>
          </div>
        ) : (
          <Row>
            <Col lg={8}>
              <div className="cart-items">
                {cart.map((item, index) => (
                  <Card className="cart-item" key={index}>
                    <Row className="g-0">
                      <Col xs={12} sm={3} className="item-image-container">
                        <img
                          src={`http://localhost:5000/${item.pic}`}
                          alt={item.name}
                          className="item-image"
                        />
                      </Col>
                      <Col xs={12} sm={9}>
                        <Card.Body>
                          <div className="item-details">
                            <div className="item-info">
                              <h3 className="item-name">{item.name}</h3>
                              <p className="item-description">{item.discription}</p>
                              <p className="item-price">Price: Rs.{item.price}</p>
                            </div>
                            <div className="item-price-section">
                              <div className="item-price">Rs.{item.price}</div>
                            </div>
                          </div>

                          <div className="item-actions">
                            <div className="quantity-control">
                              <button 
                                className="qty-btn"
                                onClick={() => decrementQty(item._id)}
                                disabled={item.quantity <= 1}
                              >
                                <FaMinus />
                              </button>
                              <span className="quantity">{item.quantity}</span>
                              <button 
                                className="qty-btn"
                                onClick={() => incrementQty(item._id)}
                              >
                                <FaPlus />
                              </button>
                            </div>
                            <div className="item-subtotal">
                              Rs.{(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button 
                              className="remove-item" 
                              onClick={() => removeFromCart(item._id)}
                            >
                              <FaTrashAlt />
                            </button>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
              
              <div className="shopping-actions">
                <Link to="/" className="continue-shopping">
                  <FaArrowLeft /> Continue Shopping
                </Link>
              </div>
            </Col>
            
            <Col lg={4}>
              <div className="cart-summary">
                <h2>Order Summary</h2>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>Rs.{cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>Rs.{shipping.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (18%)</span>
                  <span>Rs.{tax.toFixed(2)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>Rs.{cartTotal.toFixed(2)}</span>
                </div>
                
                <Button 
                  className="checkout-button" 
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </Button>
                
                <div className="payment-methods">
                  <p>We accept:</p>
                  <div className="payment-icons">
                    <span className="payment-icon visa"></span>
                    <span className="payment-icon mastercard"></span>
                    <span className="payment-icon amex"></span>
                    <span className="payment-icon paypal"></span>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default AddtoCart;

import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaLaptop, FaMicrochip, FaBatteryFull, FaTruck, FaHeadphones, FaShieldAlt } from "react-icons/fa";
import Footer from "../Components/Footer";
import "../Assets/Css/Landingpage.css";

// Import images from Assets folder if they exist
// If not, we'll use placeholder URLs that you can replace later

function LandingPage() {
  // Categories based on the existing product pages
  const categories = [
    { 
      name: "Power Banks", 
      path: "/products/Powerbanks", 
      icon: <FaBatteryFull />, 
      description: "Keep your devices charged on the go",
      image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80"
    },
    { 
      name: "Bluetooth Speakers", 
      path: "/products/Bluetooth_speakers", 
      icon: <FaHeadphones />, 
      description: "Wireless audio for any environment",
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80"
    },
    { 
      name: "Fitness Bands", 
      path: "/products/Fitness_Bands", 
      icon: <FaLaptop />, 
      description: "Track your health and fitness goals",
      image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
    },
    { 
      name: "Phone Cases", 
      path: "/products/Phone_Cases & Covers", 
      icon: <FaShieldAlt />, 
      description: "Protect your device in style",
      image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
    }
  ];

  // Featured products
  const featuredProducts = [
    {
      name: "Ultra Slim Power Bank 10000mAh",
      price: 1999,
      image: "https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      category: "PowerBank"
    },
    {
      name: "Water-Resistant Bluetooth Speaker",
      price: 2499,
      image: "https://images.unsplash.com/photo-1589003511626-d5f0f3d97d6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      category: "Bluetooth Speakers"
    },
    {
      name: "Premium Fitness Tracker",
      price: 3499,
      image: "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1139&q=80",
      category: "Fitness Bands"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah L.",
      text: "Gadget Grotto has become my go-to for tech accessories. The quality is outstanding and shipping is always fast!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      name: "James M.",
      text: "I've purchased several power banks and phone cases from them. Their customer service is top-notch and products last for years.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Emily W.",
      text: "The Bluetooth speaker I bought exceeded my expectations. Great sound quality and the battery life is impressive!",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/29.jpg"
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span className="highlight">Gadget Grotto</span></h1>
          <p>Your destination for premium tech accessories and gadgets</p>
          <div className="hero-buttons">
            <Link to="/products/Powerbanks" className="cta-button primary">Shop Now</Link>
            <Link to="/aboutus" className="cta-button secondary">About Us</Link>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <Container>
          <Row>
            <Col md={4} className="feature-item">
              <div className="feature-icon">
                <FaMicrochip />
              </div>
              <h3>Premium Quality</h3>
              <p>Curated selection of high-quality tech gadgets</p>
            </Col>
            <Col md={4} className="feature-item">
              <div className="feature-icon">
                <FaTruck />
              </div>
              <h3>Fast Delivery</h3>
              <p>Express shipping available on all orders</p>
            </Col>
            <Col md={4} className="feature-item">
              <div className="feature-icon">
                <FaShieldAlt />
              </div>
              <h3>Warranty Protection</h3>
              <p>All products come with manufacturer warranty</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <Container>
          <h2 className="section-title">Shop By Category</h2>
          <div className="section-line"></div>
          <p className="section-subtitle">Explore our wide range of tech gadgets</p>
          
          <Row className="category-cards">
            {categories.map((category, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <Link to={category.path} className="category-link">
                  <div className="category-card">
                    <div className="category-image" style={{ backgroundImage: `url(${category.image})` }}>
                      <div className="category-overlay"></div>
                      <div className="category-icon">{category.icon}</div>
                    </div>
                    <div className="category-content">
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                    </div>
                  </div>
                </Link>
              </Col>
            ))}
          </Row>
          
          <div className="view-all-container">
            <Link to="/products/Powerbanks" className="view-all-button">View All Categories</Link>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <Container>
          <h2 className="section-title">Featured Products</h2>
          <div className="section-line"></div>
          <p className="section-subtitle">Our most popular tech gadgets</p>
          
          <Row>
            {featuredProducts.map((product, index) => (
              <Col lg={4} md={6} className="mb-4" key={index}>
                <Card className="featured-product-card">
                  <div className="product-img-container">
                    <Card.Img variant="top" src={product.image} className="product-img" />
                    <div className="product-overlay">
                      <Link to={`/products/${product.category}`} className="view-product-btn">
                        View Product
                      </Link>
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <div className="product-price">
                      <span className="price-tag">Rs.{product.price}</span>
                      <span className="discount-tag">20% OFF</span>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <Container>
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="section-line"></div>
          
          <Carousel fade className="testimonial-carousel">
            {testimonials.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <div className="testimonial-item">
                  <div className="testimonial-image">
                    <img src={testimonial.image} alt={testimonial.name} />
                  </div>
                  <div className="testimonial-content">
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="star">★</span>
                      ))}
                    </div>
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    <p className="testimonial-name">- {testimonial.name}</p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <Container>
          <div className="cta-content">
            <h2>Ready to Elevate Your Tech Experience?</h2>
            <p>Explore our premium collection of gadgets and accessories</p>
            <Link to="/contactus" className="cta-button primary">Contact Us</Link>
          </div>
        </Container>
      </section>

    </div>
  );
}

export default LandingPage;
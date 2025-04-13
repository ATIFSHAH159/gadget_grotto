import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";
import "../Assets/Css/Contactus.css";

function Contactus() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    // Form is valid, you can handle submission here
    alert("Form submitted successfully!");
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} className="text-center">
              <h1 className="hero-title">Get in Touch</h1>
              <div className="hero-line"></div>
              <p className="hero-subtitle">
                Have questions or feedback? We'd love to hear from you!
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="contact-container">
        <Row>
          {/* Contact Information */}
          <Col lg={5} className="contact-info">
            <h2 className="info-title">Contact Information</h2>
            <div className="info-line"></div>
            <p className="info-text">
              Reach out to our team for any inquiries about our products, order status, or feedback. We're here to help!
            </p>

            <div className="info-item">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <h3>Our Location</h3>
                <p>Near COMSATS University Islamabad Abbottabad Campus</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaPhoneAlt />
              </div>
              <div className="info-content">
                <h3>Phone Number</h3>
                <p>0313-9426192</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaEnvelope />
              </div>
              <div className="info-content">
                <h3>Email Address</h3>
                <p>support@gadgetgrotto.com</p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-icon">
                <FaClock />
              </div>
              <div className="info-content">
                <h3>Business Hours</h3>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="social-links">
              <h3>Connect With Us</h3>
              <div className="social-icons">
                <a href="#" className="social-icon">
                  <FaInstagram />
                </a>
                <a href="#" className="social-icon">
                  <FaTwitter />
                </a>
                <a href="#" className="social-icon">
                  <FaFacebook />
                </a>
                <a href="#" className="social-icon">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col lg={7} className="contact-form-container">
            <div className="form-card">
              <h2 className="form-title">Send Us a Message</h2>
              <div className="form-line"></div>

              <Form className="contact-form" onSubmit={handleSubmit} noValidate>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Your first name"
                        required
                        pattern="^[^\d][\w\s]*$"
                        title="First name must not start with a number"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Your last name"
                        required
                        pattern="^[^\d][\w\s]*$"
                        title="Last name must not start with a number"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Your email address"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                  <Form.Group className="mb-3">
  <Form.Label>Phone Number</Form.Label>
  <Form.Control
    type="text"
    placeholder="Your phone number"
    required
    maxLength={15}
    onChange={(e) => {
      const value = e.target.value;
      if (/[^0-9]/.test(value)) {
        alert("Please enter numbers only");
        e.target.value = value.replace(/[^0-9]/g, ""); // Remove non-numeric
      }
    }}
  />
</Form.Group>


                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="What is this regarding?"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Your message here..."
                    required
                  />
                </Form.Group>

                <Button type="submit" className="submit-button">
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Map */}
      <div className="map-container">
        <div className="map-overlay">
          <Container>
            <Row className="justify-content-center text-center">
              <Col md={8}>
                <h2 className="map-title">Visit Our Store</h2>
                <p className="map-text">
                  Experience our products in person at our flagship store.
                </p>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="mock-map"></div>
      </div>
    </div>
  );
}

export default Contactus;

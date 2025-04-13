import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaEnvelope, FaGoogle, FaFacebook, FaInfoCircle } from "react-icons/fa";
import "../Assets/Css/Auth.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreed: false,
  });
  const [validated, setValidated] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = formData.password.length >= 6;
    const isPasswordMatch = formData.password === formData.confirmPassword;
    const hasAgreed = formData.agreed;

    if (
      !form.checkValidity() ||
      !isEmailValid ||
      !isPasswordValid ||
      !isPasswordMatch ||
      !hasAgreed
    ) {
      event.stopPropagation();
    } else {
      console.log("Registration with:", formData);
      alert("Registration successful! (This is a demo)");
    }

    setValidated(true);
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg={5} md={8} sm={12}>
            <Card className="auth-card">
              <Card.Body>
                <div className="auth-header">
                  <h2>Create Account</h2>
                  <p>Join Gadget Grotto for exclusive deals</p>
                </div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  {/* Full Name */}
                  <Form.Group className="mb-4">
                    <div className="input-icon-wrapper">
                      <FaUser className="input-icon" />
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please provide your name.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Email */}
                  <Form.Group className="mb-4">
                    <div className="input-icon-wrapper">
                      <FaEnvelope className="input-icon" />
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleChange}
                        isInvalid={validated && !validateEmail(formData.email)}
                        required
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password */}
                  <Form.Group className="mb-3">
                    <div className="input-icon-wrapper">
                      <FaLock className="input-icon" />
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        isInvalid={validated && formData.password.length < 6}
                        required
                        minLength={6}
                        aria-describedby="passwordHelpBlock"
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 6 characters.
                    </Form.Control.Feedback>
                    <Form.Text id="passwordHelpBlock" className={`password-hint ${passwordFocus ? 'visible' : ''}`}>
                      <FaInfoCircle className="me-1" />
                      Your password must be at least 6 characters long.
                    </Form.Text>
                  </Form.Group>

                  {/* Confirm Password */}
                  <Form.Group className="mb-4">
                    <div className="input-icon-wrapper">
                      <FaLock className="input-icon" />
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={validated && 
                          (formData.confirmPassword !== formData.password || 
                           (formData.confirmPassword.length > 0 && formData.password.length < 6))}
                        required
                        minLength={6}
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {formData.password.length < 6 
                        ? "Password must be at least 6 characters." 
                        : "Passwords do not match."}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Terms */}
                  <Form.Group className="mb-4">
                    <Form.Check
                      required
                      name="agreed"
                      checked={formData.agreed}
                      onChange={handleChange}
                      label="I agree to the Terms & Conditions"
                      feedback="You must agree before submitting."
                      feedbackType="invalid"
                      className="auth-checkbox"
                    />
                  </Form.Group>

                  <Button type="submit" className="auth-button">
                    Create Account
                  </Button>
                </Form>

                <div className="auth-separator">
                  <span>OR</span>
                </div>

                <div className="social-buttons">
                  <Button className="social-button google">
                    <FaGoogle /> Sign up with Google
                  </Button>
                  <Button className="social-button facebook">
                    <FaFacebook /> Sign up with Facebook
                  </Button>
                </div>

                <div className="auth-footer">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" className="auth-link">
                      Sign In
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Signup;

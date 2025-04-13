import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaGoogle, FaFacebook } from "react-icons/fa";
import "../Assets/Css/Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    const isEmailValid = validateEmail(email);
    const isPasswordValid = password.length >= 6;

    if (!isEmailValid || !isPasswordValid || form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log("Login attempt with:", { email, password });
      alert("Login successful! (This is a demo)");
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
                  <h2>Welcome Back</h2>
                  <p>Sign in to continue to Gadget Grotto</p>
                </div>

                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <Form.Group className="mb-4" controlId="formEmail">
                    <div className="input-icon-wrapper">
                      <FaUser className="input-icon" />
                      <Form.Control
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        isInvalid={validated && !validateEmail(email)}
                        required
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Please enter a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Password Field */}
                  <Form.Group className="mb-4" controlId="formPassword">
                    <div className="input-icon-wrapper">
                      <FaLock className="input-icon" />
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={validated && password.length < 6}
                        required
                        minLength={6}
                      />
                    </div>
                    <Form.Control.Feedback type="invalid">
                      Password must be at least 6 characters long.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-flex justify-content-between mb-4">
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      className="auth-checkbox"
                    />
                    <Link to="/forgot-password" className="forgot-link">
                      Forgot password?
                    </Link>
                  </div>

                  <Button type="submit" className="auth-button">
                    Sign In
                  </Button>
                </Form>

                <div className="auth-separator">
                  <span>OR</span>
                </div>

                <div className="social-buttons">
                  <Button className="social-button google">
                    <FaGoogle /> Sign in with Google
                  </Button>
                  <Button className="social-button facebook">
                    <FaFacebook /> Sign in with Facebook
                  </Button>
                </div>

                <div className="auth-footer">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/signup" className="auth-link">
                      Sign Up
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

export default Login;

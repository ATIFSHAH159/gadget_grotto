import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaRocket, FaLightbulb, FaUsers, FaHandshake } from "react-icons/fa";
import "../Assets/Css/Aboutus.css";

function Aboutus() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} className="text-center">
              <h1 className="hero-title">About Gadget Grotto</h1>
              <div className="hero-line"></div>
              <p className="hero-subtitle">
                Your premium destination for cutting-edge tech gadgets and accessories
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Our Story Section */}
      <Container className="story-section">
        <Row>
          <Col lg={6}>
            <h2 className="section-title">Our Story</h2>
            <div className="title-line"></div>
            <p className="section-text">
              Founded in 2023, Gadget Grotto was born from a simple vision: to create a tech paradise where enthusiasts could find the latest and greatest gadgets without the usual hassle and overwhelm of large electronics stores.
            </p>
            <p className="section-text">
              What started as a small online store with a handful of premium products has quickly evolved into a comprehensive tech hub offering everything from power banks to drone cameras, gaming accessories to mobile enhancements.
            </p>
            <p className="section-text">
              Our commitment to quality, innovation, and customer satisfaction has remained unwavering throughout our journey, establishing Gadget Grotto as a trusted name in the tech accessory market.
            </p>
          </Col>
          <Col lg={6} className="about-image-container">
            <div className="about-image">
              <div className="image-overlay"></div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Core Values */}
      <div className="values-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="section-title">Our Core Values</h2>
              <div className="title-line mx-auto"></div>
            </Col>
          </Row>

          <Row>
            <Col md={6} lg={3} className="mb-4">
              <Card className="value-card">
                <div className="icon-circle">
                  <FaRocket />
                </div>
                <Card.Body>
                  <Card.Title>Innovation</Card.Title>
                  <Card.Text>
                    Continuously seeking the latest technological advancements to bring cutting-edge products to our customers.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3} className="mb-4">
              <Card className="value-card">
                <div className="icon-circle">
                  <FaLightbulb />
                </div>
                <Card.Body>
                  <Card.Title>Quality</Card.Title>
                  <Card.Text>
                    Rigorous testing and careful curation ensure that every product meets our high standards of excellence.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3} className="mb-4">
              <Card className="value-card">
                <div className="icon-circle">
                  <FaUsers />
                </div>
                <Card.Body>
                  <Card.Title>Community</Card.Title>
                  <Card.Text>
                    Building a passionate community of tech enthusiasts who share our love for innovation and gadgetry.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3} className="mb-4">
              <Card className="value-card">
                <div className="icon-circle">
                  <FaHandshake />
                </div>
                <Card.Body>
                  <Card.Title>Trust</Card.Title>
                  <Card.Text>
                    Creating lasting relationships with our customers through honest communications and reliable service.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Team Section */}
      <Container className="team-section">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="section-title">Meet Our Team</h2>
            <div className="title-line mx-auto"></div>
            <p className="team-intro">
              The passionate individuals behind Gadget Grotto who work tirelessly to bring you the best tech shopping experience.
            </p>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg={3} md={6} className="mb-4 text-center">
            <div className="team-member">
              <div className="member-image member-1 mx-auto"></div>
              <h3>Mushtaq Ahmad</h3>
              <p className="member-role">Founder & CEO</p>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-4 text-center">
            <div className="team-member">
              <div className="member-image member-2 mx-auto"></div>
              <h3>Muthaar Ahmad</h3>
              <p className="member-role">Product Curator</p>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-4 text-center">
            <div className="team-member">
              <div className="member-image member-3 mx-auto"></div>
              <h3>Shahab Hussain</h3>
              
              <p className="member-role">Tech Expert</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Future Vision */}
      <div className="vision-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={8} className="mx-auto text-center">
              <h2 className="section-title">Our Vision for the Future</h2>
              <div className="title-line mx-auto"></div>
              <p className="vision-text">
                At Gadget Grotto, we envision a future where technology enhances everyday life in meaningful ways. We aim to be at the forefront of this evolution, bringing you tomorrow's innovations today. Our commitment to sustainability, ethical sourcing, and digital inclusion will drive our growth as we continue to expand our tech ecosystem.
              </p>
              <div className="vision-cta">
                <a href="/contactus" className="vision-button">Get In Touch</a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Aboutus;
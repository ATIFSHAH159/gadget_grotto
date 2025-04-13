import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedinIn, faInstagram, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../Assets/Css/Footer.css';
import Logo from '../Assets/Images/logo.png';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        {/* Left Section: Company Info */}
        <div className="footer-logo">
          <div className="logoContainer1">
            <img src={Logo} alt="logo" />
            <h2>GADGET GROTTO</h2>
          </div>
          <p>
            Your one-stop destination for premium tech gadgets and accessories. Discover the latest and greatest in technology at Gadget Grotto.
          </p>
          <div className="social-icons1">
            <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
            <a href="#"><FontAwesomeIcon icon={faEnvelope} /></a>
          </div>
        </div>

        {/* Middle Section: Products */}
        <div className="footer-services">
          <h3>Products</h3>
          <ul>
            <li><Link to="/products/Powerbanks">Power Banks</Link></li>
            <li><Link to="/products/Bluetooth_speakers">Bluetooth Speakers</Link></li>
            <li><Link to="/products/Fitness_Bands">Fitness Bands</Link></li>
            <li><Link to="/products/Phone_Cases & Covers">Phone Cases</Link></li>
            <li><Link to="/products/Gaming_Headsets">Gaming Headsets</Link></li>
            <li><Link to="/products/Earbuds">Earbuds</Link></li>
          </ul>
        </div>

        {/* Right Section: Company */}
        <div className="footer-company">
          <h3>Company</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/addtocart">Cart</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section: Copyright and Links */}
      <div className="footer-bottom">
        <p>Copyright © 2024 Gadget Grotto, All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Terms of Use</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
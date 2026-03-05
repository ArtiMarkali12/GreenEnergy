import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Column 1 */}
        <div className="footer-col">
          <h2 className="footer-logo">🌱 GreenEnergy</h2>
          <p>
            Powering tomorrow with sustainable and renewable energy solutions.
            Building a greener future for everyone.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>Email: info@greenenergy.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Nagpur, Maharashtra</p>
        </div>

      </div>

      {/* Bottom Bar */}
      {/* <div className="footer-bottom">
        © {new Date().getFullYear()} GreenEnergy. All Rights Reserved.
      </div> */}
    </footer>
  );
}
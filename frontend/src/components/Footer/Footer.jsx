import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-brand-title">TECHSTORE</div>
          <p className="footer-brand-description">
            Curating beautiful, functional tech products for your space. Quality craftsmanship meets timeless design.
          </p>
        </div>

        {/* Shop Section */}
        <div className="footer-section">
          <h4 className="footer-section-title">Shop</h4>
          <ul className="footer-links">
            <li>
              <Link to="/productos" className="footer-link">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=electronics" className="footer-link">
                Electronics
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=accessories" className="footer-link">
                Accessories
              </Link>
            </li>
            <li>
              <Link to="/productos?categoria=deals" className="footer-link">
                Deals
              </Link>
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div className="footer-section">
          <h4 className="footer-section-title">About</h4>
          <ul className="footer-links">
            <li>
              <Link to="#" className="footer-link">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Sustainability
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Careers
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Press
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h4 className="footer-section-title">Support</h4>
          <ul className="footer-links">
            <li>
              <Link to="#" className="footer-link">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="#" className="footer-link">
                Returns
              </Link>
            </li>
          </ul>
        </div>

        {/* Copyright Section */}
        <div className="footer-copyright">
          © 2025 TECHSTORE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

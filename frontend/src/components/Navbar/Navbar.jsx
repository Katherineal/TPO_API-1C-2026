import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartItemCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">⚡</span>
          <span className="logo-text">TechStore</span>
        </Link>

        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/productos" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={closeMenu}
              >
                Productos
              </NavLink>
            </li>
          </ul>

          {/* Actions */}
          <div className="navbar-actions">
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? 'nav-link login-link active' : 'nav-link login-link'}
              onClick={closeMenu}
            >
              Login
            </NavLink>

            <NavLink 
              to="/carrito" 
              className={({ isActive }) => isActive ? 'cart-link active' : 'cart-link'}
              onClick={closeMenu}
            >
              <span className="cart-text">Carrito</span>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
              )}
            </NavLink>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        <div 
          className={`navbar-overlay ${isMenuOpen ? 'active' : ''}`} 
          onClick={closeMenu}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;

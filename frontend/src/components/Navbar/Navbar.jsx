import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/authSlice';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = ({ cartItemCount = 0 }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const role = user?.role;
  const email = user?.email;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const closeProfileMenu = () => {
    setIsProfileOpen(false);
  };

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
    closeAllMenus();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logotipo */}
        <Link to="/" className="navbar-logo" onClick={closeAllMenus}>
          <span className="logo-text">TechStore</span>
        </Link>

        {/* Navegación de Escritorio */}
        <div className="navbar-links-desktop">
          <NavLink
            to="/"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/productos"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Productos
          </NavLink>
          {role === 'ADMIN' && (
            <NavLink
              to="/admin"
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              Admin
            </NavLink>
          )}
        </div>

        {/* Acciones de la Derecha */}
        <div className="navbar-actions">
          {/* Desktop: Favorites Icon */}
          {isAuthenticated && (
            <NavLink
              to="/favoritos"
              className={({ isActive }) => `action-btn favorites-btn ${isActive ? 'active' : ''}`}
              title="Ver favoritos"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </NavLink>
          )}

          {/* Desktop: Cart Icon */}
          {isAuthenticated && (
            <NavLink
              to="/carrito"
              className={({ isActive }) => `action-btn cart-btn ${isActive ? 'active' : ''}`}
              title="Ver carrito"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              {cartItemCount > 0 && (
                <span className="cart-badge">{cartItemCount > 99 ? '99+' : cartItemCount}</span>
              )}
            </NavLink>
          )}

          {/* Desktop: User Menu / Login */}
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className={({ isActive }) => `action-btn login-btn ${isActive ? 'active' : ''}`}
            >
              Iniciar sesión
            </NavLink>
          ) : (
            <div className="user-menu-desktop">
              <button
                className="action-btn user-btn"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                title="Abrir menú de perfil"
                aria-label="Menú de perfil"
                aria-expanded={isProfileOpen}
              >
                <svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="1.5"
  strokeLinecap="round"
  strokeLinejoin="round"
>
  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
  <circle cx="12" cy="7" r="4"/>
</svg>
              </button>

              {isProfileOpen && (
                <div className="user-dropdown">
                  <div className="dropdown-header">{email}</div>

                  <Link
                    to="/perfil"
                    className="dropdown-item"
                    onClick={closeProfileMenu}
                  >
                    Mi perfil
                  </Link>

                  {role === 'ADMIN' && (
                    <Link
                      to="/admin"
                      className="dropdown-item"
                      onClick={closeProfileMenu}
                    >
                      Panel administrador
                    </Link>
                  )}

                  <button
                    className="dropdown-item logout-item"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Toggle Claro/Oscuro */}
          <button
            className="action-btn theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
            aria-label="Cambiar tema"
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>

          {/* Alternador de Menú Móvil */}
          <button
            className={`mobile-menu-btn ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="menu-line"></span>
            <span className="menu-line"></span>
            <span className="menu-line"></span>
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <NavLink
              to="/"
              className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Inicio
            </NavLink>

            <NavLink
              to="/productos"
              className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Productos
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink
                  to="/favoritos"
                  className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Favoritos
                </NavLink>

                <NavLink
                  to="/carrito"
                  className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Carrito
                </NavLink>

                <div className="mobile-menu-divider"></div>
              </>
            )}

            {isAuthenticated && (
              <>
                <NavLink
                  to="/perfil"
                  className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Mi perfil
                </NavLink>

                {role === 'ADMIN' && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                    onClick={closeMobileMenu}
                  >
                    Panel administrador
                  </NavLink>
                )}

                <button className="mobile-link logout-mobile" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            )}

            {!isAuthenticated && (
              <NavLink
                to="/login"
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                onClick={closeMobileMenu}
              >
                Iniciar sesión
              </NavLink>
            )}


          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

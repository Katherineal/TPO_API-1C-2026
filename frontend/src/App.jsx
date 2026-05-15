import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Importaremos los componentes en los próximos pasos
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProductCatalog from './components/catalog/ProductCatalog';
import AdminPanel from './components/admin/AdminPanel';

function Navigation({ token, setToken }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to="/" className="brand">E-Commerce</Link>
        <div className="nav-links">
          <Link to="/">Catálogo</Link>
          {token ? (
            <>
              <Link to="/admin">Panel Admin</Link>
              <button onClick={handleLogout} className="btn btn-outline">Cerrar Sesión</button>
            </>
          ) : (
            <>
              <Link to="/login">Ingresar</Link>
              <Link to="/register" className="btn btn-primary">Registro</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Sincronizamos si el token cambia en localStorage (opcional, pero útil)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navigation token={token} setToken={setToken} />
        
        <main className="main-content container">
          <Routes>
            <Route path="/" element={<ProductCatalog />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={
              token ? <AdminPanel /> : <Login setToken={setToken} />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

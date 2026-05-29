import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './Auth.css';

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // El backend mapea el login a /api/auth/login
      const response = await api.post('/auth/login', formData);
      
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        setToken(response.token);
        navigate('/'); // Redirigir al inicio o panel admin
      } else {
        throw new Error('No se recibió un token válido.');
      }
    } catch (err) {
      setError(err.message || 'Error de credenciales');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container card">
      <h2 className="page-title">Iniciar Sesión</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        <input 
          type="email" 
          name="email"
          placeholder="Correo Electrónico" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <input 
          type="password" 
          name="password"
          placeholder="Contraseña" 
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}

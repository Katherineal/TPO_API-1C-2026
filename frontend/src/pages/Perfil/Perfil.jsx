import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import API from '../../services/api';
import './perfil.css';

function Perfil() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('email');

  // Estados del formulario de datos personales
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: userEmail || '',
  });

  // Estados del formulario de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Proteger la ruta: Si no hay token, redirigir a Login inmediatamente
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [token]);

  // Simulación u obtención de los datos actuales del usuario desde el backend
  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      // Asumiendo un endpoint que devuelva los datos del usuario autenticado
      const response = await API.get('/api/usuarios/me');
      if (response.data) {
        setFormData({
          nombre: response.data.nombre || '',
          apellido: response.data.apellido || '',
          email: response.data.email || userEmail || '',
        });
      }
    } catch (error) {
      console.log('Error al cargar datos de perfil, usando datos locales:', error);
      // Fallback por si el endpoint aún no está listo en el backend de la facu
      setFormData(prev => ({
        ...prev,
        nombre: 'Usuario',
        apellido: 'TechStore',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar cambios en campos de datos personales
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Manejar cambios en campos de contraseña
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Guardar Cambios del Perfil (Nombre, Apellido, Email)
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    
    // Validación básica
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setIsLoading(true);
      // Petición PUT al backend con el token ya inyectado por el interceptor
      await API.put('/api/usuarios/update', formData);
      
      // Actualizamos el email local en caso de que lo haya cambiado
      localStorage.setItem('email', formData.email);
      setSuccessMessage('Datos personales actualizados correctamente.');
    } catch (error) {
      console.error(error);
      setErrors({ general: error.response?.data || 'Error al actualizar el perfil' });
    } finally {
      setIsLoading(false);
    }
  };

  // Cambiar Contraseña
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const passErrors = {};
    if (!passwordData.currentPassword) passErrors.currentPassword = 'Falta contraseña actual';
    if (!passwordData.newPassword) {
      passErrors.newPassword = 'La nueva contraseña es requerida';
    } else if (passwordData.newPassword.length < 6) {
      passErrors.newPassword = 'Mínimo 6 caracteres';
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      passErrors.confirmNewPassword = 'Las contraseñas nuevas no coinciden';
    }

    if (Object.keys(passErrors).length > 0) {
      setErrors(passErrors);
      return;
    }

    try {
      setIsLoading(true);
      await API.put('/api/usuarios/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setSuccessMessage('Contraseña cambiada con éxito.');
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error) {
      console.error(error);
      setErrors({ passGeneral: error.response?.data || 'Error al cambiar la contraseña' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="perfil-page">
        <div className="perfil-container">
          
          <div className="perfil-header">
            <h1>Mi Perfil</h1>
            <p>Gestioná tus datos personales y credenciales de seguridad</p>
          </div>

          {successMessage && <div className="perfil-success">{successMessage}</div>}
          {errors.general && <div className="perfil-error">{errors.general}</div>}

          <div className="perfil-sections-grid">
            
            {/* SECCIÓN 1: DATOS PERSONALES */}
            <div className="perfil-card">
              <h2>Datos Personales</h2>
              <form onSubmit={handleUpdateProfile} className="perfil-form">
                
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleDataChange}
                      className={errors.nombre ? 'error' : ''}
                    />
                  </div>
                  {errors.nombre && <span className="error-message">{errors.nombre}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="apellido">Apellido</label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleDataChange}
                      className={errors.apellido ? 'error' : ''}
                    />
                  </div>
                  {errors.apellido && <span className="error-message">{errors.apellido}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleDataChange}
                      className={errors.email ? 'error' : ''}
                    />
                  </div>
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <button type="submit" className="btn-submit" disabled={isLoading}>
                  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </form>
            </div>

            {/* SECCIÓN 2: SEGURIDAD (CONTRASEÑA) */}
            <div className="perfil-card">
              <h2>Cambiar Contraseña</h2>
              {errors.passGeneral && <div className="perfil-error">{errors.passGeneral}</div>}
              
              <form onSubmit={handleChangePassword} className="perfil-form">
                
                <div className="form-group">
                  <label htmlFor="currentPassword">Contraseña Actual</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="currentPassword"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className={errors.currentPassword ? 'error' : ''}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.currentPassword && <span className="error-message">{errors.currentPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="newPassword">Nueva Contraseña</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="newPassword"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className={errors.newPassword ? 'error' : ''}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                  {errors.newPassword && <span className="error-message">{errors.newPassword}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmNewPassword">Confirmar Nueva Contraseña</label>
                  <div className="input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="confirmNewPassword"
                      name="confirmNewPassword"
                      value={passwordData.confirmNewPassword}
                      onChange={handlePasswordChange}
                      className={errors.confirmNewPassword ? 'error' : ''}
                      placeholder="Repetí tu nueva contraseña"
                    />
                  </div>
                  {errors.confirmNewPassword && <span className="error-message">{errors.confirmNewPassword}</span>}
                </div>

                <div className="show-pass-options">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={showPassword} 
                      onChange={() => setShowPassword(!showPassword)} 
                    />
                    <span>Mostrar contraseñas</span>
                  </label>
                </div>

                <button type="submit" className="btn-submit" disabled={isLoading}>
                  {isLoading ? 'Actualizando...' : 'Actualizar Contraseña'}
                </button>
              </form>
            </div>

          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default Perfil;
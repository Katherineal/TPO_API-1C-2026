import { useState, useEffect } from 'react';
import { api } from '../../services/api';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Suponiendo que hay un endpoint para obtener los datos del usuario actual
        // Si no existe, este es el lugar ideal para agregarlo en el futuro
        const data = await api.get('/usuarios/me');
        setUser(data);
      } catch (err) {
        setError('No se pudo cargar el perfil del usuario.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Cargando perfil...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!user) return <div>No hay datos del usuario.</div>;

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Perfil de Usuario</h2>
      <div style={{ marginTop: '1rem' }}>
        <p><strong>Nombre:</strong> {user.nombre} {user.apellido}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Rol:</strong> {user.role}</p>
      </div>
    </div>
  );
}

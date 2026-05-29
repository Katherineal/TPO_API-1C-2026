import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import './Admin.css';

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: 0,
    stock: 0,
    imagenUrl: ''
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await api.get('/productos');
      setProducts(data || []);
    } catch (err) {
      setError('Error al cargar productos en el panel de administración.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await api.delete(`/productos/${id}`);
        // Refrescamos la lista tras borrar
        fetchProducts();
      } catch (err) {
        alert(err.message || 'No se pudo eliminar el producto.');
      }
    }
  };

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ nombre: '', descripcion: '', precio: 0, stock: 0, imagenUrl: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? Number(value) : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        // Modificación (PUT)
        await api.put(`/productos/${editingProduct.id}`, formData);
      } else {
        // Alta (POST)
        await api.post('/productos', formData);
      }
      closeModal();
      fetchProducts();
    } catch (err) {
      alert(err.message || 'Ocurrió un error al guardar el producto.');
    }
  };

  if (loading && products.length === 0) return <div>Cargando Panel...</div>;

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Gestión de Productos (ABM)</h1>
        <button className="btn btn-primary" onClick={openAddModal}>
          + Nuevo Producto
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.nombre}</td>
                <td>${product.precio.toFixed(2)}</td>
                <td>{product.stock}</td>
                <td>
                  <div className="admin-actions">
                    <button className="btn btn-outline" onClick={() => openEditModal(product)}>
                      Editar
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No hay productos</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">
                {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button className="close-btn" onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleFormSubmit} className="admin-form">
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" name="nombre" value={formData.nombre} onChange={handleFormChange} required />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea name="descripcion" value={formData.descripcion} onChange={handleFormChange} required rows="3"></textarea>
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input type="number" name="precio" value={formData.precio} onChange={handleFormChange} required min="0" step="0.01" />
              </div>
              <div className="form-group">
                <label>Stock</label>
                <input type="number" name="stock" value={formData.stock} onChange={handleFormChange} required min="0" />
              </div>
              <div className="form-group">
                <label>URL de Imagen</label>
                <input type="text" name="imagenUrl" value={formData.imagenUrl} onChange={handleFormChange} placeholder="http://..." />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={closeModal} style={{ flex: 1 }}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect } from "react";

import productService from "../../services/productService";

import "./AdminDashboard.css";
import MainLayout from "../../layouts/MainLayout";

function AdminDashboard() {

    const [products, setProducts] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState("create");
    const [currentProductId, setCurrentProductId] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen_url: ""
    });
    const [isSaving, setIsSaving] = useState(false);

    // Profe: Se ejecuta al cargar la página para verificar permisos y cargar la lista de productos
    useEffect(() => {
        verificarAdmin();
        loadProducts();
    }, []);

    // Profe: Validamos que el rol guardado en localStorage sea ADMIN, sino lo mandamos al login
    const verificarAdmin = () => {
        const role = localStorage.getItem("role");
        if (role !== "ADMIN") {
            window.location.href = "/login";
        }
    };

    const loadProducts = async () => {
        try {
            const dbProducts = await productService.getAll();
            setProducts(dbProducts);
        } catch (err) {
            console.log("Error cargando productos:", err);
            setProducts([]);
        }
    };

    // Profe: Preparamos los datos del producto existente en el formulario modal para editarlo
    const handleEdit = (product) => {
        setModalMode("edit");
        setCurrentProductId(product.id);
        setFormData({
            nombre: product.nombre,
            descripcion: product.descripcion,
            precio: product.precio,
            stock: product.stock,
            imagen_url: product.imagen_url || ""
        });
        setShowModal(true);
    };

    // Profe: Función para eliminar un producto mediante su ID
    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                await productService.delete(id);
                loadProducts(); // Recargamos la tabla para que desaparezca visualmente
            } catch (err) {
                console.log(err);
                alert("Error al eliminar el producto");
            }
        }
    };

    // Profe: Esta función sirve tanto para Crear (POST) como para Actualizar (PUT) dependiendo del estado modalMode
    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const productToSave = {
                ...formData,
                precio: parseFloat(formData.precio),
                stock: parseInt(formData.stock)
            };
            
            if (modalMode === "create") {
                await productService.create(productToSave);
            } else {
                await productService.update(currentProductId, productToSave);
            }
            
            setShowModal(false);
            setFormData({ nombre: "", descripcion: "", precio: "", stock: "", imagen_url: "" });
            loadProducts();
        } catch (err) {
            console.log("Error guardando producto:", err);
            alert("No se pudo guardar el producto. Verifica la consola.");
        } finally {
            setIsSaving(false);
        }
    };

    const openCreateModal = () => {
        setModalMode("create");
        setFormData({ nombre: "", descripcion: "", precio: "", stock: "", imagen_url: "" });
        setShowModal(true);
    };

    return (
        <MainLayout>
            <div className="admin-page">

                <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1>Panel Administrador</h1>
                        <p>Gestiona productos y stock</p>
                    </div>
                    <button 
                        onClick={openCreateModal} 
                        className="save-btn"
                        style={{ padding: '12px 24px', fontSize: '1rem' }}
                    >
                        + Nuevo Producto
                    </button>
                </div>

                {/* MODAL OVERLAY */}
                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>{modalMode === 'create' ? 'Crear Nuevo Producto' : 'Editar Producto'}</h3>
                                <button onClick={() => setShowModal(false)} className="close-modal-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            <form onSubmit={handleSave} className="modal-form">
                                <div className="form-group">
                                    <label>Nombre del producto</label>
                                    <input required placeholder="Ej: AirPods Pro" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="modal-input" />
                                </div>
                                <div className="form-group">
                                    <label>Precio ($)</label>
                                    <input required type="number" step="0.01" placeholder="Ej: 249.00" value={formData.precio} onChange={e => setFormData({...formData, precio: e.target.value})} className="modal-input" />
                                </div>
                                <div className="form-group">
                                    <label>Stock Inicial</label>
                                    <input required type="number" placeholder="Ej: 50" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="modal-input" />
                                </div>
                                <div className="form-group">
                                    <label>URL de la Imagen</label>
                                    <input placeholder="https://unsplash.com/..." value={formData.imagen_url} onChange={e => setFormData({...formData, imagen_url: e.target.value})} className="modal-input" />
                                </div>
                                <div className="form-group full-width">
                                    <label>Descripción breve</label>
                                    <textarea required placeholder="Características principales del producto..." value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} className="modal-input modal-textarea" />
                                </div>
                                <button disabled={isSaving} type="submit" className="save-btn full-width" style={{ padding: '16px', fontSize: '1rem', marginTop: '10px' }}>
                                    {isSaving ? 'Guardando...' : (modalMode === 'create' ? 'Guardar Producto' : 'Actualizar Producto')}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <table className="products-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Producto</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => {
                            let stockStatus = 'in-stock';
                            if (product.stock === 0) {
                                stockStatus = 'out-of-stock';
                            } else if (product.stock <= 5) {
                                stockStatus = 'low-stock';
                            }

                            return (
                                <tr key={`${product.id}-${index}`}>
                                    <td className="id-cell">{product.id}</td>
                                    <td className="product-cell">
                                        <img src={product.imagen_url || "https://placehold.co/100"} alt={product.nombre} />
                                        <span>{product.nombre}</span>
                                    </td>
                                    <td className="price-cell" data-label="Precio">${product.precio}</td>
                                    <td className="stock-cell" data-label="Stock">
                                        <span className="stock-value">{product.stock}</span>
                                    </td>
                                    <td data-label="Estado" className="no-label">
                                        <span className={`status-badge ${stockStatus}`}>
                                            {stockStatus === 'in-stock' && 'En stock'}
                                            {stockStatus === 'low-stock' && 'Stock bajo'}
                                            {stockStatus === 'out-of-stock' && 'Agotado'}
                                        </span>
                                    </td>
                                    <td className="action-buttons no-label" data-label="Acciones">
                                        <button className="edit-btn" onClick={() => handleEdit(product)}>
                                            Editar
                                        </button>
                                        <button className="cancel-btn" style={{ marginLeft: '10px' }} onClick={() => handleDelete(product.id)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
}

export default AdminDashboard;

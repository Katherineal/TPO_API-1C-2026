import { useState, useEffect } from "react";

import productService
    from "../../services/productService";

import "./AdminDashboard.css";
import MainLayout from "../../layouts/MainLayout";

function AdminDashboard() {

    const [products, setProducts] =
        useState([]);

    const [editingId, setEditingId] =
        useState(null);

    const [stock, setStock] =
        useState("");

    // --- NUEVOS ESTADOS PARA CREAR PRODUCTO ---
    const [categorias, setCategorias] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen_url: "",
        categorias: []
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        verificarAdmin();
        loadCategorias();
        loadProducts();
    }, []);

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

    const loadCategorias = async () => {

    try {

        const response = await fetch(
            "http://localhost:8080/api/categorias"
        );

        if (!response.ok) {
            throw new Error("Error cargando categorías");
        }

        const data = await response.json();

        setCategorias(data);

    } catch (error) {

        console.error(error);
    }
};

    const handleEdit = (product) => {
        setEditingId(product.id);
        setStock(product.stock);
    };

    const handleSave = async (id) => {
        try {
            await productService.updateStock(id, stock);
            setEditingId(null);
            loadProducts();
        } catch (err) {
            console.log(err);
        }
    };

    // --- LOGICA PARA ELIMINAR PRODUCTO ---
    const handleDelete = async (id) => {
        const confirmar = window.confirm("¿Seguro que querés eliminar este producto? Esta acción no se puede deshacer.");
        if (!confirmar) return;

        try {
            await productService.delete(id);
            loadProducts(); // Recargar la tabla
        } catch (err) {
            console.log("Error eliminando producto:", err);
            alert("No se pudo eliminar el producto. ¿Iniciaste sesión como ADMIN?");
        }
    };

    // --- LOGICA PARA GUARDAR PRODUCTO NUEVO ---
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const productToSave = {
                nombre: newProduct.nombre,
                descripcion: newProduct.descripcion,
                precio: parseFloat(newProduct.precio),
                stock: parseInt(newProduct.stock),
                imagen_url: newProduct.imagenUrl,
                categorias: newProduct.categorias
            };
            await productService.create(productToSave);
            setShowAddForm(false);
            setNewProduct({ nombre: "", descripcion: "", precio: "", stock: "", imagen_url: "" });
            loadProducts(); // Recargar la tabla
        } catch (err) {
            console.log("Error creando producto:", err);
            alert("No se pudo crear el producto. ¿Iniciaste sesión como ADMIN?");
        } finally {
            setIsSaving(false);
        }
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
                        onClick={() => setShowAddForm(true)} 
                        className="save-btn"
                        style={{ padding: '12px 24px', fontSize: '1rem' }}
                    >
                        + Nuevo Producto
                    </button>
                </div>

                {/* MODAL OVERLAY */}
                {showAddForm && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Crear Nuevo Producto</h3>
                                <button onClick={() => setShowAddForm(false)} className="close-modal-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                            <form onSubmit={handleAddProduct} className="modal-form">
                                <div className="form-group">
                                    <label>Nombre del producto</label>
                                    <input required placeholder="Ej: AirPods Pro" value={newProduct.nombre} onChange={e => setNewProduct({...newProduct, nombre: e.target.value})} className="modal-input" />
                                </div>
                                <div className="form-group">
                                    <label>Precio ($)</label>
                                    <input required type="number" step="0.01" placeholder="Ej: 249.00" value={newProduct.precio} onChange={e => setNewProduct({...newProduct, precio: e.target.value})} className="modal-input" />
                                </div>
                                <div className="form-group">
                                    <label>Stock Inicial</label>
                                    <input required type="number" placeholder="Ej: 50" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: e.target.value})} className="modal-input" />
                                </div>
                                <div className="form-group">
                                    <label>URL de la Imagen</label>
                                    <input placeholder="https://unsplash.com/..." value={newProduct.imagen_url} onChange={e => setNewProduct({...newProduct, imagen_url: e.target.value})} className="modal-input" />
                                </div>
                                <div className="form-group full-width">
                                    <label>Categorías</label>

                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "10px",
                                        marginTop: "10px"
                                    }}>
                                        {categorias.map((categoria) => (
                                            <label
                                                key={categoria.id}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "5px"
                                                }}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        newProduct.categorias.some(
                                                            c => c.id === categoria.id
                                                        )
                                                    }
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setNewProduct({
                                                                ...newProduct,
                                                                categorias: [
                                                                    ...newProduct.categorias,
                                                                    { id: categoria.id }
                                                                ]
                                                            });

                                                        } else {

                                                            setNewProduct({
                                                                ...newProduct,
                                                                categorias:
                                                                    newProduct.categorias.filter(
                                                                        c => c.id !== categoria.id
                                                                    )
                                                            });
                                                        }
                                                    }}
                                                />

                                                {categoria.nombre}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div className="form-group full-width">
                                    <label>Descripción breve</label>
                                    <textarea required placeholder="Características principales del producto..." value={newProduct.descripcion} onChange={e => setNewProduct({...newProduct, descripcion: e.target.value})} className="modal-input modal-textarea" />
                                </div>
                                <button disabled={isSaving} type="submit" className="save-btn full-width" style={{ padding: '16px', fontSize: '1rem', marginTop: '10px' }}>
                                    {isSaving ? 'Guardando...' : 'Guardar Producto'}
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
                        {products.map((product) => {
                            let stockStatus = 'in-stock';
                            if (product.stock === 0) {
                                stockStatus = 'out-of-stock';
                            } else if (product.stock <= 5) {
                                stockStatus = 'low-stock';
                            }

                            return (
                                <tr key={product.id}>
                                    <td className="id-cell">{product.id}</td>
                                    <td className="product-cell">
                                        <img src={product.imagen_url || "https://placehold.co/100"} alt={product.nombre} />
                                        <span>{product.nombre}</span>
                                    </td>
                                    <td className="price-cell" data-label="Precio">${product.precio}</td>
                                    <td className="stock-cell" data-label="Stock">
                                        {editingId === product.id ? (
                                            <input
                                                type="number"
                                                className="stock-input"
                                                value={stock}
                                                onChange={(e) => setStock(e.target.value)}
                                            />
                                        ) : (
                                            <span className="stock-value">{product.stock}</span>
                                        )}
                                    </td>
                                    <td data-label="Estado" className="no-label">
                                        <span className={`status-badge ${stockStatus}`}>
                                            {stockStatus === 'in-stock' && 'En stock'}
                                            {stockStatus === 'low-stock' && 'Stock bajo'}
                                            {stockStatus === 'out-of-stock' && 'Agotado'}
                                        </span>
                                    </td>
                                    <td className="action-buttons no-label" data-label="Acciones">
                                        {editingId === product.id ? (
                                            <>
                                                <button className="save-btn" onClick={() => handleSave(product.id)}>
                                                    Guardar
                                                </button>
                                                <button className="cancel-btn" onClick={() => setEditingId(null)}>
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="edit-btn" onClick={() => handleEdit(product)}>
                                                    Editar
                                                </button>
                                                <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
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
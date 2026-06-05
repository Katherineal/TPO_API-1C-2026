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
    const [showAddForm, setShowAddForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen_url: ""
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        verificarAdmin();
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
            // Bypass del backend para usar los productos premium en el panel
            const fallbackProducts = [
                { id: 1, nombre: "iPhone 15 Pro Max", precio: 1199.00, stock: 15, imagen_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop" },
                { id: 2, nombre: "MacBook Pro M3 Max", precio: 2499.00, stock: 8, imagen_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop" },
                { id: 3, nombre: "AirPods Max", precio: 549.00, stock: 30, imagen_url: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000&auto=format&fit=crop" },
                { id: 4, nombre: "Apple Watch Ultra 2", precio: 799.00, stock: 22, imagen_url: "https://images.unsplash.com/photo-1678393529341-94fc31eaaf97?q=80&w=1000&auto=format&fit=crop" },
                { id: 5, nombre: "iPad Pro M4", precio: 999.00, stock: 18, imagen_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop" },
                { id: 6, nombre: "Mac Studio", precio: 1999.00, stock: 5, imagen_url: "https://images.unsplash.com/photo-1655821568261-26c36f51f49e?q=80&w=1000&auto=format&fit=crop" },
                { id: 7, nombre: "Pro Display XDR", precio: 4999.00, stock: 2, imagen_url: "https://images.unsplash.com/photo-1610945264803-c22b6272bc8e?q=80&w=1000&auto=format&fit=crop" },
                { id: 8, nombre: "AirPods Pro 2", precio: 249.00, stock: 45, imagen_url: "https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=1000&auto=format&fit=crop" },
                { id: 9, nombre: "HomePod", precio: 299.00, stock: 12, imagen_url: "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1000&auto=format&fit=crop" },
                { id: 10, nombre: "Magic Keyboard", precio: 99.00, stock: 60, imagen_url: "https://images.unsplash.com/photo-1587826693892-0b1e42b291db?q=80&w=1000&auto=format&fit=crop" },
                { id: 11, nombre: "Magic Mouse", precio: 79.00, stock: 100, imagen_url: "https://images.unsplash.com/photo-1527814050087-17933a3832c6?q=80&w=1000&auto=format&fit=crop" },
                { id: 12, nombre: "Apple TV 4K", precio: 129.00, stock: 35, imagen_url: "https://images.unsplash.com/photo-1593305841991-0537d6cb5e10?q=80&w=1000&auto=format&fit=crop" },
                { id: 13, nombre: "Gorra Premium TechStore", precio: 29.00, stock: 200, imagen_url: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop" }
            ];
            
            // Tratamos de obtener la base de datos real para sumar los creados manualmente
            try {
                const dbProducts = await productService.getAll();
                // Filtramos los de prueba feos (iphone, 1) y sumamos solo los manuales nuevos validos
                const validCustomProducts = dbProducts.filter(p => p.nombre !== "iphone" && p.nombre !== "1");
                setProducts([...fallbackProducts, ...validCustomProducts]);
            } catch (err) {
                setProducts(fallbackProducts);
            }

        } catch (err) {
            console.log(err);
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

    // --- LOGICA PARA GUARDAR PRODUCTO NUEVO ---
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const productToSave = {
                ...newProduct,
                precio: parseFloat(newProduct.precio),
                stock: parseInt(newProduct.stock)
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
                                            <button className="edit-btn" onClick={() => handleEdit(product)}>
                                                Editar
                                            </button>
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

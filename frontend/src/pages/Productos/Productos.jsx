import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import ProductCard from "../../components/ProductCard/ProductCard";
import productService from "../../services/productService";

import "./Productos.css";

const CATEGORIES = ["Laptops", "Smartphones", "Audio Premium", "Smartwatches", "Accesorios"];

function Productos() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoria") || ""
  );
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("default");

  // Si se navega desde CategoryCarousel, leer el query param
  useEffect(() => {
    const cat = searchParams.get("categoria") || "";
    setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll();
      setProducts(data);
    } catch (err) {
      setError("No se pudieron cargar los productos. " + err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Lógica de filtrado y orden (todo en cliente)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Búsqueda por nombre
    if (searchText.trim()) {
      const q = searchText.trim().toLowerCase();
      result = result.filter((p) =>
        (p.nombre || p.name || "").toLowerCase().includes(q)
      );
    }

    // Filtro por categoría
    if (selectedCategory) {
      result = result.filter((p) =>
          p.categorias?.some(
              (categoria) =>
              categoria.nombre.toLowerCase() ===
              selectedCategory.toLowerCase()
          )
        );
    }

    // Filtro por precio mínimo
    if (priceRange.min !== "") {
      result = result.filter(
        (p) => Number(p.precio ?? p.price ?? 0) >= Number(priceRange.min)
      );
    }

    // Filtro por precio máximo
    if (priceRange.max !== "") {
      result = result.filter(
        (p) => Number(p.precio ?? p.price ?? 0) <= Number(priceRange.max)
      );
    }

    // Orden
    if (sortBy === "price-asc") {
      result.sort(
        (a, b) => Number(a.precio ?? a.price ?? 0) - Number(b.precio ?? b.price ?? 0)
      );
    } else if (sortBy === "price-desc") {
      result.sort(
        (a, b) => Number(b.precio ?? b.price ?? 0) - Number(a.precio ?? a.price ?? 0)
      );
    } else if (sortBy === "name-asc") {
      result.sort((a, b) =>
        (a.nombre || a.name || "").localeCompare(b.nombre || b.name || "")
      );
    }

    return result;
  }, [products, searchText, selectedCategory, priceRange, sortBy]);

  const handleCategorySelect = (cat) => {
    const next = cat === selectedCategory ? "" : cat;
    setSelectedCategory(next);
    // Sincronizar query param
    if (next) {
      setSearchParams({ categoria: next });
    } else {
      setSearchParams({});
    }
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    setSortBy("default");
    setSearchParams({});
  };

  const hasActiveFilters =
    searchText || selectedCategory || priceRange.min || priceRange.max || sortBy !== "default";

  return (
    <MainLayout>
      <div className="productos-page">

        {/* ===== PANEL DE FILTROS ===== */}
        <div className="productos-filters-header">

          {/* Búsqueda por nombre */}
          <div className="filter-section">
            <h3>Buscar</h3>
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar productos..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>

          {/* Rango de precio */}
          <div className="filter-section">
            <h3>Precio</h3>
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              <input
                type="number"
                className="search-input"
                placeholder="Mín"
                value={priceRange.min}
                onChange={(e) => setPriceRange((p) => ({ ...p, min: e.target.value }))}
                style={{ fontSize: "0.95rem" }}
                min="0"
              />
              <span style={{ color: "#ccc", fontWeight: 300 }}>—</span>
              <input
                type="number"
                className="search-input"
                placeholder="Máx"
                value={priceRange.max}
                onChange={(e) => setPriceRange((p) => ({ ...p, max: e.target.value }))}
                style={{ fontSize: "0.95rem" }}
                min="0"
              />
            </div>
          </div>

          {/* Orden */}
          <div className="filter-section">
            <h3>Ordenar</h3>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="name-asc">Nombre A–Z</option>
            </select>
          </div>
        </div>

        {/* ===== CATEGORÍAS ===== */}
        <div className="filter-section" style={{ marginBottom: "2rem" }}>
          <ul className="category-list">
            {CATEGORIES.map((cat) => (
              <li key={cat}>
                <button
                  className={`category-btn${selectedCategory === cat ? " active" : ""}`}
                  onClick={() => handleCategorySelect(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== TOOLBAR ===== */}
        <div className="productos-toolbar">
          <span className="productos-count">
            {loading ? "Cargando..." : `${filteredProducts.length} producto${filteredProducts.length !== 1 ? "s" : ""}`}
          </span>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              style={{
                background: "none",
                border: "none",
                fontSize: "0.82rem",
                color: "#888",
                cursor: "pointer",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                letterSpacing: "0.5px",
              }}
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* ===== ESTADOS ===== */}
        {loading && <p>Cargando productos...</p>}
        {error && <p>{error}</p>}

        {/* ===== GRID ===== */}
        {!loading && !error && (
          <div className="productos-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <h3>Sin resultados</h3>
                <p>No encontramos productos con los filtros aplicados.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Productos;
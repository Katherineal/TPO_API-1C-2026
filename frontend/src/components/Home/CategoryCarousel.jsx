import { useNavigate } from 'react-router-dom';
import './CategoryCarousel.css';

export function CategoryCarousel() {
  const navigate = useNavigate();

  const categories = [
    { 
      name: "Laptops", 
      value: "Laptops",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" width="48" height="48">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
      ),
    },
    { 
      name: "Smartphones", 
      value: "Smartphones",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" width="48" height="48">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
      ),
    },
    { 
      name: "Audio Premium", 
      value: "Audio Premium",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      ),
    },
    { 
      name: "Smartwatches", 
      value: "Smartwatches",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
          <rect x="6" y="6" width="12" height="12" rx="3"></rect>
          <path d="M8 6v-2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <path d="M8 18v2a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2"></path>
        </svg>
      ),
    },
    { 
      name: "Accesorios", 
      value: "Accesorios",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" width="48" height="48">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
        </svg>
      ),
    }
  ];

  const handleCategoryClick = (categoryValue) => {
    navigate(`/productos?categoria=${encodeURIComponent(categoryValue)}`);
  };

  return (
    <section className="category-carousel">
      <div className="category-header">
        <h3>Explorar por Categoría</h3>
      </div>
      <div className="category-grid">
        {categories.map((cat, index) => (
          <button
            key={index}
            className="category-card"
            onClick={() => handleCategoryClick(cat.value)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'center' }}
          >
            <div className="category-icon" style={{ color: 'var(--text-primary)' }}>{cat.icon}</div>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

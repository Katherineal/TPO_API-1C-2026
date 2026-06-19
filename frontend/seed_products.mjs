import axios from "axios";

const API_URL = "http://localhost:8080/api/productos";

const products = [
    {
      nombre: "iPhone 15 Pro Max",
      descripcion: "Titanio forjado. Chip A17 Pro. La cámara más avanzada. Un salto gigantesco en Apple.",
      precio: 1199.00,
      stock: 15,
      imagen_url: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "MacBook Pro M3 Max",
      descripcion: "Potencia descomunal. Batería que dura todo el día. La laptop más profesional del mundo.",
      precio: 2499.00,
      stock: 8,
      imagen_url: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "AirPods Max",
      descripcion: "Audio espacial personalizado con seguimiento dinámico. Cancelación activa de ruido.",
      precio: 549.00,
      stock: 30,
      imagen_url: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "Apple Watch Ultra 2",
      descripcion: "Diseñado para la aventura. GPS de precisión de doble frecuencia. Caja de titanio.",
      precio: 799.00,
      stock: 22,
      imagen_url: "https://images.unsplash.com/photo-1678393529341-94fc31eaaf97?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "iPad Pro M4",
      descripcion: "Increíblemente delgado. Pantalla Ultra Retina XDR. Rendimiento desbordante.",
      precio: 999.00,
      stock: 18,
      imagen_url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "Mac Studio",
      descripcion: "Potencia asombrosa. M2 Ultra. Todo un estudio creativo en tu escritorio.",
      precio: 1999.00,
      stock: 5,
      imagen_url: "https://images.unsplash.com/photo-1655821568261-26c36f51f49e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "Pro Display XDR",
      descripcion: "Pantalla Retina 6K de 32 pulgadas. Un rango dinámico extremo nunca visto.",
      precio: 4999.00,
      stock: 2,
      imagen_url: "https://images.unsplash.com/photo-1610945264803-c22b6272bc8e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "AirPods Pro 2",
      descripcion: "Cancelación Activa de Ruido el doble de potente. Ajuste adaptable perfecto.",
      precio: 249.00,
      stock: 45,
      imagen_url: "https://images.unsplash.com/photo-1606220838315-056192d5e927?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "HomePod",
      descripcion: "Audio computacional avanzado. Acústica deslumbrante que llena tu habitación.",
      precio: 299.00,
      stock: 12,
      imagen_url: "https://images.unsplash.com/photo-1543512214-318c7553f230?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "Magic Keyboard",
      descripcion: "Escritura increíblemente cómoda y precisa. Diseño inalámbrico y recargable.",
      precio: 99.00,
      stock: 60,
      imagen_url: "https://images.unsplash.com/photo-1587826693892-0b1e42b291db?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "Magic Mouse",
      descripcion: "Superficie Multi-Touch. Se desliza a la perfección sobre tu escritorio.",
      precio: 79.00,
      stock: 100,
      imagen_url: "https://images.unsplash.com/photo-1527814050087-17933a3832c6?q=80&w=1000&auto=format&fit=crop"
    },
    {
      nombre: "Apple TV 4K",
      descripcion: "La mejor televisión y lo mejor de Apple. Experiencia de cine en tu hogar.",
      precio: 129.00,
      stock: 35,
      imagen_url: "https://images.unsplash.com/photo-1593305841991-0537d6cb5e10?q=80&w=1000&auto=format&fit=crop"
    }
  ];

async function seed() {
    try {
        console.log("Logging in as admin...");
        const loginRes = await axios.post("http://localhost:8080/api/auth/login", {
            email: "adminseed@uade.edu.ar",
            password: "password123"
        });
        const token = loginRes.data.token;
        console.log("Logged in!");

        console.log("Seeding products to backend...");
        for (const product of products) {
            try {
                await axios.post(API_URL, product, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log(`Created: ${product.nombre}`);
            } catch (err) {
                console.error(`Error creating ${product.nombre}:`, err.response?.data || err.message);
            }
        }
        console.log("Seed finished!");
    } catch (e) {
        console.error("Login failed or error:", e.response?.data || e.message);
    }
}

seed();

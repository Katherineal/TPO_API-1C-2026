import http from 'http';

const products = [
  {
    nombre: "iPhone 15 Pro Max",
    descripcion: "Titanio forjado. Chip A17 Pro. La cámara más avanzada. Un salto gigantesco en Apple.",
    precio: 1199.00,
    stock: 15,
    imagenUrl: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop"
  },
  {
    nombre: "MacBook Pro M3 Max",
    descripcion: "Potencia descomunal. Batería que dura todo el día. La laptop más profesional del mundo.",
    precio: 2499.00,
    stock: 8,
    imagenUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1926&auto=format&fit=crop"
  },
  {
    nombre: "AirPods Max",
    descripcion: "Audio espacial personalizado con seguimiento dinámico. Cancelación activa de ruido.",
    precio: 549.00,
    stock: 30,
    imagenUrl: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    nombre: "Apple Watch Ultra 2",
    descripcion: "Diseñado para la aventura. GPS de precisión de doble frecuencia. Caja de titanio.",
    precio: 799.00,
    stock: 22,
    imagenUrl: "https://images.unsplash.com/photo-1678393529341-94fc31eaaf97?q=80&w=1964&auto=format&fit=crop"
  }
];

const postProduct = (product, token) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(product);
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: '/api/productos',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log(`Status: ${res.statusCode} for ${product.nombre}`);
        resolve();
      });
    });

    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
};

const authReq = (path, payload) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch(e) {
          resolve({});
        }
      });
    });
    req.on('error', (e) => reject(e));
    req.write(data);
    req.end();
  });
};

async function seed() {
  const credentials = { nombre: "adminseed", apellido: "Seed", email: "adminseed@uade.edu.ar", password: "password123", role: "ADMIN" };
  await authReq('/api/auth/register', credentials);
  const authResponse = await authReq('/api/auth/login', { email: credentials.email, password: credentials.password });
  const token = authResponse.token || authResponse.access_token;
  
  if (!token) {
    console.error("No se pudo obtener el token.");
    return;
  }
  
  for (const p of products) {
    await postProduct(p, token);
  }
}

seed();

const fetch = require('node-fetch');

(async () => {
  try {
    const res = await fetch('http://localhost:8080/api/productos', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:5173',
        'Access-Control-Request-Method': 'GET'
      }
    });
    console.log('OPTIONS status:', res.status);
    console.log('OPTIONS headers:', [...res.headers.entries()]);

    const res2 = await fetch('http://localhost:8080/api/productos', {
      headers: {
        'Origin': 'http://localhost:5173'
      }
    });
    console.log('GET status:', res2.status);
    console.log('GET text:', await res2.text());
  } catch(e) {
    console.error(e);
  }
})();

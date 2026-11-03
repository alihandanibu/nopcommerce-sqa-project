const http = require('node:http');

let products = [
  { id: 1, name: 'MacBook', price: 1200 }
];
let nextId = 2;

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const url = new URL(req.url, 'http://localhost');
  const match = url.pathname.match(/^\/api\/products\/(\d+)$/);
  const id = match ? Number(match[1]) : null;

  const send = (status, data) => {
    res.writeHead(status);
    res.end(JSON.stringify(data));
  };

  if (req.method === 'GET' && url.pathname === '/api/products') {
    return send(200, products);
  }

  if (req.method === 'GET' && match) {
    const product = products.find(p => p.id === id);
    return product ? send(200, product) : send(404, { error: 'Product not found' });
  }

  if (['POST', 'PUT'].includes(req.method)) {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);

    let body;
    try {
      body = JSON.parse(Buffer.concat(chunks).toString());
    } catch {
      return send(400, { error: 'Invalid JSON' });
    }

    if (!body || typeof body.name !== 'string' || !body.name.trim() ||
        typeof body.price !== 'number' || !Number.isFinite(body.price) || body.price <= 0) {
      return send(400, { error: 'Invalid product data' });
    }

    if (req.method === 'POST' && url.pathname === '/api/products') {
      const product = { id: nextId++, name: body.name.trim(), price: body.price };
      products.push(product);
      return send(201, product);
    }

    if (req.method === 'PUT' && match) {
      const product = products.find(p => p.id === id);
      if (!product) return send(404, { error: 'Product not found' });

      product.name = body.name.trim();
      product.price = body.price;
      return send(200, product);
    }
  }

  if (req.method === 'DELETE' && match) {
    const index = products.findIndex(p => p.id === id);
    if (index === -1) return send(404, { error: 'Product not found' });

    products.splice(index, 1);
    return send(204, null);
  }

  return send(404, { error: 'Route not found' });
});

server.listen(3001, '127.0.0.1', () => {
  console.log('API running at http://127.0.0.1:3001');
});

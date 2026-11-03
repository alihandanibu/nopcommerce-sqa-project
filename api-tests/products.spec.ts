import { test, expect } from '@playwright/test';

test('API-01: GET all products', async ({ request }) => {
  const response = await request.get('http://127.0.0.1:3001/api/products');

  expect(response.status()).toBe(200);

  const products = await response.json();

  expect(Array.isArray(products)).toBe(true);
  expect(products).toContainEqual({
    id: 1,
    name: 'MacBook',
    price: 1200
  });
});

test('API-02: GET product by ID', async ({ request }) => {
  const response = await request.get('http://127.0.0.1:3001/api/products/1');

  expect(response.status()).toBe(200);

  const product = await response.json();

  expect(product.id).toBe(1);
  expect(product.name).toBe('MacBook');
  expect(product.price).toBe(1200);
});

test('API-03: POST create product', async ({ request }) => {
  const response = await request.post('http://127.0.0.1:3001/api/products', {
    data: {
      name: 'Gaming Mouse',
      price: 75
    }
  });

  expect(response.status()).toBe(201);

  const product = await response.json();

  expect(product.id).toEqual(expect.any(Number));
  expect(product.name).toBe('Gaming Mouse');
  expect(product.price).toBe(75);

  const getResponse = await request.get(
    `http://127.0.0.1:3001/api/products/${product.id}`
  );

  expect(getResponse.status()).toBe(200);
  expect(await getResponse.json()).toEqual(product);
});

test('API-04: PUT update product', async ({ request }) => {
  const created = await request.post('http://127.0.0.1:3001/api/products', {
    data: { name: 'Keyboard', price: 50 }
  });

  expect(created.status()).toBe(201);
  const product = await created.json();

  const response = await request.put(
    `http://127.0.0.1:3001/api/products/${product.id}`,
    {
      data: { name: 'Mechanical Keyboard', price: 95 }
    }
  );

  expect(response.status()).toBe(200);

  const updated = await response.json();
  expect(updated.name).toBe('Mechanical Keyboard');
  expect(updated.price).toBe(95);

  const getResponse = await request.get(
    `http://127.0.0.1:3001/api/products/${product.id}`
  );

  expect(getResponse.status()).toBe(200);
  expect(await getResponse.json()).toEqual(updated);
});

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function fetchProducts() {
  const r = await fetch(`${BASE}/products`);
  return r.json();
}

export async function addToCart(productId, qty = 1) {
  const r = await fetch(`${BASE}/cart`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ productId, qty })
  });
  return r.json();
}

export async function getCart() {
  const r = await fetch(`${BASE}/cart`);
  return r.json();
}

export async function updateCartItem(id, qty) {
  const r = await fetch(`${BASE}/cart/${id}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ qty })
  });
  return r.json();
}

export async function removeCartItem(id) {
  const r = await fetch(`${BASE}/cart/${id}`, { method: 'DELETE' });
  return r.json();
}

export async function checkout(payload) {
  const r = await fetch(`${BASE}/checkout`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return r.json();
}

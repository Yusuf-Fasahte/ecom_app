const express = require("express");
const router = express.Router();
const { db } = require("../db");

function getUserId() {
  const u = db.prepare("SELECT id FROM users LIMIT 1").get();
  return u?.id || 1;
}

// ✅ GET /api/cart
router.get("/", (req, res) => {
  const userId = getUserId();
  const items = db
    .prepare(
      `
    SELECT ci.id as cart_id, p.id as product_id, p.title, p.price, p.image, ci.qty
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.user_id = ?
  `
    )
    .all(userId);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items, total });
});

// ✅ POST /api/cart  body: { productId, qty }
router.post("/", (req, res) => {
  const { productId, qty } = req.body;
  if (!productId || !qty) {
    return res.status(400).json({ error: "productId and qty required" });
  }

  const userId = getUserId();

  // ✅ Always fetch the latest product info from DB
  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // ✅ Check if product already exists in cart
  const existing = db
    .prepare("SELECT * FROM cart_items WHERE product_id = ? AND user_id = ?")
    .get(productId, userId);

  if (existing) {
    db.prepare("UPDATE cart_items SET qty = qty + ? WHERE id = ?").run(
      qty,
      existing.id
    );
    return res.json({ ok: true, message: "Updated existing item", product });
  }

  // ✅ Insert new item with the correct product data
  const info = db
    .prepare(
      "INSERT INTO cart_items (product_id, qty, user_id) VALUES (?, ?, ?)"
    )
    .run(productId, qty, userId);

  res.json({
    ok: true,
    message: "Added new item",
    cartItemId: info.lastInsertRowid,
    product,
  });
});

// ✅ PUT /api/cart/:id  body: { qty }
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { qty } = req.body;
  if (qty === undefined) return res.status(400).json({ error: "qty required" });

  db.prepare("UPDATE cart_items SET qty = ? WHERE id = ?").run(qty, id);
  res.json({ ok: true });
});

// ✅ DELETE /api/cart/:id
router.delete("/:id", (req, res) => {
  db.prepare("DELETE FROM cart_items WHERE id = ?").run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;

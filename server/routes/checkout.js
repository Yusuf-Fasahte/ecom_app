const express = require("express");
const router = express.Router();
const { db } = require("../db");

function getUserId() {
  const user = db.prepare("SELECT id FROM users LIMIT 1").get();
  return user?.id || 1;
}

router.post("/", (req, res) => {
  const userId = getUserId();
  const { name, email } = req.body;

  console.log("Received checkout request:", req.body); // 👀 Debug line

  // ✅ Ensure user info is updated
  db.prepare(
    "UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email) WHERE id = ?"
  ).run(name || null, email || null, userId);

  // ✅ Fetch updated user info
  const user = db
    .prepare("SELECT name, email FROM users WHERE id = ?")
    .get(userId);

  // ✅ Fetch cart items
  const items = db
    .prepare(
      `SELECT p.id as product_id, p.title, p.price, ci.qty
       FROM cart_items ci
       JOIN products p ON p.id = ci.product_id
       WHERE ci.user_id = ?`
    )
    .all(userId);

  if (!items.length) {
    return res.status(400).json({ error: "Cart empty" });
  }

  // ✅ Calculate total
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const now = new Date().toISOString();

  // ✅ Save receipt
  const info = db
    .prepare(
      "INSERT INTO receipts (user_id, total, items_json, created_at) VALUES (?, ?, ?, ?)"
    )
    .run(userId, total, JSON.stringify(items), now);

  // ✅ Clear cart
  db.prepare("DELETE FROM cart_items WHERE user_id = ?").run(userId);

  // ✅ Return full receipt info
  res.json({
    receiptId: info.lastInsertRowid,
    name: user.name || name || "N/A",
    email: user.email || email || "N/A",
    total,
    created_at: now,
    items,
  });
});

module.exports = router;

// client/src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { fetchProducts, addToCart } from "../api";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [adding, setAdding] = useState(null);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  async function handleAdd(productId) {
    setAdding(productId);
    await addToCart(productId, 1);
    setAdding(null);

    const addedProduct = products.find((p) => p.id === productId);
    if (addedProduct) {
      toast.success(`${addedProduct.title} added to cart 🛒`, {
        style: {
          background: "var(--toast-bg, #1e293b)",
          color: "var(--toast-text, #fff)",
          borderRadius: "8px",
          padding: "12px 16px",
        },
        iconTheme: {
          primary: "#3b82f6",
          secondary: "#fff",
        },
        duration: 2500,
      });
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={handleAdd}
            adding={adding === p.id}
          />
        ))}
      </div>
    </div>
  );
}

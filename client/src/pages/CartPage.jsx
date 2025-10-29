import React, { useEffect, useState } from "react";
import { getCart, updateCartItem, removeCartItem } from "../api";
import ConfirmModal from "../components/ConfirmModal"; // make sure this path matches your structure

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState(null);

  const fetchData = async () => {
    const data = await getCart();
    setItems(data.items || []);
    setTotal(data.total || 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleQtyChange = async (id, qty) => {
    if (qty < 1) return;
    await updateCartItem(id, qty);
    fetchData();
  };

  const openConfirmModal = (item) => {
    setItemToRemove(item);
    setConfirmOpen(true);
  };

  const confirmRemove = async () => {
    if (itemToRemove) {
      await removeCartItem(itemToRemove.cart_id);
      fetchData();
      setConfirmOpen(false);
      setItemToRemove(null);
    }
  };

  const cancelRemove = () => {
    setConfirmOpen(false);
    setItemToRemove(null);
  };

  // convert $ to ₹
  const convertToINR = (usd) => Math.round(usd * 83);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 transition-colors">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {items.length === 0 ? (
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Your cart is empty.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item) => (
            <div
              key={item.cart_id}
              className="flex items-center justify-between bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md transition-colors"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    ₹{convertToINR(item.price)} × {item.qty} ={" "}
                    <span className="font-semibold">
                      ₹{convertToINR(item.price * item.qty)}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center border rounded-md bg-gray-100 dark:bg-gray-700">
                  <button
                    onClick={() => handleQtyChange(item.cart_id, item.qty - 1)}
                    className="px-2 py-1 text-lg font-semibold"
                  >
                    −
                  </button>
                  <span className="px-3">{item.qty}</span>
                  <button
                    onClick={() => handleQtyChange(item.cart_id, item.qty + 1)}
                    className="px-2 py-1 text-lg font-semibold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => openConfirmModal(item)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-xl font-semibold">
              Total: ₹{convertToINR(total)}
            </p>
            <a
              href="/checkout"
              className="inline-block mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow-md transition-colors"
            >
              Proceed to Checkout
            </a>
          </div>
        </div>
      )}

      {confirmOpen && (
        <ConfirmModal
          title="Remove Item"
          message={`Are you sure you want to remove "${itemToRemove?.title}" from your cart?`}
          onConfirm={confirmRemove}
          onCancel={cancelRemove}
        />
      )}
    </div>
  );
}

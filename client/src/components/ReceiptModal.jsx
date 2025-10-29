import React from "react";

export default function ReceiptModal({ receipt, onClose }) {
  const convertToINR = (usd) => Math.round(usd * 83);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-2xl shadow-xl p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Order Receipt</h2>

        <div className="mb-4 space-y-1 text-sm">
          <p>
            <strong>Name:</strong> {receipt.name || "—"}
          </p>
          <p>
            <strong>Email:</strong> {receipt.email || "—"}
          </p>
          <p>
            <strong>Order ID:</strong> #{receipt.receiptId || "—"}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(receipt.created_at).toLocaleString()}
          </p>
        </div>

        <div className="mb-4 border-t border-gray-300 dark:border-gray-700 pt-3">
          <h3 className="font-semibold mb-2">Items:</h3>
          <ul className="space-y-1">
            {receipt.items?.map((item) => (
              <li
                key={item.product_id}
                className="flex justify-between text-sm"
              >
                <span>
                  {item.title} × {item.qty}
                </span>
                <span>₹{convertToINR(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-between font-semibold border-t border-gray-300 dark:border-gray-700 pt-3">
          <span>Total:</span>
          <span>₹{convertToINR(receipt.total)}</span>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

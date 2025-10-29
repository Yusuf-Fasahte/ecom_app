import React, { useState } from "react";
import { checkout } from "../api";
import ReceiptModal from "../components/ReceiptModal";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email) {
      alert("Please enter your name and email before placing the order.");
      return;
    }

    try {
      // ✅ Send name and email to backend
      const res = await checkout({ name, email });

      if (res.error) {
        alert(res.error);
        return;
      }

      // ✅ Successfully received receipt
      setReceipt({
        ...res,
        name: res.name || name,
        email: res.email || email,
      });
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong during checkout.");
    }
  }

  function close() {
    setReceipt(null);
    navigate("/");
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
          Checkout
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />

          <button
            type="submit"
            className="mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-all"
          >
            Place Order
          </button>
        </form>
      </div>

      {/* ✅ Receipt Modal after successful checkout */}
      {receipt && <ReceiptModal receipt={receipt} onClose={close} />}
    </motion.div>
  );
}

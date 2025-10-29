// client/src/components/ConfirmModal.jsx
import React from "react";
import { motion } from "framer-motion";

export default function ConfirmModal({
  title = "Are you sure?",
  message = "",
  confirmText = "Yes",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-lg p-6 w-80 text-center border dark:border-slate-700"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {message && (
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">
            {message}
          </p>
        )}
        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white transition disabled:opacity-60"
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

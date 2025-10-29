import React from "react";
import { motion } from "framer-motion";
import { formatPriceUSD } from "../utils/currency";

export default function ProductCard({ product, onAdd, adding }) {
  return (
    <motion.div
      className="card flex flex-col gap-3 hover:shadow-lg dark:hover:shadow-slate-700 transition-all duration-200 bg-white dark:bg-darkCard p-4 rounded-xl border dark:border-slate-700"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="h-48 flex items-center justify-center overflow-hidden rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-full object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
          {product.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-slate-800 dark:text-slate-200">
          {formatPriceUSD(product.price)}
        </div>
        <button
          onClick={() => onAdd(product.id)}
          disabled={adding}
          className={`px-3 py-1 rounded-md font-medium transition ${
            adding
              ? "opacity-50 cursor-not-allowed"
              : "bg-brand-500 hover:bg-brand-600 text-white dark:bg-blue-600 dark:hover:bg-blue-500"
          }`}
        >
          {adding ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </motion.div>
  );
}

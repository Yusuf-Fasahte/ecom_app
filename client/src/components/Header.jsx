// client/src/components/Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 sticky top-0 z-50">
      <Link
        to="/"
        className="text-2xl font-bold text-brand-500 dark:text-blue-400"
      >
        VibeCommerce
      </Link>

      <nav className="flex items-center gap-4">
        <Link
          to="/cart"
          className="px-3 py-2 rounded-md font-medium bg-brand-500 hover:bg-brand-600 text-white dark:bg-blue-600 dark:hover:bg-blue-500 transition"
        >
          Cart
        </Link>

        <Link
          to="/checkout"
          className="px-3 py-2 rounded-md font-medium border border-brand-500 text-brand-500 hover:bg-brand-500 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white transition"
        >
          Checkout
        </Link>

        <ThemeToggle />
      </nav>
    </header>
  );
}

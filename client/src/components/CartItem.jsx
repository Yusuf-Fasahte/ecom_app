import React, { useState } from "react";
import { formatPriceUSD } from "../utils/currency";

export default function CartItem({ item, onUpdate, onRemove }) {
  const [qty, setQty] = useState(item.qty);

  return (
    <div className="card flex items-center gap-4">
      <img
        src={item.image}
        alt={item.title}
        className="w-20 h-20 object-contain"
      />
      <div className="flex-1">
        <div className="font-semibold">{item.title}</div>
        <div className="text-sm text-slate-500">
          {formatPriceUSD(item.price)} × {qty}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={qty}
          min="1"
          onChange={(e) => setQty(Number(e.target.value))}
          className="w-20 p-1 border rounded"
        />
        <button
          onClick={() => onUpdate(item.cart_id, qty)}
          className="px-3 py-1 rounded-md bg-slate-200"
        >
          Update
        </button>
        <button
          onClick={() => onRemove(item.cart_id)}
          className="px-3 py-1 rounded-md bg-red-500 text-white"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

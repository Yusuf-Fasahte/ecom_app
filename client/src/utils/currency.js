// client/src/utils/currency.js
const USD_TO_INR = 88; // Conversion rate (you can update anytime)

export function formatPriceUSD(priceUSD) {
  return `₹${(priceUSD * USD_TO_INR).toFixed(0)}`;
}

export function formatTotalUSD(priceUSD, qty = 1) {
  return `₹${(priceUSD * USD_TO_INR * qty).toFixed(0)}`;
}

# 🛒 Full-Stack E-Commerce Cart App

A responsive full-stack shopping cart web application built using **React**, **Node.js**, and **SQLite**.  
Users can browse products, add/remove items to/from their cart, and simulate checkout with receipt generation.  
Designed as part of a full-stack development assignment, this app demonstrates REST API integration, state management, and dark/light theming.

---

## 🚀 Features

- 🌓 **Light & Dark mode support**
- 💳 **Add, update, and remove cart items**
- 💰 **Automatic price conversion (USD → INR)**
- 🧾 **Dynamic checkout receipt with order details**
- 💾 **Persistent data using SQLite**
- 🔄 **Reusable components and clean architecture**

---

## 🧩 Tech Stack

**Frontend:**

- React (Vite)
- Tailwind CSS
- Framer Motion (animations)
- React Router
- React Hot Toast

**Backend:**

- Node.js
- Express.js
- SQLite (via `better-sqlite3`)

---

## 📁 Folder Structure

```
ecom_app/
├── client/                # Frontend (React)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Helper functions (e.g., currency.js)
│   │   ├── api.js         # Handles API requests
│   │   └── main.jsx       # App entry point
│   └── package.json
│
├── server/                # Backend (Node + Express)
│   ├── db.js              # Database connection setup
│   ├── routes.js          # API endpoints
│   ├── seed.js            # Database seeding script
│   ├── index.js           # Express server entry
│   └── database.sqlite    # SQLite database file
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/<your-username>/ecom_app.git
cd ecom_app
```

### 2️⃣ Install dependencies

**Backend**

```bash
cd server
npm install
```

**Frontend**

```bash
cd ../client
npm install
```

---

## 🗄️ Database Setup

To initialize or re-seed your product database:

```bash
cd server
node seed.js
```

If you want to clear old data before reseeding:

```bash
node
> const { db } = require('./db');
> db.prepare('DELETE FROM products').run();
> db.prepare('DELETE FROM cart_items').run();
> db.prepare('DELETE FROM receipts').run();
.exit
node seed.js
```

---

## ▶️ Running the App

### Start the Backend

```bash
cd server
node index.js
```

Server runs on: **http://localhost:5000**

### Start the Frontend

```bash
cd ../client
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 💱 Currency Conversion

All product prices are stored in **USD** in the backend,  
but automatically converted to **INR (₹)** in the frontend using:

```js
// client/src/utils/currency.js
export const USD_TO_INR = 82;
export function formatINR(usdPrice) {
  return `₹${(usdPrice * USD_TO_INR).toFixed(0)}`;
}
```

This ensures price consistency across products, cart, and receipts.

---

## 🧾 Checkout & Receipts

- Enter your **name** and **email** at checkout.
- A simulated **order receipt** appears with:
  - Order ID
  - Customer details
  - Item list with quantity × price
  - Total (in INR)
- Works in both light and dark modes.

---

## 🧠 Learning Outcomes

This project demonstrates:

- Building REST APIs with Express & SQLite
- React state management and component reuse
- Dark/light theming using Tailwind CSS
- API integration and frontend-backend synchronization
- Data persistence with a local database

---

## 🧰 Future Improvements

- 🧾 Save receipts for logged-in users
- 🔍 Add product search and filters
- 🧑‍💻 User authentication
- 💸 Integrate payment gateway simulation
- 📦 Product image upload via admin dashboard

---

## 👨‍💻 Developed By

**Yusuf Fasahte**  
Bharati Vidyapeeth College of Engineering, Navi Mumbai

📧 Email: your.email@example.com  
💼 GitHub: [https://github.com/your-username](https://github.com/your-username)

---

⭐ _If you found this project useful, consider giving it a star on GitHub!_

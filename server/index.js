const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
require('./db'); // initialize DB on load
const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(bodyParser.json());

app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

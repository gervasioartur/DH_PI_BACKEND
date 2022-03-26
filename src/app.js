require('dotenv/config');
require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const cors = require('cors');
const experss = require('express');
const cors_origin = process.env.CORS_ORIGIN;

//
const app = experss();
app.use(experss.json());
app.use(experss.static(__dirname + '../public'));
app.use(cors({ credentials: true, origin: cors_origin }));

//importing routes
const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const customerRoutes = require('./routes/customer.routes');

// configuring roures
app.use('/auth', authRoutes);
app.use('/admins', adminRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/categories', categoryRoutes);

app.get('*', (req, res) => {
  return res.status(404).json({ message: 'Página não encontrada!' });
});

module.exports = app;

const express = require('express');
const app = express();

app.use(express.json());

// Route imports
const orderRoutes = require('./modules/order/routes');
//const stockRoutes = require('./modules/stock/routes');
//const vendorRoutes = require('./modules/vendor/routes');

app.use('/order', orderRoutes);
//app.use('/stock', stockRoutes);
//app.use('/vendor', vendorRoutes);

module.exports = app;
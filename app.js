const express = require('express');
const path = require('path');

const addProductRoutes = require('./routes/add-product');
const productRoutes = require('./routes/product');
const errorRoutes = require('./routes/404');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.static(path.join(__dirname)));

app.use(addProductRoutes);
app.use(productRoutes);
app.use(errorRoutes);

app.listen(3000);
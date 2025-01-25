const express = require('express');
const bodyParser = require('body-parser');

const adminController = require('../controllers/admin');

const addProduct = express.Router();

addProduct.use(bodyParser.urlencoded({ extended: false }));

addProduct.get('/add-product', adminController.getAddProduct);

addProduct.post('/add-product', adminController.postAddProduct);

addProduct.get('/products', adminController.getProducts);

addProduct.get('/edit-product/:productId', adminController.getEditProduct);

addProduct.post('/edit-product', adminController.postEditProduct);

addProduct.post('/delete-product', adminController.postDeleteProduct);

module.exports = addProduct;
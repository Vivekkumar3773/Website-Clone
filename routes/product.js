const express = require('express');

const shopController = require('../controllers/shop');

const product = express.Router();

product.get('/', shopController.getProduct);

product.get('/index', shopController.getIndex);

product.get('/index/:productId', shopController.getProducts);

product.get('/cart', shopController.getCart);

product.post('/cart', shopController.postCart);

product.get('/order', shopController.getOrder);

module.exports = product;
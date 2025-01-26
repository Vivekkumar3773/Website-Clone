const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router(); // Updated variable name

// Define shop routes
router.get('/', shopController.getProducts);
router.get('/index', shopController.getIndex);
router.get('/index/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);

router.get('/order', shopController.getOrder);

module.exports = router; // Export the router

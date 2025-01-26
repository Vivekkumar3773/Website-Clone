const express = require('express');
const bodyParser = require('body-parser');

const adminController = require('../controllers/admin');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));

// Routes for adding, editing, and deleting products
router.get('/add-product', adminController.getAddProduct);

router.post('/add-product', adminController.postAddProduct);

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;

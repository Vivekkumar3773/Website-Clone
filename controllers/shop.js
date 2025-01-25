const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProduct = (req, res, next) => {
    Product.fatchAll((products) => {
        res.render('shop/product-list', { pageTitle: 'Shop Page', path: '/', prods: products });
    });
}

exports.getProducts = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/index' });
    })
}

exports.getIndex = (req, res, next) => {
    Product.fatchAll((products) => {
        res.render('shop/index', { pageTitle: 'Products Page', path: '/index', prods: products });
    });
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', { pageTitle: 'Cart Page', path: '/cart' });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.getOrder = (req, res, next) => {
    res.render('shop/order', { pageTitle: 'Order Page', path: '/order' });
}

const Product = require('../models/products');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => { // Changed the method name
    Product.fetchAll((products) => { // Corrected fetchAll
        res.render('shop/product-list', {
            pageTitle: 'Shop Page',
            path: '/',  // Adjusted path for clarity
            prods: products
        });
    });
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (product) {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products' // Consistent path
            });
        } else {
            res.redirect('/products');
        }
    });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => { // Corrected fetchAll
        res.render('shop/index', {
            pageTitle: 'Products Page',
            path: '/index',
            prods: products
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.getProducts(cart => {
        Product.fetchAll(products => { // Corrected fetchAll
            const cartProducts = [];
            for (let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                pageTitle: 'Cart Page',
                path: '/cart',
                products: cartProducts
            });
        });
    });
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        if (product) {
            Cart.addProduct(prodId, product.price);
        }
        res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        if (product) {
            Cart.deleteProduct(prodId, product.price);
        }
        res.redirect('/cart');
    });
};

exports.getOrder = (req, res, next) => {
    res.render('shop/order', {
        pageTitle: 'Order Page',
        path: '/order'
    });
};

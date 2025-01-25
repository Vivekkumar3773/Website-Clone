const Product = require('../models/products');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', { pageTitle: 'Add-Product Page', path: '/add-product', editing: false });
}

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageUrl, price, description);
    product.save();
    res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/add-product', { pageTitle: 'Edit Page', path: '/edit-product', editing: editMode, product: product });
    });
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDescription);
    updatedProduct.save();
    res.redirect('/products');
}

exports.getProducts = (req, res, next) => {
    Product.fatchAll((products) => {
        res.render('admin/products', { pageTitle: 'Admin-Page', path: '/products', prods: products });
    })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/products');
}
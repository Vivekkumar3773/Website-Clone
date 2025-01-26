const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if (!err && fileContent.length > 0) {
                try {
                    cart = JSON.parse(fileContent);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                }
            }
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if (existingProduct) {
                updatedProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice += +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) console.error('Error writing to file:', err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            let cart = { products: [], totalPrice: 0 };
            if (fileContent.length > 0) {
                try {
                    cart = JSON.parse(fileContent);
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                    return;
                }
            }
            const productIndex = cart.products.findIndex(prod => prod.id === id);
            if (productIndex === -1) {
                return;
            }
            const productQty = cart.products[productIndex].qty;
            cart.products = cart.products.filter(prod => prod.id !== id);
            cart.totalPrice -= productPrice * productQty;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                if (err) console.error('Error writing to file:', err);
            });
        });
    }

    static getProducts(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err || fileContent.length === 0) {
                return cb(null);
            }
            try {
                const cart = JSON.parse(fileContent);
                cb(cart);
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError);
                cb(null);
            }
        });
    }
};

const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');

const fetchData = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            try {
                const data = JSON.parse(fileContent);
                cb(data);
            } catch (parseError) {
                cb([]);
            }
        };
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        return new Promise((resolve, reject) => {
            fetchData((products) => {
                if (this.id) {
                    const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                    const updatedProducts = [...products];
                    updatedProducts[existingProductIndex] = this;
                    fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                        if (err) {
                            console.error('Error saving product:', err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    this.id = Math.random().toString();
                    products.push(this);
                    fs.writeFile(p, JSON.stringify(products), (err) => {
                        if (err) {
                            console.error('Error saving product:', err);
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }

    static deleteById(id, cb) {
        fetchData((products) => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (err) {
                    console.error('Error deleting product:', err);
                } else {
                    Cart.deleteProduct(id, product.price);
                    if (cb) cb(updatedProducts);
                }
            });
        });
    }

    static fetchAll(cb) {
        fetchData(cb);
    }

    static findById(id, cb) {
        fetchData((products) => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
}

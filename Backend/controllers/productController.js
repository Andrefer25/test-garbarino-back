var Services = require('../services/productService');
var Utils = require('../utils/utils');

exports.initProductsDB = function () {
    Services.getProductsFromAPI(function (productsAPI) {
        Services.getProductsDB(function (productsDB) {
            var newProducts = [];
            if (productsDB.length > 0) {
                newProducts = Utils.getNewProducts(productsAPI, productsDB);
            } else {
                newProducts = productsAPI;
            }
            if (newProducts.length > 0) {
                Services.insertProductsDB(Utils.parseProducts(newProducts), function (err, res) {
                    if (err) throw err;
                    console.log("Se insertaron " + res.insertedCount + " elementos");
                })
            } else {
                console.log("No se insertaron nuevos elementos");
            }
        });
    });
}

exports.findAllProducts = function (req, res) {
    Services.getProductsDB(function(productsDB) {
        res.send(Utils.parseProductsDB(productsDB));
    })
};

exports.findById = function (req, res) {
    Services.getProductsDB(function(productsDB) {
        var product = Utils.getProductById(req.params.id, productsDB);
        if(product && product.enabled) {
            Services.getProductById(req.params.id, function(product) {
                res.send(product);
            })
        } else {
            res.status(404).send('Not found');
        }
    })
};

exports.enableOrDisableProduct = function (req, res) {
    Services.getProductsDB(function(productsDB) {
        var product = Utils.getProductById(req.params.id, productsDB);
        if(product) {
            Services.updateProductDB(product);
        } else {
            res.status(404).send('Not found');
        }
    })
}
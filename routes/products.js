
var Controller = require('../controllers/productController');

module.exports = function (app) {

	//Link routes and functions
	app.get('/products', Controller.findAllProducts);
	app.get('/products/:id', Controller.findById);
	app.patch('/products/:id', Controller.enableOrDisableProduct);
}
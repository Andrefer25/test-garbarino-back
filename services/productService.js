const request = require('request');
var MongoClient = require('mongodb').MongoClient;
var Constants = require('../utils/constants');

exports.getProductsFromAPI = function (callback) {
	request(Constants.awsUrl, function (error, response, body) {
		callback(JSON.parse(body).items);
	});
};

exports.getProductById = function (id, callback) {
	request(Constants.awsUrl + id, function (error, response, body) {
		callback(JSON.parse(body));
	});
}

exports.getProductsDB = function (callback) {
	MongoClient.connect(Constants.mongoUrl, function (err, db) {
		if (err) throw err;
		var dbo = db.db(Constants.dbName);
		var collection = dbo.collection(Constants.collectionName);
		collection.find({}).toArray(function (err, result) {
			if (err) throw err;
			callback(result);
		});
		db.close();
	});
}

exports.insertProductsDB = function (products,callback) {
	MongoClient.connect(Constants.mongoUrl, function (err, db) {
		if (err) throw err;
		var dbo = db.db(Constants.dbName);
		dbo.collection(Constants.collectionName).insertMany(products,callback);
		db.close();
	});
}

exports.updateProductDB = function (product) {
	MongoClient.connect(Constants.mongoUrl, function (err, db) {
		if (err) throw err;
		var dbo = db.db(Constants.dbName);
		try {
			dbo.collection(Constants.collectionName).updateOne(
				{"id": product.id},
				{$set: {"enabled": (product.enabled)? false:true } } //seteo automaticamente el contrario de lo que estaba antes. Esto se podria mejorar cuando se tenga la parte frontend
			);
		} catch (e) {
			console.log(e);
		}
		db.close();
	});
}
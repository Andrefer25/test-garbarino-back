
exports.parseProducts = function (products) {
  products.forEach(product => product.enabled = true); //esto podria resultar un poco polemico pero lo deje por defecto el campo enabled para cada nuevo elemento en true
  return products;
}

exports.parseProductsDB = function (productsDB) {
  productsDB.forEach(productDB => delete productDB._id); //elimino el campo _id que viene por defecto en mongoDB (podria haber seteado el id como _id pero para evitar la confusion no lo hice) para mejorar la vista y su utilizacion
  return productsDB;
}

exports.getNewProducts = function (productsAPI, productsDB) { //si se agregaron nuevos productos (se comprueban a traves del ID) en la api de AWS, se actualiza en la base de Mongo
  var newProducts = [];
  productsDB.forEach(product => {
    var prodsAPI = getAllProductsId(productsAPI);
    if (prodsAPI.indexOf(product.id) == -1) {
      newProducts.push(product);
    }
  });
  return newProducts;
}

getAllProductsId = function (products) {
  return products.map(product => { return product.id });
}

exports.getProductById = function (id, productsDB) {
  var product;
  productsDB.forEach(productDB => {
    if(productDB.id == id) {
      product = productDB;
    }
  });
  return product;
}
var express = require("express"),
  app = express(),
  http = require("http"),
  server = http.createServer(app),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  cors = require('cors'),
  Controller = require('./controllers/productController');

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride());

Controller.initProductsDB(); // inicializa la base de Mongo. Se podria programar el uso de esta funcion en ciertos intervalos utilizando Agenda (https://github.com/rschmukler/agenda)

app.get('/', function (req, res) {
  res.send("Hello Garbarino! :)");
});

routes = require('./routes/products')(app);

server.listen(8000, function () {
  console.log("Node server running on http://localhost:8000");
});
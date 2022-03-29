const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const db = require('./db')

/*
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://Leow92:bE3bLbq3mJSjT!J3@cluster0.wnwww.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'Cluster0';
*/
const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products', (request, response) => {
  //var url=request.url;
  //var components=url.split("/");
  var res=allProducts().then(res => response.send(res));
});

app.get('/products/search', (request, response) => {
  var limit=request.query.limit;
  var brand=request.query.brand;
  var price=request.query.price;
  response.send(request.query);
  limit = parseInt(limit);
  price = parseInt(price);
  //var page=request.query.page;
  //var brand = splt[]
  console.log(limit);
  console.log(brand);
  console.log(price);
  //console.log(page)
  //var res=searchProductsBrands(brand).then(res => response.send(res));
  var res=searchProducts(limit,brand,price).then(res => response.send(res));
});

app.get('/products/:id', (request, response) => {
  var url=request.url; //ok
  var splitURL=url.split("/").pop();
  var res=productsById(splitURL).then(res => response.send(res));
});

const productsById = async(id)=>{
  db.getDB()
  const products = db.find({"_id":id});
  console.log(products);
  return products
}

const allProducts = async()=>{
  db.getDB();
  const prod = db.find();
  console.log(prod);
  return prod
}

const searchProducts = async(limitation,brand,price) => {
  db.getDB();
  const count = db.find({"brand":brand},{"price":{$lt:price}}).count();
  console.log(count);

  //const {limit,offset} = calculateLimitAndOffset(page, limitation);
  
  const products = db.find({"brand":brand},{"price":{$lt:price}}).limit(limitation);
  console.log(products);
  //const meta = paginate (p, count, products, limitation);
  return(products)
}

const searchProductsBrands = async(brand) => {
  db.getDB();
  const count = db.find({"brand":brand}).count();
  console.log(count);
  const products = await collection.find({"brand":brand}).toArray();
  console.log(products);
  return(products)
}

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
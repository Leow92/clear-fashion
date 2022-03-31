const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const {calculateLimitAndOffset, paginate} = require('paginate-info');
//const db = require('./db');
//var collection=db.collection('products');
const {MongoClient} = require('mongodb');
const fs = require('fs');

const MONGODB_COLLECTION = 'products';
const MONGODB_URI = 'mongodb+srv://Leow92:bE3bLbq3mJSjT!J3@cluster0.wnwww.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'Cluster0';

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

let db,collection;

const connect = () => {
   console.log("Trying to connect...");
   MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true}, (error, client)=>{
     if(error) {
       throw error;
   }
     db = client.db(MONGODB_DB_NAME);
     collection = db.collection("products");
     
   });
};

connect();

console.log("Connected to `" + MONGODB_DB_NAME + "`!");
app.listen(PORT);

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products', (request, response) => {
  //var url=request.url;
  //var components=url.split("/");
  var res=allProducts().then(res => response.send(res));
});

app.get('/products/:id', (request, response) => {
  var url=request.url; //ok
  var splitURL=url.split("/").pop();
  var res=productsById(splitURL).then(res => response.send(res));
});

app.get('/products/search', (request, response) => {
  var limit=request.query.limit;
  var brand=request.query.brand;
  var price=request.query.price;
  limit = parseInt(limit);
  price = parseInt(price);
  var page=request.query.page;
  console.log(limit);
  console.log(brand);
  console.log(price);
  console.log(page);
  var res = searchProducts(page,limit,brand,price).then(res => response.send(res));
});



const productsById = async(id)=>{
  await connect();
  const products = await collection.find({"_id":id}).toArray();
  console.log(products);
  return products
}

const allProducts = async()=>{
  await connect();
  const prod = await collection.find().toArray();
  console.log(prod);
  return prod
}

const searchProducts = async(page,limit,brand,price) => {
  await connect();
  let {offset} = calculateLimitAndOffset(page, limit);
  const count = await collection.find({"brand":brand,'price':{$lt:price}}).count();
  const products = await collection.find({"brand":brand,'price':{$lt:price}}).skip(offset).limit(limit).toArray();
  const meta = paginate (page, count, products, limit);
  return{products,meta}
}
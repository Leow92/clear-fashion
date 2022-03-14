const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
//const {calculateLimitAndOffset, paginate,estimatedDocumentCount}=require('paginate-info')
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://Leow92:bE3bLbq3mJSjT!J3@cluster0.wnwww.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'Cluster0';

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

app.get('/products/:id', (request, response) => {
  var url=request.url
  var components=url.split("/");
  var res=productsById(components[components.length=1]).then(res => response.send(res));
});

app.get('/search', (request, response) => {
  let brand=request.query.brand;
  let price=request.query.price;
  let limit=request.query.limit;
  let page=request.query.page;
  console.log(brand)
  console.log(price)
  console.log(limit)
  console.log(page)
  var res=searchProducts(brand,price,limit,page).then(res => response.send(res));
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);

const productsById = async(id)=>{
  await connect();
  collection = db.collection('products');

  const products = await collection.find({"_id":id}).toArray();
  console.log(products);
  return products
}

const searchProducts = async(brand,limitation,page) => {
  let b=[]
  if (brand===undefined) {b=["adresse","dedicated","montlimar"];}
  else {b.push(brand);}

  let l=0
  if (limitation===undefined) {l=12;}
  else {l=parseInt(limitation);}

  let p=0
  if (page===undefined) {p=1;}
  else {p=parseInt(page);}
  
  await connect();
  collection = db.collection('products');

  const count = await collection.find({brand:{$in:b}},{price:{$lt:v}}).count();
  console.log(count)

  const {limit,offset} = calculateLimitAndOffset(page, limitation);
  
  const products = await collection.find({brand:{$in:b}},{price:{$lt:v}}).skip(offset).limit(limit).toArray();

  const meta = paginate (p, count, products, limitation);
  return({products,meta})
}


const connect = async () => {
  try{
      const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
      db = client.db(MONGODB_DB_NAME);
      console.log('Connected')

  }catch(e){
      console.error(e)
  }
}

connect()

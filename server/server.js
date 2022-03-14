
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://Leow92:bE3bLbq3mJSjT!J3@cluster0.wnwww.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'Cluster0';
const products = require('./all_products.json')
const fs = require('fs');

const insertProducts = async () => {
    try{
        await connect();
        collection = db.collection('products');
        console.log(products.length)
        const result = collection.insertMany(products,{ordered: false});
        console.log(result);
    }catch(e){
        console.error(e)
    }
}

const find = async () => {
    try {
        await connect();
        collection = db.collection('products');
        var query = {brand : 'montlimar'};
        //const result = collection.insertMany(products);
        const result = await collection.find(query).toArray();
        console.log(result);
    } catch (e) {
      console.error(e);
    }
  };

const connect = async () => {
    try{
        const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
        db = client.db(MONGODB_DB_NAME);
        console.log('Connected')

    }catch(e){
        console.error(e)
    }
}

connect();
//insertProducts();
//find();

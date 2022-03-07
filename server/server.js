
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://Leow92:bE3bLbq3mJSjT!J3@cluster0.wnwww.mongodb.net/?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'Cluster0';
const products = require('./products_for_dedicated.json')
const fs = require('fs');

const insertProducts = async () => {
    try{
        await connect();
        collection = db.collection('products');
        const result = collection.insertMany(products);
        console.log(result);
    }catch(e){
        console.error(e)
    }
}
/*
const query = require('./query.txt')
const find = async () => {
    try {
        await connect();
        collection = db.collection('products');
        //const result = collection.insertMany(products);
        const result = await collection.find(query).toArray();
        console.log(result);
    } catch (e) {
      console.error(e);
    }
  };
*/
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

/*
const insertProducts = async() => 
{
    const results = collection.insertMany(products);
    console.log(results);
}

const findNumber = async() => 
{
    const products = await collection.find({}).count();
    console.log(products);
}

const brands = async(brand) => 
{
    const products = await collection.find({"brand":brand}).toArray();
    console.log(results);
}
*/
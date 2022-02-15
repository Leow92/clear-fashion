const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://Leow92:Sm2sDZPtmUgBnCjY@cluster0.wnwww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'Cluster0';
const products = require('./products_for_dedicated.json')

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

const connexion = async() =>
{
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    const db =  client.db(MONGODB_DB_NAME)
    const collection = db.collection('products');
    await findNumber();
    process.exit(0);    
}

connexion();
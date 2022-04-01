"use strict";

// Import the dependency.
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://Leow92:bE3bLbq3mJSjT!J3@cluster0.wnwww.mongodb.net/?retryWrites=true&w=majority';;
const MONGODB_DB_NAME = 'Cluster0';
const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
};

let client;
let clientPromise;


// In production mode, it's best to not use a global variable.
client = new MongoClient(uri, options);
clientPromise = client.connect()


  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
module.exports = clientPromise;
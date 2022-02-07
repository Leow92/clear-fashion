/* eslint-disable no-console, no-process-exit */
const montlimar = require('./sites/montlimar');
const fs = require('fs');

async function sandbox (eshop = 'https://www.montlimart.com/toute-la-collection.html?limit=all') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await montlimar.scrape(eshop);

    console.log(products);
    console.log('done');
    /*
    var json = JSON.stringify(products);
    fs.writeFile('Products_Montlimar.json', json, 'utf8', callback);
    */
    process.exit(0);
    
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

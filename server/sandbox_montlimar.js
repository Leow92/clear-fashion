/* eslint-disable no-console, no-process-exit */
const montlimar = require('./sources/montlimar');
const fs = require('fs');

var products=[];
async function sandbox (eshop = 'https://www.montlimart.com/toute-la-collection.html?limit=all') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    products = await montlimar.scrape(eshop);

    console.log(products);
    console.log('done');
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync('products_for_montlimar.json', data);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

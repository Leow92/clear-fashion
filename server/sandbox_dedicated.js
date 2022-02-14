/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicated');
const fs = require('fs');

var products=[];
async function sandbox (eshop = 'https://www.dedicatedbrand.com/en/men/all-men?page=4') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    products = await dedicatedbrand.scrape(eshop);

    console.log(products);
    console.log('done');
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync('products_for_dedicated.json', data);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
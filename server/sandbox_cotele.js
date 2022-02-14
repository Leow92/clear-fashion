/* eslint-disable no-console, no-process-exit */
const cotele = require('./sources/cotele');
const fs = require('fs');

var products=[];
async function sandbox (eshop = 'https://coteleparis.com/collections/tous-nos-produits/') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    products = await cotele.scrape(eshop);

    console.log(products);
    console.log('done');
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync('products_for_cotele.json', data);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);

const data = JSON.stringify(products, null, 2);
fs.writeFileSync('products_for_cotele.json', data);
/* eslint-disable no-console, no-process-exit */
const fs = require('fs');
const adresse = require('./sources/adresse');

var products=[];
async function sandbox (eshop = 'https://adresse.paris/630-toute-la-collection') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    products = await adresse.scrape(eshop);

    console.log(products);
    console.log('done');
    
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync('products_for_adresse.json', data);
    process.exit(0); 
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
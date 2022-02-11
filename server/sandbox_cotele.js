/* eslint-disable no-console, no-process-exit */
const cotele = require('./sources/cotele');

async function sandbox (eshop = 'https://coteleparis.com/collections/tous-nos-produits/') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await cotele.scrape(eshop);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
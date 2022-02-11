/* eslint-disable no-console, no-process-exit */
const loom = require('./sources/loom');

async function sandbox (eshop = 'https://www.loom.fr/collections/tous-les-vetements') {
  try {
    console.log(`🕵️‍♀️  browsing ${eshop} source`);

    const products = await loom.scrape(eshop);

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
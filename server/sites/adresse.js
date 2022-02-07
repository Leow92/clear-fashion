const fetch = require('node-fetch');
const cheerio = require('cheerio');
const {'v5': uuidv5} = require('uuid');

/**
 * Parse webpage restaurant
 * @param  {String} data - html response
 * @return {Object} restaurant
 */
const parse = data => {
  const $ = cheerio.load(data, {'xmlMode': true});

  return $('.product_list grid__item')
    .map((i, element) => {
      const link = `https://www.adresse.paris${$(element)
        .find('.')
        .attr('href')}`;

      return {
        link,
        'brand': 'adresse',
        'price': parseInt(
          $(element)
            .find('.prixright')
            .text()
        ),
        'name': $(element)
          .find('.product-name-container')
          .text()
          .trim()
          .replace(/\s/g, ' '),
        'photo': $(element)
          .find('.product-image-container')
          .attr('src'),
        '_id': uuidv5(link, uuidv5.URL)
      };
    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
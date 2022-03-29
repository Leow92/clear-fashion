// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectSort = document.querySelector('#sort-select');
const selectBrand = document.querySelector('#brand-select');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');

/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};

/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */
const fetchProducts = async (page = 1, size = 12) => {
  try {
    const response = await fetch(
      `https://server-ashy.vercel.app?page=${page}&size=${size}`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
};

/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <a style="text-transform: uppercase;"> ${product.brand}</a>
        <a href="${product.link}">${product.name}</a>
        <a> ${product.price}</a>
        <a>€</a>
        <i>${product.released}</i>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderPagination = pagination => {
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', event => {
  fetchProducts(1, parseInt(event.target.value))
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

document.addEventListener('DOMContentLoaded', async () => {
  const products = await fetchProducts();

  setCurrentProducts(products);
  render(currentProducts, currentPagination);
});

// Feature1
selectPage.addEventListener('change', event => {  
  fetchProducts(parseInt(event.target.value),currentPagination.pageSize)
    .then(setCurrentProducts)
    .then(() => render(currentProducts, currentPagination));
});

// Feature2 By brands
selectBrand.addEventListener('click', async (event) => {
  if (event.target.value == "none")
  {
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    setCurrentProducts(products);
    render(currentProducts, currentPagination);
  }
  else{
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);

    products.result = products.result.filter(product => product.brand == event.target.value);
    setCurrentProducts(products);
    render(currentProducts, currentPagination);
  }
});


// Feature5 Sort By Price & Feature6 By Date
function sort_by_price(items)
{
  return items.sort(function(a,b)
  {
      return parseFloat(a.price) - parseFloat(b.price);
  });
}

function sort_by_date(items)
{
  return items.sort(function(a,b)
  {

    return new Date(a.released) - new Date(b.released);
  });
}

selectSort.addEventListener('click', async(event) => {
  if (event.target.value == "none"){
    
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);
    setCurrentProducts(products);
    render(currentProducts, currentPagination);
  }
  if (event.target.value == "price-desc")
  {
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);

    products.result = products.result.filter(product => product.price);
    setCurrentProducts(products);
    render(sort_by_price(currentProducts).reverse(), currentPagination);
  }
  if (event.target.value == "price-asc")
  {
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);

    products.result = products.result.filter(product => product.price);
    setCurrentProducts(products);
    render(sort_by_price(currentProducts), currentPagination);
  }
  if (event.target.value == "date-asc")
  {
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);

    products.result = products.result.filter(product => product.released);
    setCurrentProducts(products);
    render(sort_by_date(currentProducts).reverse(), currentPagination);
  }
  if (event.target.value == "date-desc")
  {
    const products = await fetchProducts(currentPagination.currentPage, currentPagination.pageSize);

    products.result = products.result.filter(product => product.released);
    setCurrentProducts(products);
    render(sort_by_date(currentProducts), currentPagination);
  }
});




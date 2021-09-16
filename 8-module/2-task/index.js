import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = this.render();
  }


  render () {
    let productsGrid = document.createElement('div');
    productsGrid.classList = 'products-grid';

    let productsGridInner = document.createElement('div');
    productsGridInner.classList = 'products-grid__inner';

    this.productsArr = Array.from(this.products)
    .map(val => productsGridInner.append((new ProductCard(val)).elem));

    productsGrid.append(productsGridInner);

    return productsGrid;
  }

  updateFilter(filters) {
    let sortedProducts = Array.from(this.products);

    for(let item in filters){
      this.filters[item] = filters[item];
    }

    if(this.filters.hasOwnProperty('noNuts') && this.filters.noNuts == true) {
      sortedProducts = sortedProducts.filter(val => val.nuts == true ? false : true);
    }

    if(this.filters.hasOwnProperty('vegeterianOnly') && this.filters.vegeterianOnly == true) {
      sortedProducts = sortedProducts.filter(val => val.vegeterian == true ? true: false);  
    }

    if(this.filters.hasOwnProperty('maxSpiciness')) {
        sortedProducts = sortedProducts.filter(val => val.spiciness <= this.filters.maxSpiciness);
    }

    if(this.filters.hasOwnProperty('category') && this.filters.category.length != 0) {
        sortedProducts = sortedProducts.filter(val => val.category === this.filters.category);  
    }

    let productsGridInner = document.body.querySelector('.products-grid__inner');
    productsGridInner.innerHTML = '';

    Array.from(sortedProducts).map(val => productsGridInner.append((new ProductCard(val)).elem));

  }

}

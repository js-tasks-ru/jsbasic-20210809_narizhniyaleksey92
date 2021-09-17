import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {

    this.carousel = new Carousel(slides);
    let containerCarousel = document.body.querySelector('[data-carousel-holder]');
    containerCarousel.append(this.carousel.elem);
    
    this.ribbonMenu = new RibbonMenu(categories);
    let containerRibbon = document.body.querySelector('[data-ribbon-holder]');
    containerRibbon.append(this.ribbonMenu.elem);
    
    this.stepSlider = new StepSlider({steps: 5, value: 3});
    let containerStepSlider = document.body.querySelector('[data-slider-holder]');
    containerStepSlider.append(this.stepSlider.elem);
    
    this.cartIcon = new CartIcon();
    let containerCartIcon = document.body.querySelector('[data-cart-icon-holder]');
    containerCartIcon.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);
    
    let arr = [];

    await fetch('products.json').then(response => response.json()).then(data =>{
      for (let item of data) {
        arr.push(item);
      }
    });

    this.productsGrid = new ProductsGrid(arr);
    let containerProductGrid = document.body.querySelector('[data-products-grid-holder]');
    containerProductGrid.innerHTML = '';
    containerProductGrid.append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.querySelector('#nuts-checkbox').checked,
      vegeterianOnly: document.querySelector('#vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value, 
      category: document.querySelector('.ribbon__item_active').dataset.Id || ''
    });

    document.body.addEventListener('product-add', event =>{
      let product = arr.filter(val => val.id == event.detail)[0];
      this.cart.addProduct(product);
    });

    document.body.querySelector('[data-slider-holder]').addEventListener('slider-change', event => 
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail 
      })
    );


    document.body.querySelector('.ribbon').addEventListener('ribbon-select', event => {
      this.productsGrid.updateFilter({
        category: event.detail });});

    document.querySelector('#nuts-checkbox').addEventListener('change', event => {
      this.productsGrid.updateFilter({ noNuts: event.target.checked });
    });
    
    document.querySelector('#vegeterian-checkbox').addEventListener('change', event => {
      this.productsGrid.updateFilter({ vegeterianOnly: event.target.checked });
    });

  }


}

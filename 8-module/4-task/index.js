import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
    this.addEventListeners();
  }

  addProduct(product) {

    if (typeof product === 'undefined' || product === null) {
      return;
    }

    let findMessage = false;
    for (let item of this.cartItems) {

      if (item.product.id == product.id) {
        item.count += 1;
        findMessage = true;
        break;
      }

    }

    if (findMessage == false) {this.cartItems.push({product: product, count: 1});}

    let cartItem = this.cartItems.slice();

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {

    for (let i = 0; i < this.cartItems.length; i++) {

      if (this.cartItems[i].product.id == productId) {
        this.cartItems[i].count += amount;

        if (this.cartItems[i].count == 0) {this.cartItems.splice(i, 1);}

        break;
      }

    }

    this.onProductUpdate(this.cartItems);
  }

  isEmpty() {
    return this.cartItems.length <= 0 ? true : false;
  }

  getTotalCount() {
    let counter = 0;
    Array.from(this.cartItems).forEach(val => counter += val.count);
    return counter;
  }

  getTotalPrice() {
    let totalPrice = Array.from(this.cartItems).reduce(function(previousValue, currentValue, index, array) {
      return previousValue + (currentValue.product.price * currentValue.count);
    }, 0);
    return totalPrice;
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
  product.id
}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
    2
  )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {

    this.modal = new Modal();

    this.modal.setTitle('Your order');

    this.modal._modelModal.querySelector('.modal__body').innerHTML = '';

    for (let i = 0; i < this.cartItems.length; i++) {
      this.modal._modelModal.querySelector('.modal__body').append(this.renderProduct(this.cartItems[i].product, this.cartItems[i].count));
    }

    let renderForm = this.renderOrderForm();

    renderForm.addEventListener('submit', this.onSubmit);

    this.modal._modelModal.querySelector('.modal__body').append(renderForm);

    this.modal.open();

    this.modal._modelModal.querySelector('.modal__body').addEventListener('click', this.countChanger);
  }

  countChanger = (event) => {
    if (!event.target.closest('.cart-counter__button')) {return;}

    let target = event.target.closest('.cart-counter__button');
    let id = event.target.closest('.cart-product').dataset.productId;


    if (target.classList.contains("cart-counter__button_plus")) {
      this.updateProductCount(id, 1);
    } else {
      this.updateProductCount(id, -1);
    }

  }

  onProductUpdate(cartItem) {

    this.cartIcon.update(this);

    if (this.cartItems.length == 0) {this.modal.close();}

    if (document.body.classList.contains('is-modal-open')) {
      let tempId = [];

      for (let i = 0; i < this.cartItems.length; i++) {

        let productId = this.cartItems[i].product.id;
        let productPrice = this.cartItems[i].product.price;
        let productcount = this.cartItems[i].count;

        let modalBody = document.body.querySelector('.modal__body');
        let elemCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
        let elemPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
        let elemInfo = modalBody.querySelector(`.cart-buttons__info-price`);

        elemCount.innerHTML = productcount;
        elemPrice.innerHTML = `€${(productPrice * productcount).toFixed(2)}`;
        elemInfo.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;

        tempId.push(productId);
      }

      let goods = document.body.querySelectorAll('.cart-product');

      for (let i = 0; i < goods.length; i++) {
    
        if (!tempId.includes(goods[i].dataset.productId)) {goods[i].remove();}

      }

    }


  }

  onSubmit =(event) => {
    event.preventDefault();

    document.body.querySelector('.cart-buttons__button.btn-group__button.button').classList.add('is-loading');

    let form1 = document.body.querySelector('.cart-form');

    const fd = new FormData(form1);

    let newBody = `<div class="modal__body-inner">
    <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
    </p>
  </div>`;

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: fd}).then(response => { 
      if (response.ok) {
        this.modal.setTitle('Success!');
        this.modal._modelModal.querySelector('.modal__body').innerHTML = newBody;
        this.cartItems = [];
        this.cartIcon.update(this);
      } 
    });

  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}


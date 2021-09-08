import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._elem = this.render();
  }

  get elem () {
    return this._elem;
  }

  render() {

    this.ribbon = document.createElement('div');
    this.ribbon.classList = 'ribbon';

    this.nav = document.createElement('nav');
    this.nav.classList = 'ribbon__inner';

    this.links = this.categories.map(function (value, index, arr) { 
      if (index == 0) {return `<a href="#" class="ribbon__item ribbon__item_active" data-id="${value.id}">${value.name}</a>`;}
      if (arr.length - 1) {return `<a href="#" class="ribbon__item" data-id="${value.id}">${value.name}</a>`;}
      return `<a href="#" class="ribbon__item" data-id="${value.id}">${value.name}</a>`;});

    this.nav.innerHTML = this.links.join('');

    this.nav.addEventListener('click', this.onClick);

    this.firstButton = `<button class="ribbon__arrow ribbon__arrow_left">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>`;
    
    this.secondButton = `<button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
    <img src="/assets/images/icons/angle-icon.svg" alt="icon">
  </button>`;

    this.ribbon.insertAdjacentHTML('afterbegin', this.firstButton);
    this.ribbon.append(this.nav);
    this.ribbon.insertAdjacentHTML('beforeend', this.secondButton);

    this.ribbon.addEventListener('click', this.moveRibbon);

    return this.ribbon;
  }


 onClick = (event) => {
   event.preventDefault();

   if (!event.target.closest('.ribbon__item')) { return;}

   let arr = event.target.closest('.ribbon__inner').querySelectorAll('.ribbon__item');

   for (let item of arr) {
     item.classList.remove('ribbon__item_active');
   }

   let target = event.target.closest('.ribbon__item');

   event.target.closest('.ribbon__item').classList.add('ribbon__item_active');

   const ev = new CustomEvent('ribbon-select', {
     detail: target.dataset.id, 
     bubbles: true 
   });
      

   target.dispatchEvent(ev);
 }


moveRibbon = (event) => {

  if (!event.target.closest('.ribbon__arrow')) {return;}

  let target = event.target.closest('.ribbon__arrow');
  let ribbonInner = event.target.closest('.ribbon').querySelector('.ribbon__inner');

  if (target.classList.contains("ribbon__arrow_left")) {
    ribbonInner.scrollBy(-350, 0);
  } else if (target.classList.contains("ribbon__arrow_right")) {
    ribbonInner.scrollBy(350, 0);
  }

  let scrollWidth = ribbonInner.scrollWidth;
  let scrollLeft = ribbonInner.scrollLeft;
  let clientWidth = ribbonInner.clientWidth;
  let scrollRight = scrollWidth - scrollLeft - clientWidth;

  if (scrollLeft < 0) {
    target.closest('.ribbon').querySelector('.ribbon__arrow_left').classList.remove("ribbon__arrow_visible");
  } else if (scrollRight < 0) {
    target.closest('.ribbon').querySelector('.ribbon__arrow_right').classList.toggle("ribbon__arrow_visible");
  } else {
    target.closest('.ribbon').querySelector('.ribbon__arrow_left').classList.add("ribbon__arrow_visible");
    target.closest('.ribbon').querySelector('.ribbon__arrow_right').classList.add("ribbon__arrow_visible");
  }
}
}

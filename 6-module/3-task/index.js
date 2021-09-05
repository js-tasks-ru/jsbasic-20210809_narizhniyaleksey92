import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.sliderCount = this.slides.length;
    this.currentPositionSlider = 1;
    this.indentSlide = 0;
    this.elem = this.render();
  }

  render() {

    this.carousel = document.createElement('div');
    this.carousel.classList = 'carousel';

    this.carouselInner = document.createElement('div');
    this.carouselInner.classList = 'carousel__inner';

    let buttonModel = `<div class="carousel__arrow carousel__arrow_right"><img src="/assets/images/icons/angle-icon.svg" alt="icon"></div>
                       <div class="carousel__arrow carousel__arrow_left" style="display: none;"><img src="/assets/images/icons/angle-left-icon.svg" alt="icon"></div>`; 

    let allSlides = this.slides.map(item => createElement(
          `<div class="carousel__slide" data-id="${item.id}">
            <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${item.price.toFixed(2)}</span>
              <div class="carousel__title">${item.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div>`));

    this.carouselInner.append(...allSlides);

    this.carouselInner.addEventListener('click', this.onClick);

    this.carousel.insertAdjacentHTML('afterbegin', buttonModel);

    this.carousel.append(this.carouselInner);

    this.carousel.addEventListener('click', this.moveSlide);

    return this.carousel;
  }

  onClick = (event) => {

    if (!event.target.closest('.carousel__button')) { return;}

    let target = event.target.closest('.carousel__slide');

    const ev = new CustomEvent('product-add', {
      detail: target.dataset.id, 
      bubbles: true});

    target.dispatchEvent(ev);

  }

  moveSlide = (event) => {
  
    if (!event.target.closest('.carousel__arrow')) {return;}

    let target = event.target.closest('.carousel__arrow');
    let silderWidth = target.closest('.carousel').querySelector('.carousel__img').offsetWidth;
    let sliderInner = target.closest('.carousel').querySelector('.carousel__inner');

    if (target.classList.contains("carousel__arrow_left")) {
      this.indentSlide += silderWidth; 
      this.currentPositionSlider--; 
    } else if (target.classList.contains("carousel__arrow_right")) {
      this.indentSlide -= silderWidth; 
      this.currentPositionSlider++;
    }

    sliderInner.style.transform = `translateX(${this.indentSlide}px)`;

    if (this.currentPositionSlider <= 1) {
      target.closest('.carousel').querySelector('.carousel__arrow_left').style.display = 'none';
    } else if (this.currentPositionSlider == this.sliderCount) {
      target.closest('.carousel').querySelector('.carousel__arrow_right').style.display = 'none';
    } else {
      target.closest('.carousel').querySelector('.carousel__arrow_left').style.display = '';
      target.closest('.carousel').querySelector('.carousel__arrow_right').style.display = '';
    }

  }

}

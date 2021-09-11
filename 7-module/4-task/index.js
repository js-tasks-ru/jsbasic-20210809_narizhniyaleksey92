import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.elem = this.render();
  }

  render() {
    let steps = '';

    for (let i = 0; i < this.steps; i++) {
      if (i == 0) { steps += '<span class="slider__step-active"></span>';
      } else { steps += '<span></span>';}
            
    }

    this.slider = createElement(`
        <div class="slider">
          <div class="slider__thumb" style="left: 50%;">
            <span class="slider__value">2</span>
          </div>
          <div class="slider__progress" style="width: 50%;"></div>
          <div class="slider__steps">
          ${steps}
          </div>
        </div>`);
     

    this.thumb = this.slider.querySelector('.slider__thumb');

    this.thumb.ondragstart = function() { return false;};

    this.thumb.addEventListener('pointerdown', this.sliderDown);  

    this.slider.addEventListener('click', this.sliderJump);  

    return this.slider;
  }




  sliderJump = (event) => {
    let ourSpans = document.body.querySelector('.slider__steps').querySelectorAll('span');
    let mousePosition = event.clientX;
    let longSize = Array.from(ourSpans).map(val => Math.abs(mousePosition - val.getBoundingClientRect().left));
    let minVal = longSize.slice().sort((a, b) => a - b)[0];
    let minIndex = longSize.indexOf(minVal);

    Array.from(ourSpans)
    .map((val, index) => index == minIndex ? val.classList.add('slider__step-active') : val.classList.remove('slider__step-active'));


    let value = this.elem.querySelector('.slider__value');
    value.textContent = minIndex;

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');

    let leftPercents = minIndex / (this.steps - 1) * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;

    const ev = new CustomEvent('slider-change', {
      detail: minIndex,
      bubbles: true
    });

    this.elem.dispatchEvent(ev);

  }


  sliderDown = (event) => {
    event.preventDefault();

    this.slider.classList.add('slider_dragging');
    
    this.slider.addEventListener('pointermove', this.sliderMove);
    this.slider.addEventListener('pointerup', this.sliderUp);

  }


  sliderMove = (event) => {
    event.preventDefault();

    let newLeft = event.clientX - this.slider.getBoundingClientRect().left;

    if (newLeft < 0) {
      newLeft = 0;
    }

    let rightEdge = this.slider.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    let leftRelative = newLeft / this.slider.offsetWidth;
    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    this.valueslider = document.body.querySelector('.slider__value');
    this.valueslider.textContent = value;

    let leftPercents = leftRelative * 100;

    let ourSpans = document.body.querySelector('.slider__steps').querySelectorAll('span');
    Array.from(ourSpans)
    .map((val, index) => index == value ? val.classList.add('slider__step-active') : val.classList.remove('slider__step-active'));
    
    this.progress = this.slider.querySelector('.slider__progress');
    
    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

  }

  sliderUp = () => {
    let currentSlidePos = +this.valueslider.textContent;
    let leftPercents = currentSlidePos / (this.steps - 1) * 100;

    this.thumb.style.left = `${leftPercents}%`;
    this.progress.style.width = `${leftPercents}%`;

    this.slider.removeEventListener('pointerup', this.sliderUp);
    this.slider.removeEventListener('pointermove', this.sliderMove);
    this.slider.classList.remove('slider_dragging');

    const ev = new CustomEvent('slider-change', {
      detail: currentSlidePos,
      bubbles: true
    });

    this.slider.dispatchEvent(ev);
  }


}

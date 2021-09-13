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
      
    this.slider.addEventListener('click', this.sliderMove);  

    return this.slider;
  }

  sliderMove = (event) => {
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


}

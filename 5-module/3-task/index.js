function initCarousel() {
  let slider = document.querySelector('.container');
  let arrowLeft = slider.querySelector('.carousel__arrow_left');
  let arrowRight = slider.querySelector('.carousel__arrow_right');
  let sliderInner = slider.querySelector('.carousel__inner');
  let silderWidth = sliderInner.offsetWidth;
  let sliderCount = slider.querySelectorAll('.carousel__slide').length;
  let currentPositionSlider = 1;
  let indentSlide = 0;

  arrowLeft.style.display = 'none';

  function moveSlide(event) {
    let target = event.target.closest('.carousel__arrow');

    if (target.classList.contains("carousel__arrow_left")) {
      indentSlide += silderWidth; 
      currentPositionSlider--; 
    } else if (target.classList.contains("carousel__arrow_right")) {
      indentSlide -= silderWidth; 
      currentPositionSlider++;
    }

    sliderInner.style.transform = `translateX(${indentSlide}px)`;

    if (currentPositionSlider <= 1) {
      arrowLeft.style.display = 'none';
    } else if (currentPositionSlider == sliderCount) {
      arrowRight.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
      arrowRight.style.display = '';
    }

  }

  arrowLeft.addEventListener('click', moveSlide);
  arrowRight.addEventListener('click', moveSlide);
}

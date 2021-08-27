function toggleText() {
  let buttonHidden = document.querySelector('.toggle-text-button');
  
  function swither () {
    let divSwitcher = document.querySelector('#text');

    divSwitcher.hidden = !divSwitcher.hidden;
  }

  buttonHidden.addEventListener('click', swither);
}

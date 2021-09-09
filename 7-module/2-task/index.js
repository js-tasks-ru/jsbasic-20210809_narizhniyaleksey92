import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this._modelModal = this.render();
  }

  render () {
    this.mod = createElement(`<div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
          Вот сюда нужно добавлять заголовок
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>`);

    return this.mod;
  }


  closeByX = (event) => {
    if (!event.target.closest('.modal__close')) {return;}
    this.close();
    this._modelModal.removeEventListener('click', this.closeByX);
  }

  closeByEscape = (event) => {
    if (event.code == 'Escape') {
      this.close();
      document.removeEventListener('keydown', this.closeByEscape);
    }
  }

  setTitle(str) {
    if (document.body.querySelector('.modal__title')) {
      let title = document.body.querySelector('.modal__title');
      title.textContent = str;
    } else {
      this.modTitle = this._modelModal.querySelector('.modal__title');
      this.modTitle.textContent = str;
    }

  }

  setBody (node) {
    if (document.body.querySelector('.modal__body')) {
      let body = document.body.querySelector('.modal__body');
      body.innerHTML = '';
      body.append(node);
    } else {
      this.modBody = this._modelModal.querySelector('.modal__body');
      this.modBody.innerHTML = '';
      this.modBody.append(node);
    }
   
  }

  open () {
    document.body.classList.add('is-modal-open');

    this._modelModal.addEventListener('click', this.closeByX);

    document.addEventListener('keydown', this.closeByEscape);

    document.body.append(this._modelModal);
  }

  close () {
    document.body.classList.remove('is-modal-open');
    this._modelModal.remove();
  }

}

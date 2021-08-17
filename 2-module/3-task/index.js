let calculator = {
  firstNumber: 0,
  secondNumber: 0,
  read(numb1, numb2) {
     this.firstNumber = numb1;
     this.secondNumber = numb2;
  },
  sum() {
     return this.firstNumber + this.secondNumber;
  },
  mul() {
     return this.firstNumber * this.secondNumber;
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально

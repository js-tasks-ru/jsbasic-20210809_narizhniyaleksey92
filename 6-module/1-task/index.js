/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
//  */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.render();
  }

  deleteRow(event) {
    if (event.target.tagName != 'BUTTON') {return;}

    let target = event.target.closest('tr');
    target.remove();
  }

  render() {
    let table = document.createElement('table');

    let tableHead = "<thead><tr><th>Имя</th><th>Возраст</th><th>Зарплата</th><th>Город</th><th></th></tr></thead>";
    table.innerHTML = tableHead;

    let tableBody = this.rows.map(val => { return `<tr><td>${val.name}</td><td>${val.age}</td><td>${val.salary}</td><td>${val.city}</td><td><button>X</button></td></tr>`; }).join('');
    table.innerHTML += `<tbody>${tableBody}</tbody>`;

    table.addEventListener('click', this.deleteRow);

    return table;
  }
}
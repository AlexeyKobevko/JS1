'use strict';

/**
 * @property {HTMLElement} gameContainerEl Контейнер игры (DOM элемент).
 */
const chess = {
  gameContainerEl: document.getElementById('game'),
  /**
   * Метод отображения карты (игрового поля).
   */
  renderMap() {
    const cols = [0, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 0];
    const rows = [0, '8', '7', '6', '5', '4', '3', '2', '1', 0];

    for (let row = 0; row < 10; row++) {
      const tr = document.createElement('tr');
      this.gameContainerEl.appendChild(tr);

      for (let col = 0; col < 10; col++) {
          const td = document.createElement('td');
          tr.appendChild(td);

          if ((row === 0 || row === rows.length - 1) && cols[col] !== 0) {
            td.innerText = cols[col];
          }

          if ((col === 0 || col === cols.length - 1) && rows[row] !== 0) {
            td.innerText = rows[row];
          }

          if (this.isCellIsBlack(row, col) && rows[row] !== 0 && cols[col] !== 0) {
            td.style.backgroundColor = 'grey';
          }
      }
    }
  },

  /**
   * Определяет является ли ячейка черной.
   * @param {int} rowNum Номер в строке.
   * @param {int} colNum Номер в колонке.
   * @returns {boolean} true, если ячейка должна быть черной, иначе false.
   */
  isCellIsBlack(rowNum, colNum) {
    if ((rowNum % 2 === 0 && colNum % 2 === 0) || (rowNum % 2 !== 0 && colNum % 2 !== 0)) {
      return false;
    } else return true;

  },
};

// Запускаем метод отображения карты.
chess.renderMap();
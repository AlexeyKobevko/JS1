'use strict';

/**
 * @property {HTMLElement} gameContainerEl Контейнер игры (DOM элемент).
 */
const chess = {
  gameContainerEl: document.getElementById('game'),
  figures: [
        {name: 'K', color: 'w', pos: 'e1'},
        {name: 'Q', color: 'w', pos: 'd1'},
        {name: 'R', color: 'w', pos: 'a1'},
        {name: 'R', color: 'w', pos: 'h1'},
        {name: 'N', color: 'w', pos: 'b1'},
        {name: 'N', color: 'w', pos: 'g1'},
        {name: 'B', color: 'w', pos: 'c1'},
        {name: 'B', color: 'w', pos: 'f1'},
        {name: 'p', color: 'w', pos: 'a2'},
        {name: 'p', color: 'w', pos: 'b2'},
        {name: 'p', color: 'w', pos: 'c2'},
        {name: 'p', color: 'w', pos: 'd2'},
        {name: 'p', color: 'w', pos: 'e2'},
        {name: 'p', color: 'w', pos: 'f2'},
        {name: 'p', color: 'w', pos: 'g2'},
        {name: 'p', color: 'w', pos: 'h2'},

        {name: 'K', color: 'b', pos: 'e8'},
        {name: 'Q', color: 'b', pos: 'd8'},
        {name: 'R', color: 'b', pos: 'a8'},
        {name: 'R', color: 'b', pos: 'h8'},
        {name: 'N', color: 'b', pos: 'b8'},
        {name: 'N', color: 'b', pos: 'g8'},
        {name: 'B', color: 'b', pos: 'c8'},
        {name: 'B', color: 'b', pos: 'f8'},
        {name: 'p', color: 'b', pos: 'a7'},
        {name: 'p', color: 'b', pos: 'b7'},
        {name: 'p', color: 'b', pos: 'c7'},
        {name: 'p', color: 'b', pos: 'd7'},
        {name: 'p', color: 'b', pos: 'e7'},
        {name: 'p', color: 'b', pos: 'f7'},
        {name: 'p', color: 'b', pos: 'g7'},
        {name: 'p', color: 'b', pos: 'h7'},
    ],
  figureHtml: {
        Kw: '&#9812;',
        Qw: '&#9813;',
        Rw: '&#9814;',
        Bw: '&#9815;',
        Nw: '&#9816;',
        pw: '&#9817;',

        Kb: '&#9818;',
        Qb: '&#9819;',
        Rb: '&#9820;',
        Bb: '&#9821;',
        Nb: '&#9822;',
        pb: '&#9823;',
    },
  renderFigure () {
    for (let i = 0; i < 32; i++) {
      const figure = this.figures[i];
      const figureHtmlProperty = figure.name + figure.color;
      const figureCode = this.figureHtml[figureHtmlProperty];
      document.querySelector(`[data-pos = ${figure.pos}]`).innerHTML = figureCode;
    }
  },
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
chess.renderFigure ();
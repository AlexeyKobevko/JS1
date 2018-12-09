'use strict';

/**
 * @property {Object} settings Объект с настройками галереи.
 * @property {string} settings.previewSelector Селектор обертки для миниатюр галереи.
 * @property {string} settings.openedImageWrapperClass Класс для обертки открытой картинки.
 * @property {string} settings.openedImageClass Класс открытой картинки.
 * @property {string} settings.openedImageScreenClass Класс для ширмы открытой картинки.
 * @property {string} settings.openedImageCloseBtnClass Класс для картинки кнопки закрыть.
 * @property {string} settings.openedImageCloseBtnSrc Путь до картинки кнопки открыть.
 */
const gallery = {
  settings: {
    previewSelector: '.mySuperGallery',
    openedImageWrapperClass: 'galleryWrapper',
    openedImageClass: 'galleryWrapper__image',
    openedImageScreenClass: 'galleryWrapper__screen',
    openedImageCloseBtnClass: 'galleryWrapper__close',
    openedImageCloseBtnSrc: 'images/gallery/close.png',
    openedImageBungSrc: 'images/gallery/no_image.png',
    openedImageBackBtnClass: 'galleryWrapper__back',
    openedImageNextBtnClass: 'galleryWrapper__next',
    openedImageBackBtnSrc: 'images/gallery/back.png',
    openedImageNextBtnSrc: 'images/gallery/next.png',
  },

  openedImageEl: '',

  /**
   * Инициализирует галерею, ставит обработчик события.
   * @param {Object} userSettings Объект настроек для галереи.
   */
  init(userSettings = {}) {
    // Записываем настройки, которые передал пользователь в наши настройки.
    Object.assign(this.settings, userSettings);

    // Находим элемент, где будут превью картинок и ставим обработчик на этот элемент,
    // при клике на этот элемент вызовем функцию containerClickHandler в нашем объекте
    // gallery и передадим туда событие MouseEvent, которое случилось.
    document
    .querySelector(this.settings.previewSelector)
    .addEventListener('click', event => this.containerClickHandler(event));
  },

  /**
   * Обработчик события клика для открытия картинки.
   * @param {MouseEvent} event Событие клики мышью.
   * @param {HTMLElement} event.target Целевой объект, куда был произведен клик.
   */
  containerClickHandler(event) {
    // Если целевой тег не был картинкой, то ничего не делаем, просто завершаем функцию.
    if (event.target.tagName !== 'IMG') {
      return;
    }
    // Открываем картинку с полученным из целевого тега (data-full_image_url аттрибут).
    this.openImage(event.target.dataset.full_image_url);

    this.openedImageEl = event.target;
  },

  /**
   * Открывает картинку.
   * @param {string} src Ссылка на картинку, которую надо открыть.
   */
  openImage(src) {
    // Получаем контейнер для открытой картинки, в нем находим тег img и ставим ему нужный src.

    this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`).src = src;
  },

  /**
   * Возвращает следующий элемент (картинку) от открытой или первую картинку в контейнере,
   * если текущая открытая картинка последняя.
   * @returns {String} Следующую картинку от текущей открытой.
   */
  getNextImage() {
    this.openedImageEl = this.openedImageEl.nextElementSibling;
    if (this.openedImageEl === null) {
      this.openedImageEl = document.querySelector(this.settings.previewSelector).firstElementChild;
    }
    return this.openedImageEl.dataset.full_image_url;
    // Если элемент справа есть, его и возвращаем, если нет, то берем первый элемент в контейнере миниатюр.
  },

  /**
   * Возвращает предыдущий элемент (картинку) от открытой или последнюю картинку в контейнере,
   * если текущая открытая картинка первая.
   * @returns {String} Предыдущую картинку от текущей открытой.
   */
  getPrevImage() {
    this.openedImageEl = this.openedImageEl.previousElementSibling;
    if (this.openedImageEl === null) {
      this.openedImageEl = document.querySelector(this.settings.previewSelector).lastElementChild;
    }
    return this.openedImageEl.dataset.full_image_url;
    // Если элемент слева есть, его и возвращаем, если нет, то берем последний элемент в контейнере миниатюр.
  },

  /**
   * Возвращает контейнер для открытой картинки, либо создает такой контейнер, если его еще нет.
   * @returns {Element}
   */
  getScreenContainer() {
    // Получаем контейнер для открытой картинки.
    const galleryWrapperElement = document.querySelector(`.${this.settings.openedImageWrapperClass}`);
    // Если контейнер для открытой картинки существует - возвращаем его.
    if (galleryWrapperElement) {
      return galleryWrapperElement;
    }

    // Возвращаем полученный из метода createScreenContainer контейнер.
    return this.createScreenContainer();
  },

  /**
   * Создает контейнер для открытой картинки.
   * @returns {HTMLElement}
   */
  createScreenContainer() {
    // Создаем сам контейнер-обертку и ставим ему класс.
    const galleryWrapperElement = document.createElement('div');
    galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

    // Создаем контейнер занавеса, ставим ему класс и добавляем в контейнер-обертку.
    const galleryScreenElement = document.createElement('div');
    galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
    galleryWrapperElement.appendChild(galleryScreenElement);

    // Создаем картинку для кнопки закрыть, ставим класс, src и добавляем ее в контейнер-обертку.
    const closeImageElement = new Image();
    closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
    closeImageElement.src = this.settings.openedImageCloseBtnSrc;
    closeImageElement.addEventListener('click', () => this.close());
    galleryWrapperElement.appendChild(closeImageElement);

    // Создаем картинку, которую хотим открыть, ставим класс и добавляем ее в контейнер-обертку.
    const image = new Image();
    image.classList.add(this.settings.openedImageClass);
    galleryWrapperElement.appendChild(image);
    image.onerror = () => image.src = this.settings.openedImageBungSrc;

    // Создаём картинку "назад", ставим класс и добавляем её в контейнер-обертку.
    const backImageElement = new Image();
    backImageElement.classList.add(this.settings.openedImageBackBtnClass);
    backImageElement.src = this.settings.openedImageBackBtnSrc;
    backImageElement.addEventListener('click', () => this.openImage(this.getPrevImage()));
    galleryWrapperElement.appendChild(backImageElement);

    // Создаём картинку "вперёд", ставим класс и добавляем её в контейнер-обертку.
    const nextImageElement = new Image();
    nextImageElement.classList.add(this.settings.openedImageNextBtnClass);
    nextImageElement.src = this.settings.openedImageNextBtnSrc;
    nextImageElement.addEventListener('click', () => this.openImage(this.getNextImage()));
    galleryWrapperElement.appendChild(nextImageElement);

    // Добавляем контейнер-обертку в тег body.
    document.body.appendChild(galleryWrapperElement);

    // Возвращаем добавленный в body элемент, наш контейнер-обертку.
    return galleryWrapperElement;
  },

  /**
   * Закрывает (удаляет) контейнер для открытой картинки.
   */
  close() {
    document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
  }
};

// Инициализируем нашу галерею при загрузке страницы.
window.onload = () => gallery.init({previewSelector: '.galleryPreviewsContainer'});
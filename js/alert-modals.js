import {addEscHandler, removeEscHandler} from './escape-press-handler.js';

const errorDownload = document.querySelector('.error-download');
const errorDownloadTitle = errorDownload.querySelector('.error-download__title');

/**
 * Функция отображает модальное окно с ошибкой загрузки данных
 * @param message
 */
export const showErrorDownload = (message) => {
  /**
   * Функция закрытия модального окна ошибки загрузки
   */
  const closeModal = () => {
    errorDownload.classList.add('hidden');
    errorDownload.removeEventListener('click', closeErrorDownload);
    removeEscHandler(closeModal);
  };

  /**
   * Функция вызывает функцию закрытия модального окна ошибки загрузки данных при клике вне границ модального окна
   * @param evt
   */
  function closeErrorDownload(evt) {
    if (evt.target === errorDownload) {
      closeModal();
    }
  }

  addEscHandler(closeModal);
  errorDownload.classList.remove('hidden');
  errorDownloadTitle.textContent = message;
  errorDownload.addEventListener('click', closeErrorDownload);
};


/**
 * Функция отображения модального окна с ошибкой/успехом отправки данных на сервер
 * @param template
 */
export const showMessageModal = (template) => {
  const messageModal = template.cloneNode(true);
  const buttonClose = messageModal.querySelector('button');

  /**
   * Функция вызыввает функцию закрытия модального окна при клике на соответствующую кнопку и при клике вне границ модального окна
   * @param evt
   */
  function onClickModalClose (evt) {
    if (evt.target === messageModal || evt.target === buttonClose) {
      closeModal();
    }
  }

  /**
   * Функция закрытия модального окна ошибки/успеха отправки данных на сервер
   */
  function closeModal () {
    removeEscHandler(closeModal);
    messageModal.removeEventListener('click', onClickModalClose);
    messageModal.remove();
  }

  messageModal.addEventListener('click', onClickModalClose);
  addEscHandler(closeModal);

  document.body.appendChild(messageModal);
};

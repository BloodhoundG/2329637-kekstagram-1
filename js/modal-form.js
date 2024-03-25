import {removeScaleControlListeners, resetControlValue, addScaleControlListeners} from './scale-control.js';
import {initEffectSlider, resetSlider} from './effect-slider.js';
import {resetForm, validateForm} from './validate.js';
import {sendData} from './api.js';
import {addEscHandler, removeEscHandler} from './escape-press-handler.js';
import {showMessageModal} from './alert-modals.js';
import {showDownloadImage} from './preview-image.js';

const effectValue = document.querySelector('.effect-level__value');
const imgUpload = document.querySelector('.img-upload');
const uploadForm = imgUpload.querySelector('#upload-select-image');
const uploadFile = imgUpload.querySelector('#upload-file');
const uploadCloseButton = imgUpload.querySelector('#upload-cancel');
const overlay = imgUpload.querySelector('.img-upload__overlay');
const templateMessageSuccessModal = document
  .querySelector('#success')
  .content
  .querySelector('.success');

const templateMessageErrorModal = document
  .querySelector('#error')
  .content
  .querySelector('.error');

/**
 * Функция закрывает модальное окно при клике на элемене с идентификатором '#upload-cancel'
 */
const onClickModalClose = () => {
  closeModal();
};

/**
 * Функция закрытия модального окна
 */
function closeModal() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadFile.value = '';
  removeScaleControlListeners();
  resetSlider();
  uploadForm.reset();
  resetForm();
  uploadCloseButton.removeEventListener('click', onClickModalClose);
  removeEscHandler(closeModal);
}

const setModalFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      const formData = new FormData(evt.target);

      sendData(formData)
        .then(() => {
          onSuccess();
          showMessageModal(templateMessageSuccessModal);
        })
        .catch(() => {
          showMessageModal(templateMessageErrorModal);
        });
    }
  });
};

/**
 * Функция инициализирует модальное окно загрузки нового изображения
 */
export const initModalForm = () => {
  uploadFile.addEventListener('change', () => {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    uploadCloseButton.addEventListener('click', onClickModalClose);
    effectValue.value = '';
    resetControlValue();
    addScaleControlListeners();
    addEscHandler(closeModal);
    showDownloadImage();
  });

  setModalFormSubmit(closeModal);
  initEffectSlider();
};

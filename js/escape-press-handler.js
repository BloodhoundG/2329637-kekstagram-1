import {isEscapeKey} from './util.js';

let handlerEscStack = [];

/**
 * Функция принимает коллбэк и добавляет его в стэк событий на нажатие Esc
 * @param cb
 */
export const addEscHandler = (cb) => {
  handlerEscStack.push(cb);
};

/**
 * Функция принимает коллбэк и удаляет его из стэка событий
 * @param cb
 */
export const removeEscHandler = (cb) => {
  handlerEscStack = handlerEscStack.filter((item) => cb !== item);
};

document.addEventListener('keydown', (evt) => {
  if (handlerEscStack.length && isEscapeKey(evt)) {
    if (!evt.target.classList.contains('text__hashtags') &&
        !evt.target.classList.contains('text__description')) {
      const cb = handlerEscStack.pop();
      cb();
    }
  }
});

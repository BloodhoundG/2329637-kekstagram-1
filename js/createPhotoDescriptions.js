import {createDescriptionOfPhoto} from './createDescriptionOfPhoto.js';

/**
 * Функция возвращает массив, состоящий из объектов
 * @param number
 * @returns {*[]}
 */
export const createPhotoDescriptions = (number) => {
  const arrayContent = [];

  for (let i = 1 ; i <= number ; i++) {
    arrayContent.push(createDescriptionOfPhoto());
  }
  return arrayContent;
};
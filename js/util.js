'use strict';

(function () {

  /**
     * Выбирает случает элемент из массива, удаляя его для исключения повтора
     * @param {Array} arr - входной массив
     * @return {*} случайный элемент массива
     */
  var getRandomUniqueElementFromArray = function (arr) {
    var randomElement = arr.splice(Math.floor(Math.random() * arr.length), 1);
    return randomElement;
  };

  /**
   * Выбирает случает элемент из массива, допускает повторение
   * @param {Array} arr - входной массив
   * @return {*} случайный элемент массива
   */
  var getRandomElementFromArray = function (arr) {
    var randomElement = arr[Math.floor(Math.random() * arr.length)];
    return randomElement;
  };

  /**
   * Генерирует массив случайной длины, составленный из случайных неповторяющихся элементов
   * @param {integer} maxLength - максимальная длина массива
   * @param {*} incomingArray - массив исходных данных
   * @return {Array} возвращает сгенерированный массив
   */
  var generateArrayWithRandomLength = function (maxLength, incomingArray) {
    var outcomingArray = [];
    var length = Math.floor(Math.random() * maxLength);
    // Если случайная длина окажется больше длины входного массива, сравняем их
    if (length > incomingArray.length) {
      length = incomingArray.length;
    }
    for (var i = 0; i < length; i++) {
      outcomingArray[i] = getRandomUniqueElementFromArray(incomingArray);
    }
    return outcomingArray;
  };

  /**
   * Выбирает случайное число из диапазона чисел
   * @param {integer} min - минимальное число
   * @param {integer} max - максимальное число
   * @return {integer} возвращает случайное число из диапазона
   */
  var getRandomElementFromRange = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  /**
   * Возвращает правильную множественную форму слова по склонениям в зависимости от количества
   * @param {*} forms - массив вариантов склонений
   * @param {*} n - количество
   * @return {string} нужная форма слова
   */
  var getPluralForm = function (forms, n) {
    var idx;
    if (n % 10 === 1 && n % 100 !== 11) {
      idx = 0; // many
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      idx = 1; // few
    } else {
      idx = 2; // one
    }
    return forms[idx] || '';
  };

  window.util = {
    getRandomElementFromRange: getRandomElementFromRange,
    getRandomElementFromArray: getRandomElementFromArray,
    generateArrayWithRandomLength: generateArrayWithRandomLength,
    getPluralForm: getPluralForm,
  };

})();

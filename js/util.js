'use strict';

(function () {

  var quantityDictionary = {
    many: 0,
    few: 1,
    single: 2,
  };

  /**
   * Возвращает правильную множественную форму слова по склонениям в зависимости от количества
   * @param {*} forms - массив вариантов склонений
   * @param {*} n - количество
   * @return {string} нужная форма слова
   */
  var getPluralForm = function (forms, n) {
    var ending;
    if (n % 10 === 1 && n % 100 !== 11) {
      ending = quantityDictionary['many'];
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      ending = quantityDictionary['few'];
    } else {
      ending = quantityDictionary['single'];
    }
    return forms[ending] || '';
  };

  window.util = {
    getPluralForm: getPluralForm,
  };

})();

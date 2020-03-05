'use strict';

(function () {

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
    getPluralForm: getPluralForm,
  };

})();

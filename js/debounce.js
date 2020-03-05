'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  /**
   * Устраняет дребезг
   * @param {Function} cb - действие, для которого необходим дебаунс
   */
  var debounce = function (cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;

})();

'use strict';

(function () {

  var isPageActivated = false;

  /**
   * Устанавливает страницу в неактивное состояние
   */
  var deactivatePage = function () {
    window.map.deactivate();
    window.form.deactivate();
  };

  deactivatePage();

  /**
   * Устанавливает страницу в активное состояние
   */
  var activatePage = function () {
    window.backend.load(window.map.showPins, window.backend.errorHandler);
    window.map.activate();
    window.form.activate();
  };

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    isPageActivated: isPageActivated,
  };

})();

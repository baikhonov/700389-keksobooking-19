'use strict';

(function () {

  var isPageActivated = false;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFiltersForm = map.querySelector('.map__filters');
  var mapFiltersFieldsets = mapFiltersForm.querySelectorAll('.map__filters fieldset');
  var mapFiltersSelects = mapFiltersForm.querySelectorAll('.map__filters select');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('.ad-form #address');

  /**
   * Устанавливает страницу в неактивное состояние
   */
  var deactivatePage = function () {
    map.classList.add('map--faded');
    if (map.querySelector('.map__card')) {
      var mapCard = map.querySelector('.map__card');
      map.removeChild(mapCard);
    }
    mapPinMain.style.left = window.map.pinMain.X_INITIAL + 'px';
    mapPinMain.style.top = window.map.pinMain.Y_INITIAL + 'px';
    var mapPins = map.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      if (mapPins[i].matches('.map__pin') && !mapPins[i].matches('.map__pin--main')) {
        mapPins[i].remove();
      }
    }
    mapFiltersForm.reset();
    mapFiltersSelects.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });
    mapFiltersFieldsets.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'disabled');
    });
    adForm.classList.add('ad-form--disabled');

    adFormFieldsets.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'disabled');
    });
    adFormAddress.setAttribute('readonly', 'readonly');
    adFormAddress.value = (window.map.pinMain.X_INITIAL + window.map.pinMain.OFFSET_X) + ', ' + (window.map.pinMain.Y_INITIAL + window.map.pinMain.OFFSET_Y_INITIAL);
    window.form.correctInitialValues();
  };

  deactivatePage();

  /**
   * Устанавливает страницу в активное состояние
   */
  var activatePage = function () {
    window.backend.load(window.map.showPins, window.backend.errorHandler);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.removeAttribute('disabled');
    });
    mapFiltersSelects.forEach(function (select) {
      select.removeAttribute('disabled');
    });
    mapFiltersFieldsets.forEach(function (fieldset) {
      fieldset.removeAttribute('disabled');
    });
    adFormAddress.value = (window.map.pinMain.X_INITIAL + window.map.pinMain.OFFSET_X) + ', ' + (window.map.pinMain.Y_INITIAL + window.map.pinMain.OFFSET_Y);
  };

  window.main = {
    activatePage: activatePage,
    deactivatePage: deactivatePage,
    isPageActivated: isPageActivated,
  };

})();

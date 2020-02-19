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

  var makePageDefault = function () {
    mapFiltersSelects.forEach(function (select) {
      select.setAttribute('disabled', 'disabled');
    });
    mapFiltersFieldsets.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'disabled');
    });
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', 'disabled');
    });
    adFormAddress.setAttribute('readonly', 'readonly');
    adFormAddress.value = (window.map.pinMain.X_INITIAL + window.map.pinMain.OFFSET_X) + ', ' + (window.map.pinMain.Y_INITIAL + window.map.pinMain.OFFSET_Y_INITIAL);
    window.form.capacityNumber[2].selected = true;
  };

  makePageDefault();

  var deactivatePage = function () {
    isPageActivated = false;
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
    adForm.classList.add('ad-form--disabled');
  };

  var errorHandler = function (errorMessage) {
    var message = document.createElement('div');
    message.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    message.style.position = 'absolute';
    message.style.left = 0;
    message.style.right = 0;
    message.style.fontSize = '30px';

    message.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', message);
  };

  var pageActivateHandler = function () {
    isPageActivated = true;
    window.backend.load(window.map.showPins, errorHandler);
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
    pageActivateHandler: pageActivateHandler,
    makePageDefault: makePageDefault,
    deactivatePage: deactivatePage,
    isPageActivated: isPageActivated,
  };


})();

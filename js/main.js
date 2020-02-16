'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFiltersFieldsets = mapFiltersContainer.querySelectorAll('.map__filters fieldset');
  var mapFiltersSelects = mapFiltersContainer.querySelectorAll('.map__filters select');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('.ad-form #address');

  var deactivatePage = function () {
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

  deactivatePage();

  var pageActivateHandler = function () {
    window.map.showPins();
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
  };


})();

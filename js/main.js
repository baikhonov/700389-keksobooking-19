'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapFiltersFieldsets = mapFiltersContainer.querySelectorAll('.map__filters fieldset');
  var mapFiltersSelects = mapFiltersContainer.querySelectorAll('.map__filters select');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var adFormAddress = adForm.querySelector('.ad-form #address');

  var deactivatePage = function () {
    // подумать об универсальной функции-переключателе элементов (вкл-выкл)
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
    adFormAddress.value = (window.data.PinMain.X_INITIAL + window.data.PinMain.OFFSET_X) + ', ' + (window.data.PinMain.Y_INITIAL + window.data.PinMain.OFFSET_Y_INITIAL);
  };

  deactivatePage();

  var pageActivateHandler = function () {
    mapPins.appendChild(window.pin.fragment);
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
    adFormAddress.value = (window.data.PinMain.X_INITIAL + window.data.PinMain.OFFSET_X) + ', ' + (window.data.PinMain.Y_INITIAL + window.data.PinMain.OFFSET_Y);
  };

  window.main = {
    map: map,
    pageActivateHandler: pageActivateHandler,
  };


})();

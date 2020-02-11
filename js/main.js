'use strict';

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
  adFormAddress.value = (PinMain.X_INITIAL + PinMain.OFFSET_X) + ', ' + (PinMain.Y_INITIAL + PinMain.OFFSET_Y_INITIAL);
};

deactivatePage();

var pageActivateHandler = function () {
  mapPins.appendChild(fragment);
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
  adFormAddress.value = (PinMain.X_INITIAL + PinMain.OFFSET_X) + ', ' + (PinMain.Y_INITIAL + PinMain.OFFSET_Y);
};

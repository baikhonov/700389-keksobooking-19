'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var capacityNumber = adForm.querySelector('#capacity');
  var housesPricesValues = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var roomCapacityValues = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var selectsRoomCapacityValidateHandler = function () {
    var rooms = parseInt(roomNumber.value, 10);
    var guests = parseInt(capacityNumber.value, 10);
    if (roomCapacityValues[rooms].indexOf(guests) === -1) {
      capacityNumber.setCustomValidity('Количество гостей не соответствует количеству комнат');
    } else {
      capacityNumber.setCustomValidity('');
    }
  };

  roomNumber.addEventListener('change', selectsRoomCapacityValidateHandler);
  capacityNumber.addEventListener('change', selectsRoomCapacityValidateHandler);

  var typeOfHouse = adForm.querySelector('#type');
  var priceOfHouse = adForm.querySelector('#price');

  var selectHouseValidateHandler = function () {
    var typeOfHouseValue = typeOfHouse.value;
    priceOfHouse.setAttribute('placeholder', housesPricesValues[typeOfHouseValue]);
    priceOfHouse.setAttribute('min', housesPricesValues[typeOfHouseValue]);
  };

  typeOfHouse.addEventListener('change', selectHouseValidateHandler);
  priceOfHouse.addEventListener('change', selectHouseValidateHandler);

  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  var selectTimeValidateHandler = function (evt) {
    if (evt.target.matches('#timein')) {
      timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
    } else {
      timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
    }
  };

  timeInSelect.addEventListener('change', selectTimeValidateHandler);
  timeOutSelect.addEventListener('change', selectTimeValidateHandler);

  window.form = {
    capacityNumber: capacityNumber,
  };

})();

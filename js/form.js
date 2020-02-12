'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('#room_number');
  var capacityNumber = adForm.querySelector('#capacity');

  var selectsRoomCapacityValidateHandler = function () {
    var rooms = parseInt(roomNumber.value, 10);
    var guests = parseInt(capacityNumber.value, 10);
    var roomCapacityValues = {
      1: [1],
      2: [1, 2],
      3: [1, 2, 3],
      100: [0],
    };
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

  var selectTypeOfHouseValidateHandler = function () {
    var typeOfHouseValue = typeOfHouse.value;
    // подумать, как переписать с использованием объекта
    switch (typeOfHouseValue) {
      case 'bungalo':
        priceOfHouse.setAttribute('placeholder', '0');
        priceOfHouse.setAttribute('min', '0');
        break;
      case 'flat':
        priceOfHouse.setAttribute('placeholder', '1000');
        priceOfHouse.setAttribute('min', '1000');
        break;
      case 'house':
        priceOfHouse.setAttribute('placeholder', '5000');
        priceOfHouse.setAttribute('min', '5000');
        break;
      case 'palace':
        priceOfHouse.setAttribute('placeholder', '10000');
        priceOfHouse.setAttribute('min', '10000');
        break;
    }
  };

  typeOfHouse.addEventListener('change', selectTypeOfHouseValidateHandler);

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

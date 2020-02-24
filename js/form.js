'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
  var adFormResetButton = adForm.querySelector('.ad-form__reset');
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

  var main = document.querySelector('main');

  var showMessage = function (messageTemplate) {
    var messageElement = messageTemplate.cloneNode(true);
    main.appendChild(messageElement);
    var messageKeydownHandler = function (evt) {
      if (evt.key === 'Escape') {
        main.removeChild(messageElement);
        document.removeEventListener('keydown', messageKeydownHandler);
      }
    };
    var messageClickHandler = function (evt) {
      if (evt.target.closest('div')) {
        main.removeChild(messageElement);
        document.removeEventListener('click', messageClickHandler);
      }
    };
    document.addEventListener('keydown', messageKeydownHandler);
    document.addEventListener('click', messageClickHandler);
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

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), function () {
      adForm.reset();
      window.main.deactivatePage();
      window.main.isPageActivated = false;
    });
  });

  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    window.main.deactivatePage();
    window.main.isPageActivated = false;
  };

  adFormResetButton.addEventListener('click', resetButtonClickHandler);

  window.form = {
    capacityNumber: capacityNumber,
    showMessage: showMessage,
  };

})();

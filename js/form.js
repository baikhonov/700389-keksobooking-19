'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('.ad-form #address');
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
    var messageClickHandler = function () {
      main.removeChild(messageElement);
      document.removeEventListener('keydown', messageClickHandler);
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

  adForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adForm), function () {
      // здесь будет выводиться сообщение о статусе операции
      adForm.reset();
      window.main.makePageDefault();
      window.main.deactivatePage();
    }, errorHandler);
    evt.preventDefault();
  });

  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    adForm.reset();
    capacityNumber[2].selected = true;
    if (map.querySelector('.map__card')) {
      var mapCard = map.querySelector('.map__card');
      map.removeChild(mapCard);
    }
    var mapPins = map.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      if (mapPins[i].matches('.map__pin') && !mapPins[i].matches('.map__pin--main')) {
        mapPins[i].remove();
      }
    }
    mapPinMain.style.left = window.map.pinMain.X_INITIAL + 'px';
    mapPinMain.style.top = window.map.pinMain.Y_INITIAL + 'px';
    adFormAddress.value = (window.map.pinMain.X_INITIAL + window.map.pinMain.OFFSET_X) + ', ' + (window.map.pinMain.Y_INITIAL + window.map.pinMain.OFFSET_Y_INITIAL);
    adFormResetButton.removeEventListener('click', resetButtonClickHandler);
  };

  adFormResetButton.addEventListener('click', resetButtonClickHandler);

  window.form = {
    capacityNumber: capacityNumber,
    showMessage: showMessage,
    resetButtonClickHandler: resetButtonClickHandler
  };

})();

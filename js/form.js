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
  var messageSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
  var messageErrorTemplate = document.querySelector('#error').content.querySelector('.error');

  /**
   * Отображает сообщение со статусом отправки
   * @param {*} messageTemplate - шаблон сообщения
   */
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

  /**
   * Валидатор изменения количества комнат и гостей
   */
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

  /**
   * Валидатор изменения минимальной цены и плейсхолдера в зависимости от типа жилья
   */
  var selectHouseValidateHandler = function () {
    var typeOfHouseValue = typeOfHouse.value;
    priceOfHouse.setAttribute('placeholder', housesPricesValues[typeOfHouseValue]);
    priceOfHouse.setAttribute('min', housesPricesValues[typeOfHouseValue]);
  };

  typeOfHouse.addEventListener('change', selectHouseValidateHandler);
  priceOfHouse.addEventListener('change', selectHouseValidateHandler);

  var timeInSelect = adForm.querySelector('#timein');
  var timeOutSelect = adForm.querySelector('#timeout');

  /**
   * Валидатор изменения времени заезда/выезда
   * @param {*} evt - событие
   */
  var selectTimeValidateHandler = function (evt) {
    if (evt.target.matches('#timein')) {
      timeOutSelect.selectedIndex = timeInSelect.selectedIndex;
    } else {
      timeInSelect.selectedIndex = timeOutSelect.selectedIndex;
    }
  };

  timeInSelect.addEventListener('change', selectTimeValidateHandler);
  timeOutSelect.addEventListener('change', selectTimeValidateHandler);

  /**
   * Установка корректных значений полей при загрузке страницы
   */
  var correctInitialValues = function () {
    capacityNumber[2].selected = true;
    priceOfHouse.setAttribute('placeholder', housesPricesValues[typeOfHouse.value]);
    priceOfHouse.setAttribute('min', housesPricesValues[typeOfHouse.value]);
  };

  /**
   * Действия при успешной отправке формы
   */
  var formSubmitSuccess = function () {
    adForm.reset();
    window.main.deactivatePage();
    window.main.isPageActivated = false;
    showMessage(messageSuccessTemplate);
  };

  /**
   * Действия в случае неуспешной отправки формы
   */
  var formSubmitError = function () {
    showMessage(messageErrorTemplate);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), formSubmitSuccess, formSubmitError);
  });

  /**
   * Обработчик сброса данных формы
   * @param {*} evt - событие
   */
  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    window.main.deactivatePage();
    window.main.isPageActivated = false;
  };

  adFormResetButton.addEventListener('click', resetButtonClickHandler);

  window.form = {
    correctInitialValues: correctInitialValues,
  };

})();

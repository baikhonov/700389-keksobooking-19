'use strict';

(function () {

  var MAX_PINS_COUNT = 5;
  var mapPins = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin')
    .content.
    querySelector('.map__pin');

  /**
   * Создаёт DOM-элемент метки на карте для последующего добавления на карту
   * @param {*} mapPin - шаблон разметки, который будет заполняться данными
   * @param {integer} pinNumber - номер метки
   * @return {*} шаблон метки с заполненными данными
   */
  var renderPin = function (mapPin, pinNumber) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.classList.add('map__pin--secondary');
    mapPinElement.querySelector('img').src = mapPin.author.avatar;
    mapPinElement.querySelector('img').alt = mapPin.offer.title;
    mapPinElement.style = 'left: ' + (mapPin.location.x - window.map.pin.OFFSET_X) + 'px; top: ' + (mapPin.location.y - window.map.pin.OFFSET_Y) + 'px;';
    mapPinElement.dataset.number = pinNumber;

    return mapPinElement;
  };

  var renderPins = function (ads) {
    if (ads.length > MAX_PINS_COUNT) {
      ads = ads.slice(0, MAX_PINS_COUNT);
    }
    // console.log(ads);
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad, index) {
      fragment.appendChild(renderPin(ad, index));
    });
    mapPins.appendChild(fragment);
  };

  var removePins = function () {
    var pinsList = document.querySelectorAll('.map__pin--secondary');
    Array.from(pinsList).map(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    render: renderPins,
    removeAll: removePins,
  };

})();

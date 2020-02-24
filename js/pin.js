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

  var pinsList = document.createElement('div');

  var renderPins = function (ads) {
    var maxPinsCount = (ads.length > MAX_PINS_COUNT) ? MAX_PINS_COUNT : ads.length;
    pinsList.textContent = '';
    // var fragment = document.createDocumentFragment();
    for (var i = 0; i < maxPinsCount; i++) {
      pinsList.appendChild(renderPin(ads[i], i));
      // fragment.appendChild(renderPin(ads[i], i));
    }
    // pinsList.appendChild(fragment);
    mapPins.appendChild(pinsList);
    // mapPins.appendChild(fragment);
  };

  window.pin = {
    render: renderPins,
  };

})();

'use strict';

(function () {

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
    mapPinElement.querySelector('img').src = mapPin.author.avatar;
    mapPinElement.querySelector('img').alt = mapPin.offer.title;
    mapPinElement.style = 'left: ' + (mapPin.location.x - window.map.pin.OFFSET_X) + 'px; top: ' + (mapPin.location.y - window.map.pin.OFFSET_Y) + 'px;';
    mapPinElement.dataset.number = pinNumber;

    return mapPinElement;
  };

  window.pin = {
    render: renderPin
  };

})();

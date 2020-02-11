'use strict';

var mapPinTemplate = document.querySelector('#pin')
  .content.
  querySelector('.map__pin');

/**
 * Создаёт DOM-элемент метки на карте для последующего добавления на карту
 * @param {*} mapPin - шаблон разметки, который будет заполняться данными
 * @return {*} шаблон метки с заполненными данными
 */
var renderMapPin = function (mapPin) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').src = mapPin.author.avatar;
  mapPinElement.querySelector('img').alt = mapPin.offer.title;
  mapPinElement.style = 'left: ' + (mapPin.location.x - Pin.OFFSET_X) + 'px; top: ' + (mapPin.location.y - Pin.OFFSET_Y) + 'px;';
  return mapPinElement;
};

var fragment = document.createDocumentFragment();
ads.forEach(function (ad) {
  fragment.appendChild(renderMapPin(ad));
});


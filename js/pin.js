'use strict';

(function () {

  var MAX_PINS_COUNT = 5;
  var Pin = {
    OFFSET_X: 25,
    OFFSET_Y: 70,
  };
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
  var renderPin = function (mapPin) {
    var mapPinElement = mapPinTemplate.cloneNode(true);
    mapPinElement.classList.add('map__pin--secondary');
    mapPinElement.querySelector('img').src = mapPin.author.avatar;
    mapPinElement.querySelector('img').alt = mapPin.offer.title;
    mapPinElement.style = 'left: ' + (mapPin.location.x - Pin.OFFSET_X) + 'px; top: ' + (mapPin.location.y - Pin.OFFSET_Y) + 'px;';

    mapPinElement.addEventListener('mousedown', mapPinElementMousedown);
    function mapPinElementMousedown(evt) {
      if (evt.button === 0 && !mapPinElement.classList.contains('map__pin--active')) {
        window.card.show(mapPin);
        mapPinElement.classList.add('map__pin--active');
      }
    }

    mapPinElement.addEventListener('keydown', mapPinElementKeydown);
    function mapPinElementKeydown(evt) {
      if (evt.key === 'Enter' && !mapPinElement.classList.contains('map__pin--active')) {
        window.card.show(mapPin);
        mapPinElement.classList.add('map__pin--active');
      }
    }

    return mapPinElement;
  };

  /**
   * Прорисовывает метки на карте
   * @param {*} ads - массив объявлений
   */
  var renderPins = function (ads) {
    if (ads.length > MAX_PINS_COUNT) {
      ads = ads.slice(0, MAX_PINS_COUNT);
    }
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      if (ad.offer) {
        fragment.appendChild(renderPin(ad));
      }
    });
    mapPins.appendChild(fragment);
  };

  /**
   * Удаляет класс активности у меток
   */
  var removeActiveClass = function () {
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };


  /**
   * Зачищает метки на карте
   */
  var removePins = function () {
    var pinsList = document.querySelectorAll('.map__pin--secondary');
    pinsList.forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    render: renderPins,
    removeActiveClass: removeActiveClass,
    removeAll: removePins,
  };

})();

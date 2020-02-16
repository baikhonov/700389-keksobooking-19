'use strict';

(function () {

  var TYPES_OF_HOUSE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };
  var TIME_CHECKING_CHECKOUT = [
    '12:00',
    '13:00',
    '14:00',
  ];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var PHOTOS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
  ];
  var Coordinates = {
    X_START: 0,
    X_END: 1200,
    Y_START: 130,
    Y_END: 630,
  };
  var Price = {
    MIN: 100,
    MAX: 100000,
  };
  var Rooms = {
    MIN: 1,
    MAX: 5,
  };
  var Guests = {
    MIN: 1,
    MAX: 5,
  };
  var MAX_FEATURES = 6;
  var MAX_PHOTOS = 3;

  /**
   * Генерирует объект объявления из набора данных
   * @param {integer} counter - порядковый номер объявления
   * @return {Object} возвращает объект
   */
  var generateRandomAd = function (counter) {
    var x = window.util.getRandomElementFromRange(Coordinates.X_START, Coordinates.X_END);
    var y = window.util.getRandomElementFromRange(Coordinates.Y_START, Coordinates.Y_END);
    return {
      'author': {
        'avatar': 'img/avatars/user0' + counter + '.png',
      },
      'offer': {
        'title': 'Тестовый заголовок',
        'address': x + ', ' + y,
        'price': window.util.getRandomElementFromRange(Price.MIN, Price.MAX),
        'type': window.util.getRandomElementFromArray(Object.keys(TYPES_OF_HOUSE)),
        'rooms': window.util.getRandomElementFromRange(Rooms.MIN, Rooms.MAX),
        'guests': window.util.getRandomElementFromRange(Guests.MIN, Guests.MAX),
        'checkin': window.util.getRandomElementFromArray(TIME_CHECKING_CHECKOUT),
        'checkout': window.util.getRandomElementFromArray(TIME_CHECKING_CHECKOUT),
        'features': window.util.generateArrayWithRandomLength(MAX_FEATURES, FEATURES.slice()),
        'description': 'Тестовое описание',
        'photos': window.util.generateArrayWithRandomLength(MAX_PHOTOS, PHOTOS.slice())
      },
      'location': {
        'x': x,
        'y': y,
      }
    };
  };

  /**
   * Создаёт набор тестовых объявлений
   * @param {*} count - желаемое количество объявлений
   * @return {Array} массив тестовых объявлений
   */
  var generateAd = function (count) {
    var arr = [];
    for (var i = 1; i <= count; i++) {
      arr.push(generateRandomAd(i));
    }
    return arr;
  };

  window.data = {
    generateAd: generateAd,
  };

})();

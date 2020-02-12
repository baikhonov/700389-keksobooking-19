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
  var Pin = {
    OFFSET_X: 25,
    OFFSET_Y: 70,
  };
  var PinMain = {
    X_INITIAL: 570,
    Y_INITIAL: 375,
    OFFSET_X: 32,
    OFFSET_Y: 87,
    OFFSET_Y_INITIAL: 32,
  };
  var QUANTITY_ADS = 8;

  /**
   * Выбирает случает элемент из массива, удаляя его для исключения повтора
   * @param {Array} arr - входной массив
   * @return {*} случайный элемент массива
   */
  var getRandomUniqueElementFromArray = function (arr) {
    var randomElement = arr.splice(Math.floor(Math.random() * arr.length), 1);
    return randomElement;
  };

  /**
   * Выбирает случает элемент из массива, допускает повторение
   * @param {Array} arr - входной массив
   * @return {*} случайный элемент массива
   */
  var getRandomElementFromArray = function (arr) {
    var randomElement = arr[Math.floor(Math.random() * arr.length)];
    return randomElement;
  };

  /**
   * Генерирует массив случайной длины, составленный из случайных неповторяющихся элементов
   * @param {integer} maxLength - максимальная длина массива
   * @param {*} incomingArray - массив исходных данных
   * @return {Array} возвращает сгенерированный массив
   */
  var generateArrayWithRandomLength = function (maxLength, incomingArray) {
    var outcomingArray = [];
    var length = Math.floor(Math.random() * maxLength);
    // Если случайная длина окажется больше длины входного массива, сравняем их
    if (length > incomingArray.length) {
      length = incomingArray.length;
    }
    for (var i = 0; i < length; i++) {
      outcomingArray[i] = getRandomUniqueElementFromArray(incomingArray);
    }
    return outcomingArray;
  };

  /**
   * Выбирает случайное число из диапазона чисел
   * @param {integer} min - минимальное число
   * @param {integer} max - максимальное число
   * @return {integer} возвращает случайное число из диапазона
   */
  var getRandomElementFromRange = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  /**
   * Возвращает правильную множественную форму слова по склонениям в зависимости от количества
   * @param {*} forms - массив вариантов склонений
   * @param {*} n - количество
   * @return {string} нужная форма слова
   */
  var getPluralForm = function (forms, n) {
    var idx;
    if (n % 10 === 1 && n % 100 !== 11) {
      idx = 0; // many
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
      idx = 1; // few
    } else {
      idx = 2; // one
    }
    return forms[idx] || '';
  };

  /**
   * Генерирует объект объявления из набора данных
   * @param {integer} counter - порядковый номер объявления
   * @return {Object} возвращает объект
   */
  var generateRandomAd = function (counter) {
    var x = getRandomElementFromRange(Coordinates.X_START, Coordinates.X_END);
    var y = getRandomElementFromRange(Coordinates.Y_START, Coordinates.Y_END);
    return {
      'author': {
        'avatar': 'img/avatars/user0' + counter + '.png',
      },
      'offer': {
        'title': 'Тестовый заголовок',
        'address': x + ', ' + y,
        'price': getRandomElementFromRange(Price.MIN, Price.MAX),
        'type': getRandomElementFromArray(Object.keys(TYPES_OF_HOUSE)),
        'rooms': getRandomElementFromRange(Rooms.MIN, Rooms.MAX),
        'guests': getRandomElementFromRange(Guests.MIN, Guests.MAX),
        'checkin': getRandomElementFromArray(TIME_CHECKING_CHECKOUT),
        'checkout': getRandomElementFromArray(TIME_CHECKING_CHECKOUT),
        'features': generateArrayWithRandomLength(MAX_FEATURES, FEATURES.slice()),
        'description': 'Тестовое описание',
        'photos': generateArrayWithRandomLength(MAX_PHOTOS, PHOTOS.slice())
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

  var ads = generateAd(QUANTITY_ADS);

  window.data = {
    TYPES_OF_HOUSE: TYPES_OF_HOUSE,
    Pin: Pin,
    PinMain: PinMain,
    ads: ads,
    getPluralForm: getPluralForm,
  };

})();

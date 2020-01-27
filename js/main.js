'use strict';

var PIN_OFFSET_X = 25;
var PIN_OFFSET_Y = 70;

var generateArrayWithFixedLength = function (length) {
  var arr = [];
  for (var i = 1; i <= length; i++) {
    arr[i - 1] = i;
  }
  return arr;
};

/**
 * Выбирает случает элемент из массива, удаляя его для исключения повтора
 * @param {Array} arr - входной массив
 * @return {*} случайный элемент массива
 */
var getRandomUniqueElementFromArray = function (arr) {
  var indexOfElement = Math.floor(Math.random() * arr.length);
  var randomElement = arr[indexOfElement];
  arr.splice(indexOfElement, 1);
  return randomElement;
};

/**
 * Выбирает случает элемент из массива, допускает повторение
 * @param {Array} arr - входной массив
 * @return {*} возвращает случайный элемент массива
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

var arrayImages = generateArrayWithFixedLength(8);
var arrayTypes = ['palace', 'flat', 'house', 'bungalo'];
var arrayCheckin = ['12:00', '13:00', '14:00'];
var arrayCheckout = ['12:00', '13:00', '14:00'];

/**
 * Генерирует объект объявления из набора данных
 * @return {Object} возвращает объект
 */
var generateRandomAd = function () {
  var arrayFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var arrayPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var x = getRandomElementFromRange(0, 1200);
  var y = getRandomElementFromRange(130, 630);
  return {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomUniqueElementFromArray(arrayImages) + '.png',
    },
    'offer': {
      'title': 'Тестовый заголовок',
      'address': x + ', ' + y,
      'price': getRandomElementFromRange(100, 100000),
      'type': getRandomElementFromArray(arrayTypes),
      'rooms': getRandomElementFromRange(1, 5),
      'guests': 2,
      'checkin': getRandomElementFromArray(arrayCheckin),
      'checkout': getRandomElementFromArray(arrayCheckout),
      'features': generateArrayWithRandomLength(6, arrayFeatures),
      'description': 'Тестовое описание',
      'photos': generateArrayWithRandomLength(3, arrayPhotos)
    },
    'location': {
      'x': x,
      'y': y,
    }
  };
};

/**
 * Создаёт набор тестовых данных
 * @param {*} arrayLength - желаемая длина массива
 * @return {Array} возврашает массив тестовых данных
 */
var generateTestData = function (arrayLength) {
  var arr = [];
  for (var i = 0; i < arrayLength; i++) {
    arr.push(generateRandomAd());
  }
  return arr;
};

var testData = generateTestData(8);

var mapPinTemplate = document.querySelector('#pin')
  .content.
  querySelector('.map__pin');

/**
 * Создаёт DOM-элемент метки на карте для последующего добавления на карту
 * @param {*} mapPin - шаблон разметки, который будет заполняться данными
 * @return {*} возвращает шаблон метки с заполненными данными
 */
var renderMapPin = function (mapPin) {
  var mapPinElement = mapPinTemplate.cloneNode(true);
  mapPinElement.querySelector('img').src = mapPin.author.avatar;
  mapPinElement.querySelector('img').alt = mapPin.offer.title;
  mapPinElement.style = 'left: ' + (mapPin.location.x - PIN_OFFSET_X) + 'px; top: ' + (mapPin.location.y - PIN_OFFSET_Y) + 'px;';
  return mapPinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < testData.length; i++) {
  fragment.appendChild(renderMapPin(testData[i]));
}

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
mapPins.appendChild(fragment);
map.classList.remove('map--faded');

'use strict';

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
// var ROOMS_FORMS = [
//   'комната',
//   'комнаты',
//   'комнат',
// ];
var Guests = {
  MIN: 1,
  MAX: 5,
};
// var GUESTS_FORMS = [
//   'гостя',
//   'гостей',
//   'гостей',
// ];
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
 * Возвращает правильную множественную форму слова по склонениям в зависимости от количества
 * @param {*} forms - массив вариантов склонений
 * @param {*} n - количество
 * @return {string} нужная форма слова
 */
// var getPluralForm = function (forms, n) {
//   var idx;
//   if (n % 10 === 1 && n % 100 !== 11) {
//     idx = 0; // many
//   } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
//     idx = 1; // few
//   } else {
//     idx = 2; // one
//   }
//   return forms[idx] || '';
// };

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

// var cardTemplate = document.querySelector('#card')
//   .content.
//   querySelector('.map__card');

/**
 * Создаёт DOM-элемент карточки объявления на карте
 * @param {*} card - шаблон карточки, который будет заполняться данными
 * @return {*} возвращает шаблон карточки с заполненными данными
 */
// var renderCard = function (card) {
//   var cardElement = cardTemplate.cloneNode(true);
//   cardElement.querySelector('.popup__avatar').src = card.author.avatar;
//   cardElement.querySelector('.popup__title').textContent = card.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
//   cardElement.querySelector('.popup__text--price span').textContent = card.offer.price;
//   cardElement.querySelector('.popup__type').textContent = TYPES_OF_HOUSE[card.offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + getPluralForm(ROOMS_FORMS, card.offer.rooms) + ' для ' + card.offer.guests + ' ' + getPluralForm(GUESTS_FORMS, card.offer.guests);
//   cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
//   // получаем список фич в разметке, готовим шаблон фичи, зачищаем список
//   var popupFeatures = cardElement.querySelector('.popup__features');
//   var popupFeatureTemplate = popupFeatures.querySelector('.popup__feature');
//   popupFeatures.textContent = '';
//   // если в объявлении есть фичи, добавляем их в зачищенный список,
//   // иначе удаляем его из разметки
//   if (card.offer.features.length) {
//     card.offer.features.forEach(function (feature) {
//       var popupFeature = popupFeatureTemplate.cloneNode(true);
//       popupFeature.className = 'popup__feature';
//       popupFeature.classList.add('popup__feature--' + feature);
//       popupFeatures.appendChild(popupFeature);
//     });
//   } else {
//     cardElement.removeChild(popupFeatures);
//   }
//   cardElement.querySelector('.popup__description').textContent = card.offer.description;
//   // получаем список фотографий в разметке, готовим шаблон фотографии, зачищаем список
//   var popupPhotos = cardElement.querySelector('.popup__photos');
//   var popupPhotoTemplate = popupPhotos.querySelector('.popup__photo');
//   popupPhotos.textContent = '';
//   // если в объявлении есть фотографии, добавляем их в зачищенный список,
//   // иначе удаляем его из разметки
//   if (card.offer.photos.length) {
//     card.offer.photos.forEach(function (photo) {
//       var popupPhoto = popupPhotoTemplate.cloneNode(true);
//       popupPhoto.src = photo;
//       popupPhotos.appendChild(popupPhoto);
//     });
//   } else {
//     cardElement.removeChild(popupPhotos);
//   }
//   return cardElement;
// };

var fragment = document.createDocumentFragment();
ads.forEach(function (ad) {
  fragment.appendChild(renderMapPin(ad));
});


var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

var mapFiltersContainer = map.querySelector('.map__filters-container');
// mapFiltersContainer.insertAdjacentElement('beforebegin', renderCard(ads[0]));
var mapFiltersSelects = mapFiltersContainer.querySelectorAll('.map__filters select');
mapFiltersSelects.forEach(function (select) {
  select.setAttribute('disabled', 'disabled');
});
var mapFiltersFieldsets = mapFiltersContainer.querySelectorAll('.map__filters fieldset');
mapFiltersFieldsets.forEach(function (fieldset) {
  fieldset.setAttribute('disabled', 'disabled');
});

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
adFormFieldsets.forEach(function (fieldset) {
  fieldset.setAttribute('disabled', 'disabled');
});
var adFormAddress = adForm.querySelector('.ad-form #address');
adFormAddress.setAttribute('readonly', 'readonly');
adFormAddress.value = (PinMain.X_INITIAL + PinMain.OFFSET_X) + ', ' + (PinMain.Y_INITIAL + PinMain.OFFSET_Y_INITIAL);

var pageSetActiveHandler = function () {
  mapPins.appendChild(fragment);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  adFormFieldsets.forEach(function (fieldset) {
    fieldset.removeAttribute('disabled');
  });
  mapFiltersSelects.forEach(function (select) {
    select.removeAttribute('disabled');
  });
  mapFiltersFieldsets.forEach(function (fieldset) {
    fieldset.removeAttribute('disabled');
  });
};

var addressInitialSetHandler = function () {
  adFormAddress.value = (PinMain.X_INITIAL + PinMain.OFFSET_X) + ', ' + (PinMain.Y_INITIAL + PinMain.OFFSET_Y);
};

var mapPinMain = map.querySelector('.map__pin--main');
mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    pageSetActiveHandler();
  }
});

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    addressInitialSetHandler();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    pageSetActiveHandler();
  }
});

var roomNumber = adForm.querySelector('#room_number');
var capacityNumber = adForm.querySelector('#capacity');
capacityNumber.options[0].setAttribute('disabled', 'disabled');
capacityNumber.options[1].setAttribute('disabled', 'disabled');
capacityNumber.options[2].setAttribute('selected', 'selected');
capacityNumber.options[3].setAttribute('disabled', 'disabled');
var selectCapacityValidateHandler = function () {
  switch (roomNumber.selectedIndex) {
    case 0:
      // Выбрали 1 комнату
      capacityNumber.options[0].setAttribute('disabled', 'disabled');
      capacityNumber.options[0].removeAttribute('selected');
      capacityNumber.options[1].setAttribute('disabled', 'disabled');
      capacityNumber.options[1].removeAttribute('selected');
      capacityNumber.options[2].removeAttribute('disabled');
      capacityNumber.options[2].setAttribute('selected', 'selected');
      capacityNumber.options[3].setAttribute('disabled', 'disabled');
      capacityNumber.options[3].removeAttribute('selected');
      break;
    case 1:
      // Выбрали 2 комнаты
      capacityNumber.options[0].setAttribute('disabled', 'disabled');
      capacityNumber.options[0].removeAttribute('selected');
      capacityNumber.options[1].removeAttribute('disabled');
      capacityNumber.options[1].setAttribute('selected', 'selected');
      capacityNumber.options[2].removeAttribute('disabled');
      capacityNumber.options[2].removeAttribute('selected');
      capacityNumber.options[3].setAttribute('disabled', 'disabled');
      capacityNumber.options[3].removeAttribute('selected');
      break;
    case 2:
      // Выбрали 3 комнаты
      capacityNumber.options[0].removeAttribute('disabled');
      capacityNumber.options[0].setAttribute('selected', 'selected');
      capacityNumber.options[1].removeAttribute('disabled');
      capacityNumber.options[1].removeAttribute('selected');
      capacityNumber.options[2].removeAttribute('disabled');
      capacityNumber.options[2].removeAttribute('selected');
      capacityNumber.options[3].setAttribute('disabled', 'disabled');
      capacityNumber.options[3].removeAttribute('selected');
      break;
    case 3:
      // Выбрали 100 комнат
      capacityNumber.options[0].setAttribute('disabled', 'disabled');
      capacityNumber.options[0].removeAttribute('selected');
      capacityNumber.options[1].setAttribute('disabled', 'disabled');
      capacityNumber.options[1].removeAttribute('selected');
      capacityNumber.options[2].setAttribute('disabled', 'disabled');
      capacityNumber.options[2].removeAttribute('selected');
      capacityNumber.options[3].removeAttribute('disabled');
      capacityNumber.options[3].setAttribute('selected', 'selected');
      break;
  }
};

roomNumber.addEventListener('change', selectCapacityValidateHandler);

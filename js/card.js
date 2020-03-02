'use strict';

(function () {

  var TYPES_OF_HOUSE = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
  };
  var ROOMS_FORMS = [
    'комната',
    'комнаты',
    'комнат',
  ];
  var GUESTS_FORMS = [
    'гостя',
    'гостей',
    'гостей',
  ];
  var map = document.querySelector('.map');

  var cardTemplate = document.querySelector('#card')
  .content.
  querySelector('.map__card');

  /**
  * Создаёт DOM-элемент карточки объявления на карте
  * @param {*} card - шаблон карточки, который будет заполняться данными
  * @return {*} возвращает шаблон карточки с заполненными данными
  */
  var renderCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price span').textContent = card.offer.price;
    cardElement.querySelector('.popup__type').textContent = TYPES_OF_HOUSE[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + window.util.getPluralForm(ROOMS_FORMS, card.offer.rooms) + ' для ' + card.offer.guests + ' ' + window.util.getPluralForm(GUESTS_FORMS, card.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    // получаем список фич в разметке, готовим шаблон фичи, зачищаем список
    var popupFeatures = cardElement.querySelector('.popup__features');
    var popupFeatureTemplate = popupFeatures.querySelector('.popup__feature');
    popupFeatures.textContent = '';
    // если в объявлении есть фичи, добавляем их в зачищенный список,
    // иначе удаляем его из разметки
    if (card.offer.features.length) {
      card.offer.features.forEach(function (feature) {
        var popupFeature = popupFeatureTemplate.cloneNode(true);
        popupFeature.className = 'popup__feature';
        popupFeature.classList.add('popup__feature--' + feature);
        popupFeatures.appendChild(popupFeature);
      });
    } else {
      cardElement.removeChild(popupFeatures);
    }
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    // получаем список фотографий в разметке, готовим шаблон фотографии, зачищаем список
    var popupPhotos = cardElement.querySelector('.popup__photos');
    var popupPhotoTemplate = popupPhotos.querySelector('.popup__photo');
    popupPhotos.textContent = '';
    // если в объявлении есть фотографии, добавляем их в зачищенный список,
    // иначе удаляем его из разметки
    if (card.offer.photos.length) {
      card.offer.photos.forEach(function (photo) {
        var popupPhoto = popupPhotoTemplate.cloneNode(true);
        popupPhoto.src = photo;
        popupPhotos.appendChild(popupPhoto);
      });
    } else {
      cardElement.removeChild(popupPhotos);
    }
    var cardElementClose = cardElement.querySelector('.popup__close');
    cardElementClose.addEventListener('click', function () {
      cardElement.remove();
      var activePin = map.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
    });
    var mapKeydownHandler = function (evt) {
      if (map.querySelector('.map__card') && evt.key === 'Escape') {
        cardElement.remove();
        var activePin = map.querySelector('.map__pin--active');
        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }
        document.removeEventListener('keydown', mapKeydownHandler);
      }
    };
    document.addEventListener('keydown', mapKeydownHandler);

    return cardElement;
  };

  var removeCard = function () {
    var mapCard = map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    render: renderCard,
    remove: removeCard
  };

})();

'use strict';

(function () {

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
    cardElement.querySelector('.popup__type').textContent = window.data.TYPES_OF_HOUSE[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' ' + window.data.getPluralForm(ROOMS_FORMS, card.offer.rooms) + ' для ' + card.offer.guests + ' ' + window.data.getPluralForm(GUESTS_FORMS, card.offer.guests);
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
      window.app.map.removeChild(cardElement);
    });
    var mapKeydownHandler = function (evt) {
      if (window.app.map.querySelector('.map__card') && evt.key === 'Escape') {
        var mapCard = window.app.map.querySelector('.map__card');
        window.app.map.removeChild(mapCard);
        document.removeEventListener('keydown', mapKeydownHandler);
      }
    };
    document.addEventListener('keydown', mapKeydownHandler);

    return cardElement;
  };

  window.card = {
    renderCard: renderCard,
  };

})();

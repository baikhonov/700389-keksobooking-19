'use strict';

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');

var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapFiltersSelects = mapFiltersContainer.querySelectorAll('.map__filters select');
var mapFiltersFieldsets = mapFiltersContainer.querySelectorAll('.map__filters fieldset');

var mapPinMain = map.querySelector('.map__pin--main');

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    pageActivateHandler();
  }
});

// проверить, не избыточно ли, может достаточно mousedown handler?
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    pageActivateHandler();
  }
});

// отрефакторить!
var mapClickHandler = function (evt) {
  var mapCard;
  if ((evt.target.matches('button.map__pin img') || evt.target.matches('button.map__pin')) && (!evt.target.matches('button.map__pin--main img') && !evt.target.matches('button.map__pin--main'))) {
    var target = (evt.target.matches('button.map__pin img')) ? evt.target : evt.target.children[0];
    var numberAd = target.src[target.src.length - 5];
    if (map.querySelector('.map__card')) {
      mapCard = map.querySelector('.map__card ');
      map.removeChild(mapCard);
    }
    mapFiltersContainer.insertAdjacentElement('beforebegin', renderCard(ads[numberAd - 1]));
    mapCard = map.querySelector('.map__card ');
  }
};

map.addEventListener('click', mapClickHandler);

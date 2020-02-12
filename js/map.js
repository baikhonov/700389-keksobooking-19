'use strict';

(function () {

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
  var ads = window.data.generateAd(QUANTITY_ADS);
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var mapShowPins = function () {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      fragment.appendChild(window.pin.render(ad));
    });
    mapPins.appendChild(fragment);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.main.pageActivateHandler();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.main.pageActivateHandler();
    }
  });

  var mapClickHandler = function (evt) {
    var mapCard;
    if ((evt.target.matches('button.map__pin img') || evt.target.matches('button.map__pin')) && (!evt.target.matches('button.map__pin--main img') && !evt.target.matches('button.map__pin--main'))) {
      var target = (evt.target.matches('button.map__pin img')) ? evt.target : evt.target.children[0];
      var numberAd = target.src[target.src.length - 5];
      if (map.querySelector('.map__card')) {
        mapCard = map.querySelector('.map__card');
        map.removeChild(mapCard);
      }
      mapFiltersContainer.insertAdjacentElement('beforebegin', window.card.render(ads[numberAd - 1]));
      mapCard = map.querySelector('.map__card ');
    }
  };

  map.addEventListener('click', mapClickHandler);

  window.map = {
    pin: Pin,
    pinMain: PinMain,
    showPins: mapShowPins
  };

})();

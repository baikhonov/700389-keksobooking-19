'use strict';

(function () {

  var MapLimits = {
    X_START: 0,
    X_END: 1200,
    Y_START: 130,
    Y_END: 630,
  };
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
  var adFormAddress = document.querySelector('.ad-form #address');

  var mapShowPins = function () {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad) {
      fragment.appendChild(window.pin.render(ad));
    });
    mapPins.appendChild(fragment);
  };

  var isPageActivated = false;

  var adFormAddressChange = function () {
    adFormAddress.value = (parseInt(mapPinMain.style.left.slice(0, -2), 10) + PinMain.OFFSET_X) + ', ' + (parseInt(mapPinMain.style.top.slice(0, -2), 10) + PinMain.OFFSET_Y);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && !isPageActivated) {
      window.main.pageActivateHandler();
      isPageActivated = true;
    }

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (moveEvt.clientX > (MapLimits.X_END + PinMain.OFFSET_X)) {
        mapPinMain.style.left = (MapLimits.X_END - PinMain.OFFSET_X) + 'px';
      } else if (moveEvt.clientX < MapLimits.X_START) {
        mapPinMain.style.left = (MapLimits.X_START - PinMain.OFFSET_X) + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      if (moveEvt.clientY > (MapLimits.Y_END - PinMain.OFFSET_Y)) {
        mapPinMain.style.top = MapLimits.Y_END + 'px';
      } else if (moveEvt.clientY < (MapLimits.Y_START - PinMain.OFFSET_Y)) {
        mapPinMain.style.top = (MapLimits.Y_START - PinMain.OFFSET_Y) + 'px';
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      adFormAddressChange();
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter' && !isPageActivated) {
      window.main.pageActivateHandler();
      isPageActivated = true;
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

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
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var adFormAddress = document.querySelector('.ad-form #address');
  var adsData;

  var mapShowPins = function (ads) {
    var fragment = document.createDocumentFragment();
    ads.forEach(function (ad, index) {
      fragment.appendChild(window.pin.render(ad, index));
    });
    mapPins.appendChild(fragment);
    adsData = ads;
  };

  var adFormAddressChange = function () {
    adFormAddress.value = (parseInt(mapPinMain.style.left.slice(0, -2), 10) + PinMain.OFFSET_X) + ', ' + (parseInt(mapPinMain.style.top.slice(0, -2), 10) + PinMain.OFFSET_Y);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0 && !window.main.isPageActivated) {
      window.main.activatePage();
      window.main.isPageActivated = true;
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

      var deltaX = mapPinMain.offsetLeft - shift.x;
      mapPinMain.style.left = deltaX + 'px';
      if (deltaX > (MapLimits.X_END - PinMain.OFFSET_X)) {
        mapPinMain.style.left = (MapLimits.X_END - PinMain.OFFSET_X) + 'px';
      }
      if (deltaX < (MapLimits.X_START - PinMain.OFFSET_X)) {
        mapPinMain.style.left = (MapLimits.X_START - PinMain.OFFSET_X) + 'px';
      }

      var deltaY = mapPinMain.offsetTop - shift.y;
      mapPinMain.style.top = deltaY + 'px';
      if (deltaY > (MapLimits.Y_END - PinMain.OFFSET_Y)) {
        mapPinMain.style.top = (MapLimits.Y_END - PinMain.OFFSET_Y) + 'px';
      }
      if (deltaY < (MapLimits.Y_START - PinMain.OFFSET_Y)) {
        mapPinMain.style.top = (MapLimits.Y_START - PinMain.OFFSET_Y) + 'px';
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
    if (evt.key === 'Enter' && !window.main.isPageActivated) {
      window.main.activatePage();
      window.main.isPageActivated = true;
    }
  });

  var mapClickHandler = function (evt) {
    var mapCard;
    if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin--main')) {
      var target = evt.target.closest('.map__pin');
      var numberAd = target.dataset.number;
      if (map.querySelector('.map__card')) {
        mapCard = map.querySelector('.map__card');
        map.removeChild(mapCard);
      }
      mapFiltersContainer.insertAdjacentElement('beforebegin', window.card.render(adsData[numberAd]));
    }
  };

  map.addEventListener('click', mapClickHandler);

  window.map = {
    pin: Pin,
    pinMain: PinMain,
    showPins: mapShowPins,
  };

})();

'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.main.pageActivateHandler();
    }
  });

  // проверить, не избыточно ли, может достаточно mousedown handler?
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.main.pageActivateHandler();
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
      mapFiltersContainer.insertAdjacentElement('beforebegin', window.card.renderCard(window.data.ads[numberAd - 1]));
      mapCard = map.querySelector('.map__card ');
    }
  };

  map.addEventListener('click', mapClickHandler);

})();

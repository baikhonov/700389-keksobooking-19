'use strict';

(function () {

  var initialAds = [];
  var filteredAds = [];
  var filterForm = document.querySelector('.map__filters');
  var filterHouseType = filterForm.querySelector('#housing-type');
  var filterHousePrice = filterForm.querySelector('#housing-price');
  var filterHouseRooms = filterForm.querySelector('#housing-rooms');
  var filterHouseGuests = filterForm.querySelector('#housing-guests');

  var filterHouseTypeChange = function (data) {
    var HouseTypeValue = filterHouseType.value;
    if (HouseTypeValue !== 'any') {
      window.filter.filteredAds = data.filter(function (ad) {
        return ad.offer.type === HouseTypeValue;
      });
    } else {
      window.filter.filteredAds = data;
    }
    updatePins();
  };

  filterForm.addEventListener('change', function (evt) {
    switch (evt.target) {
      case filterHouseType:
        // фильтрация по типу жилья
        filterHouseTypeChange(window.filter.initialAds);
        break;
      case filterHousePrice:
        // фильтрация по цене жилья
        break;
      case filterHouseRooms:
        // фильтрация по количеству комнат
        break;
      case filterHouseGuests:
        // фильтрация по количеству гостей
        break;
      default:
        // ничего не фильтруем
    }
  });


  var updatePins = function () {
    window.card.remove();
    window.pin.removeAll();
    window.pin.render(window.filter.filteredAds);
  };

  window.filter = {
    initialAds: initialAds,
    filteredAds: filteredAds
  };

})();

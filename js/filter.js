'use strict';

(function () {

  var filteredAds = [];
  var filterForm = document.querySelector('.map__filters');

  var filterHouseType = filterForm.querySelector('#housing-type');
  var houseTypeValue = filterHouseType.value;

  var filterHousePrice = filterForm.querySelector('#housing-price');
  var housePriceValue = filterHousePrice.value;
  var priceMap = {
    low: [0, 9999],
    middle: [10000, 49999],
    high: [50000, Infinity]
  };

  var filterHouseRooms = filterForm.querySelector('#housing-rooms');
  var houseRoomValue = filterHouseRooms.value;

  var filterHouseGuests = filterForm.querySelector('#housing-guests');
  var houseGuestsValue = filterHouseGuests.value;

  var filterHouseFeatures = filterForm.querySelector('#housing-features');


  var filterHouseTypeChange = function (ad) {
    if (houseTypeValue === 'any') {
      return true;
    } else {
      return ad.offer.type === houseTypeValue;
    }
  };

  var filterHousePriceChange = function (ad) {
    if (housePriceValue === 'any') {
      return true;
    } else {
      return ad.offer.price >= priceMap[HousePriceValue][0] && ad.offer.price <= priceMap[housePriceValue][1];
    }
  };

  var filterHouseRoomChange = function (ad) {
    if (houseRoomValue === 'any') {
      return true;
    } else {
      return ad.offer.rooms === parseInt(houseRoomValue, 10);
    }
  };

  var filterHouseGuestsChange = function (ad) {
    if (houseGuestsValue === 'any') {
      return true;
    } else {
      return ad.offer.guests === parseInt(houseGuestsValue, 10);
    }
  };

  filterForm.addEventListener('change', function (evt) {
    filteredAds = window.filter.initialAds;
    switch (evt.target) {
      case filterHouseType:
        // фильтрация по типу жилья
        houseTypeValue = evt.target.value;
        break;
      case filterHousePrice:
        // фильтрация по цене жилья
        housePriceValue = evt.target.value;
        break;
      case filterHouseRooms:
        // фильтрация по количеству комнат
        houseRoomValue = evt.target.value;
        break;
      case filterHouseGuests:
        // фильтрация по количеству гостей
        houseGuestsValue = evt.target.value;
        break;
      default:
        // ничего не фильтруем
    }
    filteredAds = filteredAds.
      filter(filterHouseTypeChange).
      filter(filterHousePriceChange).
      filter(filterHouseRoomChange).
      filter(filterHouseGuestsChange);
    window.debounce(updatePins);
  });


  var updatePins = function () {
    window.card.remove();
    window.pin.removeAll();
    window.pin.render(filteredAds);
  };

  window.filter = {
    initialAds: [],
  };

})();

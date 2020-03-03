'use strict';

(function () {

  var filteredAds = [];
  var filterForm = document.querySelector('.map__filters');

  var filterHouseType = filterForm.querySelector('#housing-type');
  var HouseTypeValue = filterHouseType.value;

  var filterHousePrice = filterForm.querySelector('#housing-price');
  var HousePriceValue = filterHousePrice.value;
  var priceMap = {
    low: [0, 9999],
    middle: [10000, 49999],
    high: [50000, Infinity]
  };

  var filterHouseRooms = filterForm.querySelector('#housing-rooms');
  var HouseRoomValue = filterHouseRooms.value;

  var filterHouseGuests = filterForm.querySelector('#housing-guests');
  var HouseGuestsValue = filterHouseGuests.value;

  var filterHouseTypeChange = function (ad) {
    if (HouseTypeValue === 'any') {
      return true;
    } else {
      return ad.offer.type === HouseTypeValue;
    }
  };

  var filterHousePriceChange = function (ad) {
    if (HousePriceValue === 'any') {
      return true;
    } else {
      return ad.offer.price >= priceMap[HousePriceValue][0] && ad.offer.price <= priceMap[HousePriceValue][1];
    }
  };

  var filterHouseRoomChange = function (ad) {
    if (HouseRoomValue === 'any') {
      return true;
    } else {
      return ad.offer.rooms === parseInt(HouseRoomValue, 10);
    }
  };

  var filterHouseGuestsChange = function (ad) {
    if (HouseGuestsValue === 'any') {
      return true;
    } else {
      return ad.offer.guests === parseInt(HouseGuestsValue, 10);
    }
  };

  filterForm.addEventListener('change', function (evt) {
    filteredAds = window.filter.initialAds;
    switch (evt.target) {
      case filterHouseType:
        // фильтрация по типу жилья
        HouseTypeValue = evt.target.value;
        break;
      case filterHousePrice:
        // фильтрация по цене жилья
        HousePriceValue = evt.target.value;
        break;
      case filterHouseRooms:
        // фильтрация по количеству комнат
        HouseRoomValue = evt.target.value;
        break;
      case filterHouseGuests:
        // фильтрация по количеству гостей
        HouseGuestsValue = evt.target.value;
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

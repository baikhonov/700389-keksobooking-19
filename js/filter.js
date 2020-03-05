'use strict';

(function () {

  var initialAds = [];
  var filteredAds = [];
  var filterForm = document.querySelector('.map__filters');

  var filterHouseType = filterForm.querySelector('#housing-type');
  var houseTypeValue = filterHouseType.value;

  var filterHousePrice = filterForm.querySelector('#housing-price');
  var housePriceValue = filterHousePrice.value;
  var housePriceDictionary = {
    'low': [0, 9999],
    'middle': [10000, 49999],
    'high': [50000, Infinity]
  };

  var filterHouseRooms = filterForm.querySelector('#housing-rooms');
  var houseRoomValue = filterHouseRooms.value;

  var filterHouseGuests = filterForm.querySelector('#housing-guests');
  var houseGuestsValue = filterHouseGuests.value;

  var filterHouseFeatures = filterForm.querySelector('#housing-features');
  var HouseFeaturesValue = Array.from(filterHouseFeatures.querySelectorAll('input:checked')).map(function (ad) {
    return ad.value;
  });

  /**
   * Формирует условие для фильтрации по типу жилья
   * @param {Object} ad - проверяемое объявление
   * @return {boolean} - условие для фильтрации
   */
  var filterHouseTypeChange = function (ad) {
    if (houseTypeValue === 'any') {
      return true;
    }
    return ad.offer.type === houseTypeValue;
  };

  /**
   * Формирует условие для фильтрации по цене жилья
   * @param {Object} ad - проверяемое объявление
   * @return {boolean} - условие для фильтрации
   */
  var filterHousePriceChange = function (ad) {
    if (housePriceValue === 'any') {
      return true;
    }
    return ad.offer.price >= housePriceDictionary[housePriceValue][0] && ad.offer.price <= housePriceDictionary[housePriceValue][1];
  };

  /**
   * Формирует условие для фильтрации по количеству комнат
   * @param {Object} ad - проверяемое объявление
   * @return {boolean} - условие для фильтрации
   */
  var filterHouseRoomChange = function (ad) {
    if (houseRoomValue === 'any') {
      return true;
    }
    return ad.offer.rooms === parseInt(houseRoomValue, 10);
  };

  /**
   * Формирует условие для фильтрации по количеству гостей
   * @param {Object} ad - проверяемое объявление
   * @return {boolean} - условие для фильтрации
   */
  var filterHouseGuestsChange = function (ad) {
    if (houseGuestsValue === 'any') {
      return true;
    }
    return ad.offer.guests === parseInt(houseGuestsValue, 10);
  };

  /**
   * Формирует условие для фильтрации по набору фич
   * @param {Object} ad - проверяемое объявление
   * @return {boolean} - условие для фильтрации
   */
  var filterHouseFeaturesChange = function (ad) {
    return HouseFeaturesValue.every(function (feature) {
      return ad.offer.features.includes(feature);
    });
  };

  /**
   * Проверка изменения фильтров в форме
   */
  filterForm.addEventListener('change', function (evt) {
    filteredAds = window.filter.initialAds;
    switch (evt.target.id) {
      case filterHouseType.id:
        houseTypeValue = evt.target.value;
        break;
      case filterHousePrice.id:
        housePriceValue = evt.target.value;
        break;
      case filterHouseRooms.id:
        houseRoomValue = evt.target.value;
        break;
      case filterHouseGuests.id:
        houseGuestsValue = evt.target.value;
        break;
      case 'filter-' + evt.target.value:
        HouseFeaturesValue = Array.from(filterHouseFeatures.querySelectorAll('input:checked')).map(function (ad) {
          return ad.value;
        });
        break;
      default:
        // ничего не фильтруем
    }
    filteredAds = filteredAds.
      filter(filterHouseTypeChange).
      filter(filterHousePriceChange).
      filter(filterHouseRoomChange).
      filter(filterHouseGuestsChange).
      filter(filterHouseFeaturesChange);
    window.debounce(updatePins);
  });

  /**
   * Обновление пинов на карте
   */
  var updatePins = function () {
    window.card.remove();
    window.pin.removeAll();
    window.pin.render(filteredAds);
  };

  window.filter = {
    initialAds: initialAds,
  };

})();

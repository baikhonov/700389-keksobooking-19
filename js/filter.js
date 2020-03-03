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
  var HouseFeaturesValue = Array.from(filterHouseFeatures.querySelectorAll('input:checked')).map(function (ad) {
    return ad.value;
  });

  /**
   * Фильтрует объявления по типу жилья
   * @param {Object} ad - проверяемое объявление
   * @return {boolean} - условие для фильтрации
   */
  var filterHouseTypeChange = function (ad) {
    if (houseTypeValue === 'any') {
      return true;
    } else {
      return ad.offer.type === houseTypeValue;
    }
  };

  /**
   * Фильтрует объявления по цене жилья
   * @param {Object} ad - проверяемое объявление
   * @return {boolean} - условие для фильтрации
   */
  var filterHousePriceChange = function (ad) {
    if (housePriceValue === 'any') {
      return true;
    } else {
      return ad.offer.price >= priceMap[housePriceValue][0] && ad.offer.price <= priceMap[housePriceValue][1];
    }
  };

  /**
   * Фильтрует объявления по количеству комнат
   * @param {Object} ad - проверяемое объявление
   * @return {boolean} - условие для фильтрации
   */
  var filterHouseRoomChange = function (ad) {
    if (houseRoomValue === 'any') {
      return true;
    } else {
      return ad.offer.rooms === parseInt(houseRoomValue, 10);
    }
  };

  /**
   * Фильтрует объявления по количеству гостей
   * @param {Object} ad - проверяемое объявление
   * @return {boolean} - условие для фильтрации
   */
  var filterHouseGuestsChange = function (ad) {
    if (houseGuestsValue === 'any') {
      return true;
    } else {
      return ad.offer.guests === parseInt(houseGuestsValue, 10);
    }
  };

  /**
   * Фильтрует объявления по набору фич
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
        // фильтрация по типу жилья
        houseTypeValue = evt.target.value;
        break;
      case filterHousePrice.id:
        // фильтрация по цене жилья
        housePriceValue = evt.target.value;
        break;
      case filterHouseRooms.id:
        // фильтрация по количеству комнат
        houseRoomValue = evt.target.value;
        break;
      case filterHouseGuests.id:
        // фильтрация по количеству гостей
        houseGuestsValue = evt.target.value;
        break;
      case 'filter-' + evt.target.value:
        // фильтрация по фичам
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
    initialAds: [],
  };

})();

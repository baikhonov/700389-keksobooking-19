'use strict';

(function () {

  var adsCopy = [];
  var offerHouseType;
  var offerHousePrice;
  var offerPriceMap = {
    middle: [10000, 50000],
    low: [0, 9999],
    high: [50001, Infinity],
  };

  var updatePins = function () {
    window.map.removeCard();
    window.pin.removeAll();
    window.pin.render(adsCopy);
  };

  window.filter.houseTypeChange = window.debounce(function (houseType) {
    offerHouseType = houseType;
    updatePins();
  });

  window.filter.housePriceChange = window.debounce(function (housePrice) {
    offerHousePrice = housePrice;
    updatePins();
  });

})();

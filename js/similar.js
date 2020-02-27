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

  var getRank = function (ad) {
    var rank = 0;

    if (ad.offer.type === offerHouseType) {
      rank += 1;
    }

    if (Object.keys(offerPriceMap).indexOf(offerHousePrice) !== -1) {
      if (ad.offer.price >= offerPriceMap[offerHousePrice][0] &&
        ad.offer.price <= offerPriceMap[offerHousePrice][1]) {
        rank += 1;
      }
    }

    return rank;
  };


  var updatePins = function () {
    window.map.cleanCard();
    window.pin.render(adsCopy.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      return rankDiff;
    }));
  };

  window.filter.houseTypeChange = window.debounce(function (houseType) {
    offerHouseType = houseType;
    updatePins();
  });

  window.filter.housePriceChange = window.debounce(function (housePrice) {
    offerHousePrice = housePrice;
    updatePins();
  });

  var showPins = function (data) {
    adsCopy = data.slice();
    window.similar.ads = adsCopy;
    updatePins();
  };

  window.similar = {
    ads: adsCopy,
    showPins: showPins,
  };


})();

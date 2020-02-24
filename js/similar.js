'use strict';

(function () {

  var ads = [];
  var offerHouseType;

  var getRank = function (ad) {
    var rank = 0;
    if (ad.offer.type === offerHouseType) {
      rank += 1;
    }

    return rank;
  };

  // var numbersComparator = function (left, right) {
  //   if (left > right) {
  //     return 1;
  //   } else if (left < right) {
  //     return -1;
  //   } else {
  //     return 0;
  //   }
  // };

  var mapFiltersForm = document.querySelector('.map__filters');

  var mapFilterHouseType = mapFiltersForm.querySelector('#housing-type');
  mapFilterHouseType.addEventListener('change', function () {
    var newHouseType = mapFilterHouseType.value;
    offerHouseType = newHouseType;
    updatePins();
  });

  var updatePins = function () {
    window.pin.render(ads.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      // if (rankDiff === 0) {
      //   rankDiff = numbersComparator(left.dataset.number, right.dataset.number);
      // }
      return rankDiff;
    }));

  };

  var showPins = function (data) {
    ads = data;
    updatePins();
  };

  window.similar = {
    showPins: showPins,
  };

})();

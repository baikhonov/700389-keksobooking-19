'use strict';

(function () {

  var filter = {
    houseTypeChange: function () {},
    housePriceChange: function () {},
  };

  var mapFiltersForm = document.querySelector('.map__filters');

  var mapFilterHouseType = mapFiltersForm.querySelector('#housing-type');
  mapFilterHouseType.addEventListener('change', function () {
    var newHouseType = mapFilterHouseType.value;
    filter.houseTypeChange(newHouseType);
  });

  var mapFilterHousePrice = mapFiltersForm.querySelector('#housing-price');
  mapFilterHousePrice.addEventListener('change', function () {
    var newHousePrice = mapFilterHousePrice.value;
    filter.housePriceChange(newHousePrice);
  });

  window.filter = filter;

})();

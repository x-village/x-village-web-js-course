const PYEONG_BY_SQUARE_METER = 3.3058;

function getAverageLandPriceByArea(data) {
  const areaPriceListObj = reduceByArea(data);
  return Object.keys(areaPriceListObj).map(function(area) {
    return {
      area: area,
      price: mean(areaPriceListObj[area]) * PYEONG_BY_SQUARE_METER,
    };
  });
}

function getMedianLandPriceByArea(data) {
  const areaPriceListObj = reduceByArea(data);
  return Object.keys(areaPriceListObj).map(function(area) {
    return {
      area: area,
      price: median(areaPriceListObj[area]) * PYEONG_BY_SQUARE_METER,
    };
  });
}

function reduceByArea(data) {
  return data.reduce(function(prev, current) {
    if (!prev.hasOwnProperty(current.area)) {
      prev[current.area] = [];
    }
    prev[current.area].push(current.price);
    return prev;
  }, {});
}

function mean(values) {
  const sum = values.reduce(function(a, b) { return a + b; });
  return sum / values.length;
}

function median(values) {
  values.sort( function(a,b) {return a - b;} );
  var half = Math.floor(values.length/2);
  if(values.length % 2) {
      return values[half];
  } else {
      return (values[half-1] + values[half]) / 2.0;
  }
}
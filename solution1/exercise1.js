const PYEONG_BY_SQUARE_METER = 3.3058;

function getAverageLandPriceByArea(data) {
  return mapAreaPriceListObjectItems(reduceByArea(data), mean)
}

function getMedianLandPriceByArea(data) {
  return mapAreaPriceListObjectItems(reduceByArea(data), median)
}

function reduceByArea(data) {
  const areaPriceListObj = {};
  for (let item of data) {
    if(!areaPriceListObj.hasOwnProperty(item.area)) {
      areaPriceListObj[item.area] = [];
    }
    areaPriceListObj[item.area].push(item.price);
  }
  return areaPriceListObj;
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

function mapAreaPriceListObjectItems(obj, fn) {
  const results = [];
  for (let key of Object.keys(obj)) {
    results.push({
      area: key,
      price: fn(obj[key]) * PYEONG_BY_SQUARE_METER,
    })
  }
  return results;
}
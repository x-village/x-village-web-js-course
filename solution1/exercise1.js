// 一坪 = 3.3058 平方公尺
const PYEONG_BY_SQUARE_METER = 3.3058;

/*
  輸入 data 格式：
  [
    { date: '1070619', area: '中正區',  price: 1000000},
    { date: '1070620', area: '中正區',  price: 1000000 },
    { date: '1070619', area: '大安區',  price: 1000000 },
    ...
  ]

  輸出 data 格式：
  [
    { area: '中正區',  price: 1000000 },
    { area: '大安區',  price: 1000000 },
    ...
  ]
*/

// 回傳每個區域的不動產交易價格平均值
function getAverageLandPriceByArea(data) {
  // Write your code here...
  const obj = {};
  for (let item of data) {
    if (!obj.hasOwnProperty(item.area)) {
      obj[item.area] = [];
    }
    obj[item.area].push(item.price);
  }
  const results = [];
  for (let key of Object.keys(obj)) {
    results.push({
      area: key,
      price: mean(obj[key]) * PYEONG_BY_SQUARE_METER
    });
  }
  return results;
}

function mean(priceList) {
  let sum = 0;
  for (let i of priceList) {
    sum += i;
  }
  return sum / priceList.length;
}

// 回傳每個區域的不動產交易價格中位數
function getMedianLandPriceByArea(data) {
  // Write your code here...
  const obj = {};
  for (let item of data) {
    if (!obj.hasOwnProperty(item.area)) {
      obj[item.area] = [];
    }
    obj[item.area].push(item.price);
  }
  const results = [];
  for (let key of Object.keys(obj)) {
    results.push({
      area: key,
      price: median(obj[key]) * PYEONG_BY_SQUARE_METER
    });
  }
  return results;
}


function median(values) {
  values.sort(function(a,b) {return a - b;});
  var half = Math.floor(values.length/2);
  if(values.length % 2) {
      return values[half];
  } else {
      return (values[half-1] + values[half]) / 2.0;
  }
}
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
}

// 回傳每個區域的不動產交易價格中位數
function getMedianLandPriceByArea(data) {
  // Write your code here...
}

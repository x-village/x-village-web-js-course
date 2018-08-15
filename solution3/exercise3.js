loadData('./data.json');

/*
  透過 jQuery 載入資料
*/
function loadData(path) {
  // Write your code here...
  $.getJSON('./data.json', function(data) {
    appendImgsFromData(data);
  });
}

/*
  將取得的 url 資料，透過 jQuery 在 class 為 ".container" 的元素中
  加入新的圖片設定 src 且 class="img"
*/
function appendImgsFromData(data) {
  // Write your code here...
  for (let item of data) {
    $('.container')
      .append('<img class="img" src="' + item.url + '" />');
  };
}
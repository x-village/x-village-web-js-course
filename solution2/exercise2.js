// 偵測 keydown 事件 -> playSound
window.addEventListener('keydown', playSound);
addCallbackToTransitionendEventForEveryKeys();
        
function removeTransition(event) {
  if (event.propertyName !== 'transform') {
    return;
  }
  event.target.classList.remove('playing');
}

/* 
  讓所有 class 為 "key" 的元素，監聽 "transitionend" event，並設定 callback
*/
function addCallbackToTransitionendEventForEveryKeys() {
  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(function(key) {
    key.addEventListener('transitionend', removeTransition);
  });
}

/*
  1. 透過 event.keyCode，取得對應 div, audio html 元素
  2. 若不是設定內的按鍵，則不要 play
  3. 若是，則將該 div 加入 'playing' 的 class
  4. 設定 audio 重頭開始播放
  
  參考連結：
  - https://www.w3schools.com/jsref/event_key_keycode.asp 
  - https://www.w3schools.com/jsref/dom_obj_audio.asp
*/
function playSound(event) {
  const audio = document.querySelector(`.audio-${event.keyCode}`);
  const key = document.getElementById(`key-${event.keyCode}`);
  
  if (!audio || !key) {
    return;
  }
  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

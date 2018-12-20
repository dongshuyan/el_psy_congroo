var _imgAllNode = []
var _lock = false
var _currentRandom = 0
var _allRandom = 25
var _timer = null
var _time = ''
var _clockNode = null
var _flag = 0

// 监听resize事件,并且重新设置根元素font-size
window.addEventListener('resize', throttle(setFontSize, 500, 1000))
function throttle(fn,wait,time){
  var previous = null //记录上一次运行的时间
  var timer = null // 定时器
  return function(){
      var now = +new Date()
      if(!previous) previous = now
      //当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
      if(now - previous > time){
          clearTimeout(timer)
          fn()
          // 执行函数后，马上记录当前时间
          previous = now
      }else{
          clearTimeout(timer)
          timer = setTimeout(function(){
              fn()
          },wait)
      }
  }
}
// 自定义事件
var evt_change_start = document.createEvent('Event');
evt_change_start.initEvent('timeLineChangeStart', true, true);
window.addEventListener('timeLineChangeStart', function() {
  timeLineChange()
})
var evt_change_end = document.createEvent('Event');
evt_change_end.initEvent('timeLineChangeEnd', true, true)
window.addEventListener('timeLineChangeEnd', function() {
  setTimeout(() => {
    colok()
  }, 1000);
})
// 加载事件
window.addEventListener('load', function () {
  // 设置根元素的font-size
  setFontSize()
  // 监听 clock上面的点击事件
  _clockNode = document.querySelector('.clock')
  _clockNode.addEventListener('click', function() {
    if (!_lock) {
      _currentRandom = 0
      _lock = true
      clearInterval(_timer)
      window.dispatchEvent(evt_change_start)
    }
  })
  _imgAllNode = document.querySelectorAll('img');
  colok()
})

function setFontSize(){
  var html = document.querySelector('html')
  var fontSize = window.innerWidth / 10
  fontSize = fontSize > 150 ? 150 : fontSize
  html.style.fontSize = fontSize + 'px'
}
function timeLineChange() {
    setTimeout(() => {
      if (_currentRandom < _allRandom) {
        _currentRandom += 1
        timeLineChange()
        _imgAllNode.forEach((item,index) => {
          if (index === 1) {
            item.src = './11.png'
          } else {
            item.src = './' +Math.floor(Math.random() * 9)+'.png'
          }
        })
      } else {
        _lock = false
        _imgAllNode[0].src = './' +Math.floor(Math.random() * 2)+'.png'
        window.dispatchEvent(evt_change_end)
      }
    }, (50))
}

function initClock() {
  var nowTime = new Date()
  var hour = nowTime.getHours()
  var mins = nowTime.getMinutes()
  var secs = nowTime.getSeconds()
  hour = hour > 10 ? hour.toString() : '0' + hour
  mins = mins > 10 ? mins.toString() : '0' + mins
  secs = secs > 10 ? secs.toString() : '0' + secs
  _time = hour + mins + secs
}

function colok() {
  _timer = setInterval(() => {
    var nowTime = new Date()
    var hour = nowTime.getHours()
    var mins = nowTime.getMinutes()
    var secs = nowTime.getSeconds()
    hour = hour > 10 ? hour.toString() : '0' + hour
    mins = mins > 10 ? mins.toString() : '0' + mins
    secs = secs > 10 ? secs.toString() : '0' + secs
    var time = hour + mins + secs

    console.log()
      _imgAllNode[0].src = './' + Math.floor(hour/10) +'.png'
      _imgAllNode[1].src = './' + Math.floor(hour%10) + '.png'
      _mins = mins
      _imgAllNode[3].src = './' + Math.floor(mins/10) +'.png'
      _imgAllNode[4].src = './' + Math.floor(mins%10) + '.png'
      _secs = secs
      _imgAllNode[6].src = './' + Math.floor(secs/10) +'.png'
      _imgAllNode[7].src = './' + Math.floor(secs%10) + '.png'
    if (_flag === 0) {
      _flag = 1
      _imgAllNode[2].src = './11.png'
      _imgAllNode[5].src = './11.png'
    } else {
      _flag = 0
      _imgAllNode[2].src = './12.png'
      _imgAllNode[5].src = './12.png'
    }
  }, 500);
}


'use strict'

var TIMEOUT = 1000 / 60
var requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, TIMEOUT);
    }
})()

var cancelAnimationFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    function (id) {
      return window.clearTimeout(id);
    }
})()

/**
 * 时间轴类 Timeline
 */
function Timeline() {
  /**
   * 0表示初始状态
   * 1表示播放状态
   * 2表示暂停状态
   */
  this.state = 0
  // 定时器id
  this.animationHandle = 0
}

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function (time) {
}

/**
 * 动画开始
 * @param interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function (interval) {
  if (this.state === 1) {
    return this
  }
  this.state = 1
  this.interval = interval || TIMEOUT
  startTimeline(this, +new Date())
}

/**
 * 动画停止
 */
Timeline.prototype.stop = function () {
  if (this.state !== 1) {
    return this
  }
  this.state = 2
  if (this.startTime) {
    // dur 总执行的时长
    this.dur = +new Date() - this.startTime
    cancelAnimationFrame(this.animationHandle)
  }
}
/**
 * 重新执行
 */
Timeline.prototype.restart = function () {
  if (this.state === 1) {
    return this
  }
  if (!this.dur) {
    return this
  }
  this.state = 1
  //startTimeline中会对传入的值进行 +new Date() - startTime 拿到执行总时长，也就是要加上之前的总时长this.dur = +new Date() - (+new Date() - this.dur)
  startTimeline(this, +new Date() - this.dur)
}

/**
 * 节流函数 对节流函数不理解的朋友可以去看我的防抖和节流，就知道什么是节流了
 * @param timeline timeline对象
 * @param startTime  动画开始的时间
 */
function startTimeline(timeline, startTime) {
  // 记录这一次开始的时间
  timeline.startTime = startTime

  // 记录节流函数上一次执行的时间
  var lastTime = +new Date()
  nextTask()

  function nextTask(){
    var now = +new Date()
    timeline.animationHandle = requestAnimationFrame(nextTask)

    if (now - lastTime >= timeline.interval) {
      lastTime = now
      // 执行动画的总时长
      timeline.onenterframe(now - startTime)
    }
  }
}



module.exports = Timeline

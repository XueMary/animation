


var loadImage = require('./loadImage')
var Timeline = require('./timeline')


var TIMING = 1000 / 60 // 一秒60帧的执行速度和浏览器的显示速度相同
/**
 * 帧动画类
 */
function Animation(imgList) {
  /**
   * 0为初始状态
   * 1为运动状态
   * 2为暂停状态
   */
  this._state = 0
  // 任务队列，所有事件都被载入这个任务队列中，在start后被依次执行
  this._taskQuery = []
  // 执行当前任务的索引
  this._index = 0
  // 执行任务前要先加载好img后才能执行下一个任，避免动画执行中img还没加载出来
  this._loadImage(imgList)
}

/**
 * 改变元素的 background-position 实现帧动画
 * @param ele dom对象
 * @param positions 背景位置数组 示例： ['20 0', '40 0']
 * @param imageUrl 背景图片url
 */
Animation.prototype.changePosition = function (ele, positions, imageUrl) {
  return this
}

/**
 * 通过改变图片元素的URL 实现帧动画
 * @param ele dom对象
 * @param imglist 图片url数组
 */
Animation.prototype.changeUrl = function (ele, imglist) {
  return this
}

/**
 * 循环执行
 * @param times 循环执行上一个任务的次数
 */
Animation.prototype.repeat = function (times) {
  var _this = this
  var taskFn = function (next) {
    // times为空 无限循环上一个任务
    if (typeof times === 'undefined') {
      _this._index--
      _this._runTask()
      return
    }
    // times 有数值时
    if (times) {
      times--
      _this._index--
      _this._runTask()
      return
    } else {
      next()
    }
  }
  var type = 0
  this._add(taskFn, type)
  return this
}

/**
 * 执行下一个任务的等待时长
 * @param time 等待的时长
 */
Animation.prototype.wait = function (time) {
  var taskFn = function (next) {
    setTimeout(function () {
      next()
    }, time);
  }
  var type = 0
  this._add(taskFn, type)
  return this
}

/**
 * 自定义执行任务
 * @param calback 自定义执行任务
 */
Animation.prototype.then = function (calback) {
  var taskFn = function (next) {
    calback()
    next()
  }
  var type = 0
  this._add(taskFn, type)
  return this
}

/**
 * 动画开始执行
 * @param interval 动画执行的频率
 */
Animation.prototype.start = function (interval) {
  // 本身已经是执行状态或者任务队列里没有任务时不进行操作
  if (this.state === 1 || !this.taskQuery.length) {
    return this
  }
  
  this.interval = interval || TIMING
  this.state = 1
  this._runTask()
  return this
}

/**
 * 动画暂停
 */
Animation.prototype.pause = function () {
  return this
}

/**
 * 动画从上一次暂停处重新执行
 */
Animation.prototype.restart = function () {
  return this
}


/**
 * 图片预加载
 * @param imgList 预加载的图片数组
 */
Animation.prototype._loadImage = function (imgList) {
  var taskFn = function (next) {
    loadImage(imgList, next)
  }
  /**
   * 0为非动画任务
   * 1为动画任务 比如 changePosition 和 changeUrl 事件
   */
  var type = 0

  this._add(taskFn, type)
}

/**
 * 添加任务到任务队列
 * @param taskFn 执行的任务
 * @param type 任务类型
 */
Animation.prototype._add = function (taskFn, type) {
  this._taskQuery.push({
    taskFn: taskFn,
    type: type
  })
}

/**
 * 切换到下一个任务
 */
Animation.prototype._next = function () {
  this._index++
  this._runTask()
}

/**
 * 执行当前任务
 */
Animation.prototype._runTask = function () {
  // 当任务队列没有任务时或者当前不是处于运动状态时就不做任何操作
  if (!this._taskQuery || this.state !== 1) {
    return
  }

  // 当任务全部完成时释放资源
  if (this._index === this._taskQuery.length) {
    this._dispose()
    return
  }

  var task = this._taskQuery[this._index]
  var type = task.type
  if (type === 0) {
    this._syncTask(task)
  } else if (type === 1) {
    this._asyncTask(task)
  }
}

/**
 * 动画任务
 * @param task 任务对象 {taskFn, type}
 */
Animation.prototype._asyncTask = function (task) {

}

/**
 * 非动画任务
 * @param task 任务对象 {taskFn, type}
 */
Animation.prototype._syncTask = function (task) {
  var _this = this
  var next = function () {
    _this._next()
  }
  var taskFn = task.taskFn
  taskFn(next)
}


/**
 * 释放资源
 */
Animation.prototype._dispose = function () {

}
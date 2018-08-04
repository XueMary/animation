
/**
 * 图片预加载
 * @param imglist 需要加载的图片数组
 * @param next 加载完成后进入下一个任务
 * @param timeout 图片加载超时时长
 */
function loadImage(imglist, next, timeout) {
  // 全部图片加载完成后的状态,state_array的长度等于imglist的长度时，进入next下一个任务
  var state_array = []

  for (var key in imglist) {
    // 过滤property上的属性
    if (!images.hasOwnProperty(key)) {
      continue
    }

    var item = imglist[key]

    if (typeof item === 'string') {
      item = {
        src: item
      }
    }
    // imglist[key]不存在或者typeof item !== 'string'时跳过这条数据
    if (!item || !item.src) {
      continue
    }

    item.image = new Image()
    // 加载图片
    doimg(item)
  }

  // 加载图片
  function doimg(item) {
    var img = item.image
    item = item.src
    // 加载是否超时
    item.isTimeout = false

    img.onload = function () {
      item.status = 'loaded'
      done()
    }

    img.onerror = function () {
      item.status = 'error'
      done()
    }
    // 是否超时
    if (timeout) {
      // 超时定时器
      item.timeoutId = 0
      item.timeoutId = setTimeout(onTimeout, timeout)
    }
    // 加载完成后的回调
    function done() {
      img.onload = img.onerror = null
      // 如果没有超时执行，因为超时的时候已经执行过一次了
      if (!item.isTimeout) {
        state_array.push(item.status)
        if (state_array.length === imglist.length) {
          next()
        }
      }
    }

    // 加载超时
    function onTimeout() {
      item.isTimeout = true
      state_array.push('error')
      if (state_array.length === imglist.length) {
        next()
      }
    }
  }
}



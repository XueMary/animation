animation

通常我们会遇到一些需求，用js实现一组动画（这里指的是由一帧帧图片组合而成的动画，非jq的animate）。

其实原理很简单，如果是多张图，就定时去改变image的src，如果是一张图，就定时改变backgroud-position；同时，我们还要支持图片预加载，动画执行次数（一次，n次，无限次），动画暂停，动画执行完成的回调等等。

有了上述需求，我觉得写一个通用的animation库还是很有必要的，这样用户就每必要为每一组动画写逻辑了，从繁琐的劳动中解放，不正是每个coder所期望的么：）


    npm i js-frame-animation

示例：

    import animation from 'js-frame-animation'
    
    var positions = [
     '120 0', '240 0', '360 0'
    ]

    var imglist = ['./horse.jpg']
    var rabbitEle = document.querySelector('#rabbit')

    var rabbit = animation(imglist)
    .changePosition(rabbitEle, positions, './horse.jpg')
    .repeat(4)
    rabbit.start(time * 10)
    setTimeout(() => {
      rabbit.pause()
    }, 2000);
    setTimeout(() => {
      rabbit.restart()
    }, 3000);


changePosition(ele, positions, imageUrl)  // 改变元素的 background-position 实现帧动画
    
changeUrl(ele, imgList) // 通过改变图片元素的URL 实现帧动画

repeat(times) // 动画执行的次数 times为空时无限循环

wait(time) // 动画的等待时间

then(callback) // 自定义执行任务

start(interval) // 动画开始执行，interval 表示动画执行的间隔 默认为16.7ms

pause() // 动画暂停

restart() // 动画从上一次暂停处重新执行

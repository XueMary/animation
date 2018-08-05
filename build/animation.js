!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.animation=n():t.animation=n()}(window,function(){return function(t){var n={};function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=2)}([function(t,n,e){"use strict";var i=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(t){return window.setTimeout(t,1e3/60)},o=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||function(t){return window.clearTimeout(t)};function s(){this.state=0,this.animationHandle=0}function r(t,n){t.startTime=n;var e=+new Date;!function o(){var s=+new Date;t.animationHandle=i(o);s-e>=t.interval&&(e=s,t.onenterframe(s-n))}()}s.prototype.onenterframe=function(t){},s.prototype.start=function(t){if(1===this.state)return this;this.state=1,this.interval=t||1e3/60,r(this,+new Date)},s.prototype.stop=function(){if(1!==this.state)return this;this.state=2,this.startTime&&(this.dur=+new Date-this.startTime),o(this.animationHandle)},s.prototype.restart=function(){return 1===this.state?this:this.dur?(this.state=1,void r(this,+new Date-this.dur)):this},t.exports=s},function(t,n){t.exports=function(t,n,e){var i=[];for(var o in t)if(t.hasOwnProperty(o)){var s=t[o];"string"==typeof s&&(s={src:s}),s&&s.src&&(s.image=new Image,r(s))}function r(o){var s=o.image;function r(){s.onload=s.onerror=null,o.isTimeout||(i.push(o.status),i.length===t.length&&n())}s.src=o.src,o.isTimeout=!1,s.onload=function(){o.status="loaded",r()},s.onerror=function(){o.status="error",r()},e&&(o.timeoutId=0,o.timeoutId=setTimeout(function(){o.isTimeout=!0,i.push("error"),i.length===t.length&&n()},e))}}},function(t,n,e){var i=e(1),o=e(0);function s(t){this._state=0,this._taskQuery=[],this._index=0,this._loadImage(t),this.timeline=new o}s.prototype.changePosition=function(t,n,e){var i,o,s=n.length,r=this;return s&&(i=function(i,o){e&&(t.style.backgroundImage="url("+e+")");var a=Math.min(o/r.interval|0,s),u=n[a-1].split(" ");t.style.backgroundPosition=u[0]+"px "+u[1]+"px",a===s&&i()},o=1,this._add(i,o)),this},s.prototype.changeUrl=function(t,n){var e,i,o=n.length,s=this;return o&&(e=function(e,i){t.style.backgroundImage="url("+r+")";var r=n[a-1].split(" "),a=Math.min(i/s.interval|0,o);a===o&&e()},i=1,this._add(e,i)),this},s.prototype.repeat=function(t){var n=this;return this._add(function(e){return void 0===t?(n._index--,void n._runTask()):t?(t--,n._index--,void n._runTask()):void e()},0),this},s.prototype.wait=function(t){return this._add(function(n){setTimeout(function(){n()},t)},0),this},s.prototype.then=function(t){return this._add(function(n){t(),n()},0),this},s.prototype.start=function(t){return 1!==this._state&&this._taskQuery.length?(this.interval=t||1e3/60,this._state=1,this._runTask(),this):this},s.prototype.pause=function(){return console.log(this._state),1!==this._state?this:(this._state=2,this.timeline.stop(),this)},s.prototype.restart=function(){return 2!==this._state?this:(this._state=1,this.timeline.restart(),this)},s.prototype._loadImage=function(t){this._add(function(n){i(t,n)},0)},s.prototype._add=function(t,n){this._taskQuery.push({taskFn:t,type:n})},s.prototype._next=function(){this._index++,this._runTask()},s.prototype._runTask=function(){if(this._taskQuery&&1===this._state)if(this._index!==this._taskQuery.length){var t=this._taskQuery[this._index],n=t.type;0===n?this._syncTask(t):1===n&&this._asyncTask(t)}else this._dispose()},s.prototype._asyncTask=function(t){var n=this;this.timeline.onenterframe=function(e){(0,t.taskFn)(function(){n.timeline.stop(),n._next()},e)},this.timeline.start(this.interval)},s.prototype._syncTask=function(t){var n=this;(0,t.taskFn)(function(){n._next()})},s.prototype._dispose=function(){0!==this._state&&(this._state=0,this.taskQuery=null,this.timeline.stop(),this.timeline=null)},t.exports=function(t){return new s(t)}}])});
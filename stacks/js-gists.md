### 目录
- 防抖
- 类型判断


#### 防抖
```js
/** 防抖 */
function debounce(fn, delay, immediate) {
    var timer, result
    var debounced = function () {
        var self = this
        var args = arguments

        clearTimeout(timer)
        if (immediate) {
            var doNow = !timer
            timer = setTimeout(function () {
                timer = null
            })
            if (doNow) {
                result = fn.apply(self, args)
            }
        } else {
            timer = setTimeout(function () {
                fn.apply(self, args)
            }, delay)
        }
        return result
    }
    debounced.cancel = function () {
        clearTimeout(timer)
        timer = null
    }
    return debounced
}
```

#### 类型判断
```js
const type = (function () {
    const class2type = {}
    // 生成class2type映射
    "Boolean,Number,String,Array,Date,RegExp,Object,Error,Null,Undefined".split(",").map(function(item) {
        class2type["[object " + item + "]"] = item.toLowerCase()
    })
    function _type(obj) {
        if (obj === undefined || obj === null) {
            return String(obj)
        }
        return typeof obj === 'object' ? (class2type[Object.prototype.toString.call(obj)] || 'object') : typeof obj
    }
    return _type
})()
```
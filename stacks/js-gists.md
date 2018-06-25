### 目录
- 防抖


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
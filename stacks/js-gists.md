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

```js
/**
 * 清空除特定localStorage之外的所有localStorage
 * 
 * @author wzh
 * @export
 * @param {array} [remainNames=[]] 需要保留的localStorage names
 */
export function localStorageClearAllWithoutThese (remainNames = []) {
  const remainLocalStorageContent = remainNames.map((name) => {
    const tempValue = localStorage.getItem(name)
    const value = tempValue && tempValue !== 'null' ? tempValue : ''
    return {
      name,
      value
    }
  })
  localStorage.clear()
  remainLocalStorageContent.forEach((item) => {
    localStorage.setItem(item.name, item.value)
  })
}

  /**
   * 清空除特定cookies之外的所有cookies
   * 
   * @author wzh
   * @export
   * @param {any} [remainNames=[]] 需要保留的cookies names
   */
  export function clearCookieAllWithoutThese (remainNames = []) {
    const cookies = document.cookie.split(/;\s*/)
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf('=')
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      if (remainNames.indexOf(name) === -1) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`
      }
    }
  }
/**
 * 将秒数格式化，形如：x天x时x分x秒
 * 
 * @export
 * @param { string | number } value 秒数
 * @param {string} fmt 格式化模板，形如：'{day}天 {hour}小时 {minute}分钟'
 * @returns 格式化的时间，形如：'1天 12小时 0分钟'
 */
export function formatSeconds (seconds, fmt) {
  let second = parseInt(seconds) // 秒
  let minute = 0 // 分
  let hour = 0 // 小时
  let day = 0 // 天
  if (second > 60) {
    minute = parseInt(second / 60)
    second = parseInt(second % 60)
    if (minute > 60) {
      hour = parseInt(minute / 60)
      minute = parseInt(minute % 60)
      if (hour > 24) {
        day = parseInt(hour / 24)
        hour = parseInt(hour % 24)
      }
    }
  }
  let time = fmt
  time = time.replace('{second}', parseInt(second))
  time = time.replace('{minute}', parseInt(minute))
  time = time.replace('{hour}', parseInt(hour))
  time = time.replace('{day}', parseInt(day))
  return time
}

/**
 * 将时间对象格式化为指定的格式
 * 
 * @export
 * @param {object} dateObject 日期对象
 * @param {string} fmt 格式化模板，形如：'yyyy-MM-dd EEE hh:mm:ss.S' | 'yyyy-M-d EE h:m:s.S'
 * @returns 格式化后的日期，形如：'2018-05-02 星期三 08:09:04.396' | '2018-5-2 周三 8:9:4.396'
 */
export function formatDate (dateObject, fmt) {
  const o = {
    'M+': dateObject.getMonth() + 1, // 月份 
    'd+': dateObject.getDate(), // 日 
    'h+': dateObject.getHours(), // 小时 
    'm+': dateObject.getMinutes(), // 分 
    's+': dateObject.getSeconds(), // 秒 
    'q+': Math.floor((dateObject.getMonth() + 3) / 3), // 季度
    S: dateObject.getMilliseconds() // 毫秒 
  }
  const week = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
  }
  let date = fmt
  if (/(y+)/.test(date)) {
    date = date.replace(RegExp.$1, (`${dateObject.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(date)) {
    let weekPrefix = ''
    if (RegExp.$1.length > 2) {
      weekPrefix = '星期'
    } else if (RegExp.$1.length > 1) {
      weekPrefix = '周'
    }
    date = date.replace(RegExp.$1, weekPrefix + week[`${dateObject.getDay()}`])
  } 
  Object.entries(o).forEach(([key, value]) => {
    if (new RegExp(`(${key})`).test(date)) {
      date = date.replace(RegExp.$1, (RegExp.$1.length === 1) ? (value) : ((`00${value}`).substr((`${value}`).length)))
    }
  })
  return date
}

/**
 * 格式化的日期字符串转换成：日期对象
 * 
 * @export
 * @param {string} dateString 格式化的日期字符串
 * 以下均可：
 * 'month dd,yyyy hh:mm:ss'
 * 'month dd,yyyy'
 * 'yyyy/MM/dd hh:mm:ss' | 'yyyy-MM-dd hh:mm:ss'
 * 'yyyy/MM/dd' | 'yyyy-MM-dd'
 * @returns 日期对象，形如：Wed May 02 2018 08:09:04 GMT+0800 (CST)
 */
export function getDateObjectFromDateString (dateString) {
  return new Date(dateString.replace(/-/g, '/'))
}

/**
 * 格式化的日期字符串转换成：时间戳
 * 
 * @export
 * @param {string} dateString 格式化的日期字符串
 * 以下均可：
 * 'month dd,yyyy hh:mm:ss'
 * 'month dd,yyyy'
 * 'yyyy/MM/dd hh:mm:ss' | 'yyyy-MM-dd hh:mm:ss'
 * 'yyyy/MM/dd' | 'yyyy-MM-dd'
 * @returns 时间戳，形如：1525219744000
 */
export function getTimestampFromDateString (dateString) {
  return getDateObjectFromDateString(dateString).getTime()
}
```

```js
/**
 * 生成uuid
 */
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
```

```js
/** 
 * axios下载execl
 */
var instance = axios.creat({         
  ... //一些配置
  responseType: 'blob', //返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
})

//请求时的处理：
getExcel().then(res => {
  //这里res.data是返回的blob对象
  var blob = new Blob([res.data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'
  }); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
  var downloadElement = document.createElement('a');
  var href = window.URL.createObjectURL(blob); //创建下载的链接
  downloadElement.href = href;
  downloadElement.download = 'xxx.xlsx'; //下载后文件名
  document.body.appendChild(downloadElement);
  downloadElement.click(); //点击下载
  document.body.removeChild(downloadElement); //下载完成移除元素
  window.URL.revokeObjectURL(href); //释放掉blob对象 
})
```
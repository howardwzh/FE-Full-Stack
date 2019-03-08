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

#### 图片压缩
```js
/**
 * 图片压缩
 * @param {File} file
 * @param {Function} success
 * @param {Function} error
 */
const QUALITY = 0.92 // 压缩质量
const MIN_LENGTH = 1200 // 缩放最小边的长度
const compressImage = (file, success, error) => {
  // 图片小于1M不压缩
  if (file.size < Math.pow(1024, 2)) {
    return success(file);
  }

  const name = file.name; //文件名
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = e => {
    const src = e.target.result;

    let img = new Image();
    img.src = src;
    img.onload = () => {
      const w = img.width;
      const h = img.height;
      const whRatio = w / h;
      let newW
      let newH
      if (w < h) {
        newW = Math.min(MIN_LENGTH, w)
        newH = newW/whRatio
      } else {
        newH = Math.min(MIN_LENGTH, h)
        newW = newH*whRatio
      }
      //生成canvas
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = newW;
      canvas.height = newH;
      // 根据orientation进行旋转
      getOrientation(file, function(orientation) {
        if (orientation === 6) {
          // 旋转90°
          canvas.width = newH;
          canvas.height = newW;
          ctx.rotate(Math.PI / 2);
          ctx.translate(0, -newH);
        } else if (orientation === 3) {
          // 旋转180°
          ctx.rotate(Math.PI);
          ctx.translate(-newW, -newH);
        }
        //铺底色 PNG转JPEG时透明区域会变黑色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, newW, newH);

        ctx.drawImage(img, 0, 0, newW, newH);
        // quality值越小，所绘制出的图像越模糊
        const base64 = canvas.toDataURL("image/jpeg", QUALITY); //图片格式jpeg或webp可以选0-1质量区间

        // 返回base64转blob的值
        console.log(
          `原图${(src.length / 1024).toFixed(2)}kb`,
          `新图${(base64.length / 1024).toFixed(2)}kb`
        );
        //去掉url的头，并转换为byte
        const bytes = window.atob(base64.split(",")[1]);
        //处理异常,将ascii码小于0的转换为大于0
        const ab = new ArrayBuffer(bytes.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        file = new Blob([ab], { type: "image/jpeg" });
        file = new window.File([file], name, { type: file.type });
        success(file);
      });
    };
    img.onerror = e => {
      error(e);
    };
  };
  reader.onerror = e => {
    error(e);
  };
};

/**
 * 获取原始图片Orientation值
 * @param {File} file
 * @param {Function} callback
 */
function getOrientation(file, callback) {
  var reader = new FileReader();
  reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
  reader.onload = function(event) {
    var view = new DataView(event.target.result);

    if (view.getUint16(0, false) != 0xffd8) return callback(-2);

    var length = view.byteLength,
      offset = 2;

    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;

      if (marker == 0xffe1) {
        if (view.getUint32((offset += 2), false) != 0x45786966) {
          return callback(-1);
        }
        var little = view.getUint16((offset += 6), false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;

        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + i * 12, little) == 0x0112)
            return callback(view.getUint16(offset + i * 12 + 8, little));
      } else if ((marker & 0xff00) != 0xff00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
  };
}

export default compressImage;

```

#### 表单提交
```js
/**
 * 表单提交
 * @param {Object} param
 * @param {String} param.method
 * @param {String} param.action
 * @param {Object} param.data
 */
export function formSubmit({method = 'POST', action, data = {}}) {
  const form = document.createElement('form')
  form.method = method
  form.action = action

  for (const name in data) {
    const element = document.createElement('input')
    element.name = name
    element.value = data[name]
    form.appendChild(element)
  }

  document.body.appendChild(form)
  form.submit()
}
```
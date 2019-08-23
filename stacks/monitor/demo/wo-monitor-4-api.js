(function(window) {
  var host = 'http://localhost:3000'
  /****************************** entry ******************************/
  var initInfo = {}
  var loadInfo = {}
  collectInitInfo()
  window.onload = function() {
    loadInfo = collectLoadInfo()
    console.log(loadInfo)
  }
  window.onerror = function(msg, url, line, col, error) {
    (new window.Image()).src = host + '/m?url='+url+'&msg='+msg+'&line='+line+'&col='+col+'&error='+error+'&device='+initInfo.mobile+'&userId='+getCookie('cg_userid')+'&userPhone='+getCookie('cg_phone')
  }
  /****************************** collector ******************************/
  /**
   * 收集初始化信息
   */
  function collectInitInfo() {
    initInfo = {}
    initInfo.mobile = getBrowserInfo()
    initInfo.openTime = performance.timing.navigationStart
    initInfo.whiteScreenTime = new Date().getTime() - initInfo.openTime
    document.addEventListener('DOMContentLoaded', function(event) {
      initInfo.readyTime = new Date().getTime() - initInfo.openTime
    })
  }
  /**
   * 收集加载阶段信息
   */
  function collectLoadInfo() {
    var loadInfo = {
      '白屏时间': initInfo.whiteScreenTime + 'ms',
      '用户可操作时间': initInfo.readyTime + 'ms',
      '总下载时间': new Date().getTime() - initInfo.openTime + 'ms',
      '使用设备': initInfo.mobile,
      '当前时间': formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss.S')
    }
    return loadInfo
  }
  
  /****************************** helper ******************************/
  /**
   * 获取浏览器的类型信息
   */
  function getBrowserInfo() {
    var UA = navigator.userAgent || ''
    var isGzjkApp = /FinaceHoldingsOnline/i.test(UA)
    var isAndroid = (function() {
      return !!UA.match(/Android/i)
    })()
    var isQQ = (function() {
      return (
        /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d.]+)/.test(UA) ||
        /\bV1_AND_SQI?_([\d.]+)(.*? QQ\/([\d.]+))?/.test(UA)
      )
    })()
    var isIOS = (function() {
      return !!UA.match(/iPhone|iPad|iPod/i)
    })()
    var isSafari = (function() {
      return /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA)
    })()
    var isWx = (function() {
      return !!UA.match(/micromessenger/i)
    })()
    var isWb = (function() {
      return !!UA.match(/weibo/i)
    })()
    var isAndroidChrome = (function() {
      return (
        (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) &&
        isAndroid &&
        !isQQ
      )
    })()
    var isQZ = (function() {
      return UA.indexOf('Qzone/') !== -1
    })()
    var isWebview = (function() {
      var useragent = navigator.userAgent
      var rules = [
        'WebView',
        '(iPhone|iPod|iPad)(?!.*Safari/)',
        'Android.*(wv|.0.0.0)'
      ]
      var regex = new RegExp('(' + rules.join('|') + ')', 'ig')
      return Boolean(useragent.match(regex))
    })()
    var browser = {
      isGzjkApp,
      isAndroid,
      isIOS,
      isSafari,
      isQQ,
      isWb,
      isWx,
      isQZ,
      isAndroidChrome,
      isWebview
    }
    var list = []
    for (var key in browser) {
      if (browser[key]) {
        list.push(key)
      }
    }
    return list.join(', ')
  }
  /**
   * 将时间对象格式化为指定的格式
   * 
   * @export
   * @param {object} dateObject 日期对象
   * @param {string} fmt 格式化模板，形如：'yyyy-MM-dd EEE hh:mm:ss.S' | 'yyyy-M-d EE h:m:s.S'
   * @returns 格式化后的日期，形如：'2018-05-02 星期三 08:09:04.396' | '2018-5-2 周三 8:9:4.396'
   */
  function formatDate (dateObject, fmt) {
    var o = {
      'M+': dateObject.getMonth() + 1, // 月份 
      'd+': dateObject.getDate(), // 日 
      'h+': dateObject.getHours(), // 小时 
      'm+': dateObject.getMinutes(), // 分 
      's+': dateObject.getSeconds(), // 秒 
      'q+': Math.floor((dateObject.getMonth() + 3) / 3), // 季度
      S: dateObject.getMilliseconds() // 毫秒 
    }
    var week = {
      0: '日',
      1: '一',
      2: '二',
      3: '三',
      4: '四',
      5: '五',
      6: '六'
    }
    var date = fmt
    if (/(y+)/.test(date)) {
      date = date.replace(RegExp.$1, (''+dateObject.getFullYear()).substr(4 - RegExp.$1.length))
    }
    if (/(E+)/.test(date)) {
      var weekPrefix = ''
      if (RegExp.$1.length > 2) {
        weekPrefix = '星期'
      } else if (RegExp.$1.length > 1) {
        weekPrefix = '周'
      }
      date = date.replace(RegExp.$1, weekPrefix + week[''+dateObject.getDay()])
    }
    for (var key in o) {
      var value = o[key]
      if (new RegExp(''+key).test(date)) {
        date = date.replace(RegExp.$1, (RegExp.$1.length === 1) ? (value) : (('00'+value).substr((''+value).length)))
      }
    }
    return date
  }
  /**
   * 获取cookie指定值
   * @param {string} name
   */
  function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    return (arr = document.cookie.match(reg)) ? decodeURIComponent(arr[2]) : null;
  }
})(window)

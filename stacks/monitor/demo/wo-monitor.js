(function(window) {
  /****************************** entry ******************************/
  if (getHashVal('gzjkDebug') !== 'show') return
  var initInfo = {}
  var loadInfo = {}
  var errorInfo = {}
  var isLoaded = false
  collectInitInfo()
  window.onload = function() {
    loadInfo = collectLoadInfo()
    insertErrorPanelToPage(true)
    isLoaded = true
  }
  window.onerror = function(msg, url, line, col, error) {
    errorInfo = collectErrorInfo(msg, url, line, col, error)
    if (isLoaded) {
      insertErrorPanelToPage()
    }
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
  /**
   * 收集发生错误时的信息
   * @param {String} msg 
   * @param {String} url 
   * @param {Number} line 
   * @param {Number} col 
   * @param {Object} error 
   */
  function collectErrorInfo(msg, url, line, col, error) {
    var errorInfo = {
      '错误提示': msg,
      '错误所在文件': url,
      '错误所在的行': line,
      '错误所在的列': col || (window.event && window.event.errorCharacter) || 0,
      '错误发生时间': formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss.S')
    }
    // if (error && error.stack) {
    //   // 如果浏览器有堆栈信息，直接使用
    //   errorInfo['错误提示'] = error.stack.toString()
    // } else if (isOBJByType(msg, 'Event')) {
    //   errorInfo['错误提示'] += msg.type ? ('--' + msg.type + '--' + (msg.target ? (msg.target.tagName + '::' + msg.target.src) : '')) : ''
    //   errorInfo['错误提示'] = (errorInfo['错误提示'] + '').substr(0,500)
    // }
    errorInfo['错误提示'] = errorInfo['错误提示'].split(/\sat\s/)[0]
    return errorInfo
  }
  /****************************** helper ******************************/
  /**
   * 是否对象类型
   * @param {String} o 
   * @param {String} type 
   */
  function isOBJByType(o, type) {
      return Object.prototype.toString.call(o) === '[object ' + (type || 'Object') + ']'
  }
  /**
   * 获取url中指定hash值
   * @param {string} key
   */
  function getHashVal(key) {
    if (!key) return ''
    var pattern = new RegExp('[?&]?' + key + '=([^&#%]*)')
    var matchArray = decodeURIComponent(window.location.href).match(pattern) || []
    var hashVal = matchArray[1] || ''
    return hashVal
  }
  /**
   * 向body插入错误信息面板
   */
  function insertErrorPanelToPage (isFirstLoad) {
    var errorPanel = document.createElement('div')
    errorPanel.style.cssText = 'position:fixed;left:0;top:0;height:100%;width:100%;z-index:100;background-color:rgba(0,0,0,.6);';
    var allHtmlArray = [
      '<div style="box-sizing:border-box;position:absolute;max-height:80%;bottom:0;width:100%;background:#fff;overflow:auto;border-top:1px solid #999;font-size:14px;line-height:20px;">',
      '<span style="position:absolute;right:10px;top:12px;font-size:12px;border:1px solid #333;padding:0 8px;border-radius:3px;line-height:16px;" id="woDebugBtn" href="javascript:;">关闭</span>',
      '',
      '',
      '</div>'
    ]
    if (isFirstLoad) {
      allHtmlArray[2] = makeMsgHtml('页面加载信息', loadInfo, isFirstLoad)
    }
    if (errorInfo['错误提示']) {
      allHtmlArray[3] = makeMsgHtml('错误提示', errorInfo)
    }
    errorPanel.innerHTML = allHtmlArray.join('')
    document.body.appendChild(errorPanel)
    document.getElementById('woDebugBtn').onclick = function () {
      errorPanel.parentNode.removeChild(errorPanel)
    }
  }
  /**
   * 拼接错误信息
   * @param {String} title 错误信息的标题
   * @param {Object} msgObj 错误信息的内容
   */
  function makeMsgHtml(title, msgObj, isFirstLoad) {
    var msgHtmlArray = [
      '<div style="color:#dc143c;border-bottom:1px solid #f4a0ab;background-color:#ffe4e1;padding:6px 10px;">',
      '<p style="font-weight:500;font-size:14px;padding:8px 0;margin:0;">' + title + '</p>',
      '',
      '</div>'
    ]
    if (isFirstLoad) {
      msgHtmlArray[0] = '<div style="border-bottom:1px solid #f4a0ab;padding:6px 10px;">'
    }
    for (var k in msgObj) {
      msgHtmlArray[2] += '<p style="font-size:12px;padding:2px 0;margin:0;">' + k + ': ' + msgObj[k] + '</p>'
    }
    return msgHtmlArray.join('')
  }
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
})(window)

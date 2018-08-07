/**
 * 浏览器的相关信息
 */
const Browser = /** @class */ (function () {
  function Browser () {}
  /**
     * 获取浏览器数据
     */
  Browser.getBrowser = function () {
    const UA = navigator.userAgent || ''
    const isAndroid = (function () {
      return !!UA.match(/Android/i)
    }())
    const isQQ = (function () {
      return /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) || /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA)
    }())
    const isIOS = (function () {
      return !!UA.match(/iPhone|iPad|iPod/i)
    }())
    const isSafari = (function () {
      return /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA)
    }())
    const isWx = (function () {
      return !!UA.match(/micromessenger/i)
    }())
    const isWb = (function () {
      return !!UA.match(/weibo/i)
    }())
    const isAndroidChrome = (function () {
      return (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) && isAndroid && !isQQ
    }())
    const isQZ = (function () {
      return UA.indexOf('Qzone/') !== -1
    }())
    const browser = {
      isAndroid,
      isIOS,
      isSafari,
      isQQ,
      isWb,
      isWx,
      isQZ,
      isAndroidChrome
    }
    return browser
  }
  return Browser
}())

/**
 * AppLink:H5唤起APP的所有方法
 */
const AppLink = /** @class */ (function () {
  /**
     * 类的contructor方法
     * @param config IAppLink类型的config文件
     */
  function AppLink (config) {
    /**
         * UA
         */
    this.UA = {}
    /**
         * 传入的config数据，以接口约束
         */
    this.config = {}
    this.UA = navigator.userAgent || ''
    this.config = config
  }
  /**
     * 跳转函数
     * @param url 链接
     */
  AppLink.prototype.go = function (url) {
    window.location.href = url
    setTimeout(() => {
      alert('如果没有正常跳转下载页面，请重试或者在自带浏览器中打开再试：）')
    }, 2000)
  }
  /**
     * 检查是否唤起
     * @param cb 回调函数
     */
  AppLink.prototype.checkOpen = function (cb) {
    let inter = null
    let statue = false
    let count = 0
    inter = window.setInterval(() => {
      count++
      statue = document.hidden || document.webkitHidden
      if (statue || count > 40) {
        cb(statue)
        clearInterval(inter)
      }
    }, 50)
  }
  /**
     * 外部调用的入口函数
     */
  AppLink.prototype.open = function () {
    const browser = Browser.getBrowser()
    const config = this.config
    // 使用scheme唤起
    this.tryCallApp(this.config.schema)
    // 唤起失败
    this.checkOpen((isSuccess) => {
      if (!isSuccess) {
        this.go(this.getDownloadUrl())
      }
    })
  }
  /**
     * 下载按钮的url地址
     */
  AppLink.prototype.getDownloadUrl = function () {
    const browser = Browser.getBrowser()
    const config = this.config
    let url = ''
    if (browser.isQQ) {
      if (browser.isIOS) {
        url = this.config.appstore
      } else {
        url = this.config.yyb
      }
    } else if (browser.isSafari) {
      const version = this.getIOSVersion()
      if (version < 10) {
        url = this.config.yyb
      } else {
        url = this.config.appstore
      }
    } else if (browser.isWb) {
      url = ''
    } else {
      url = this.config.yyb
    }
    return url
  }
  /**
     * 尝试唤起APP
     * @param scheme 唤起的scheme
     */
  AppLink.prototype.tryCallApp = function (scheme) {
    let aLink = document.createElement('a'),
      body = document.body
    aLink.href = scheme
    body.appendChild(aLink)
    aLink.click()
  }
  /**
     * 判断iOS版本
     */
  AppLink.prototype.getIOSVersion = function () {
    const ver = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)
    const version = parseInt(ver[1], 10)
    return version
  }
  return AppLink
}())

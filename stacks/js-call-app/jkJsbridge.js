/*************************** jsbridge ***************************/
var binfo = getBrowser()
var jkjsbridge = {
    isInit: false,
    registerEvent4Native: function (cbName, callback) {
        if (binfo.isAndroid && !this.isInit) {
            androidInit()
            this.isInit = true
        }
        if (binfo.isAndroid) {
            androidRegisterEvent4Native(cbName, callback)
        } else {
            iosRegisterEvent4Native(cbName, callback)
        }
    },
    callNativeEvent: function (cbName, data, callback) {
        if (binfo.isAndroid && !this.isInit) {
            androidInit()
            this.isInit = true
        }
        if (binfo.isAndroid) {
            androidCallNativeEvent(cbName, data, callback)
        } else {
            iosCallNativeEvent(cbName, data, callback)
        }
    }
}

/**
 * 获取浏览器的相关信息
 */
function getBrowser() {
  const UA = navigator.userAgent || "";
  const isAndroid = (function() {
    return !!UA.match(/Android/i);
  })();
  const isQQ = (function() {
    return (
      /(iPad|iPhone|iPod).*? (IPad)?QQ\/([\d\.]+)/.test(UA) ||
      /\bV1_AND_SQI?_([\d\.]+)(.*? QQ\/([\d\.]+))?/.test(UA)
    );
  })();
  const isIOS = (function() {
    return !!UA.match(/iPhone|iPad|iPod/i);
  })();
  const isSafari = (function() {
    return /iPhone|iPad|iPod\/([\w.]+).*(safari).*/i.test(UA);
  })();
  const isWx = (function() {
    return !!UA.match(/micromessenger/i);
  })();
  const isWb = (function() {
    return !!UA.match(/weibo/i);
  })();
  const isAndroidChrome = (function() {
    return (
      (UA.match(/Chrome\/([\d.]+)/) || UA.match(/CriOS\/([\d.]+)/)) &&
      isAndroid &&
      !isQQ
    );
  })();
  const isQZ = (function() {
    return UA.indexOf("Qzone/") !== -1;
  })();
  const browser = {
    isAndroid,
    isIOS,
    isSafari,
    isQQ,
    isWb,
    isWx,
    isQZ,
    isAndroidChrome
  };
  return browser;
}

/*************************** android ***************************/
/**
 * 安装webview jsbridge
 * @param {function} callback
 */
function connectWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge);
  } else {
    document.addEventListener(
      "WebViewJavascriptBridgeReady",
      function() {
        callback(WebViewJavascriptBridge);
      },
      false
    );
  }
}

/**
 * android需要初始化
 */
function androidInit() {
  connectWebViewJavascriptBridge(function(bridge) {
    bridge.init();
  });
}

/**
 * 为原生注册可调用函数
 * @param {string} cbName 函数名，需要与原生约定好
 * @param {funtion} callback 形如：function(data, responseCallback){...}
 */
function androidRegisterEvent4Native(cbName, callback) {
  connectWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler(cbName, callback);
  });
}

/**
 * 调用原生服务
 * @param {string} cbName 函数名，需要与原生约定好
 * @param {object} data 传原生的参数
 * @param {funtion} callback 形如：function(response){...}
 */
function androidCallNativeEvent(cbName, data, callback) {
  window.WebViewJavascriptBridge.callHandler(cbName, data, callback);
}

/*************************** ios ***************************/
/**
 * 安装webview jsbridge
 * @param {function} callback
 */
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "https://__bridge_loaded__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

/**
 * 为原生注册可调用函数
 * @param {string} cbName 函数名，需要与原生约定好
 * @param {funtion} callback 形如：function(data, responseCallback){...}
 */
function iosRegisterEvent4Native(cbName, callback) {
  setupWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler(cbName, callback);
  });
}

/**
 * 调用原生服务
 * @param {string} cbName 函数名，需要与原生约定好
 * @param {object} data 传原生的参数
 * @param {funtion} callback 形如：function(response){...}
 */
function iosCallNativeEvent(cbName, data, callback) {
  setupWebViewJavascriptBridge(function(bridge) {
    bridge.callHandler(cbName, data, callback);
  });
}


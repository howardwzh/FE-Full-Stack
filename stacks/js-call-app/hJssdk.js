/*************************** hJssdk ***************************/
var hJssdk = {
  isInit: false,
  browser: getBrowser(),
  registerEvent4Native: function(callbackName, callback) {
    if (!this.browser.isWebview) return;
    if (this.browser.isAndroid) {
      if (!this.isInit) {
        androidInit();
        this.isInit = true;
      }
      androidRegisterEvent4Native(callbackName, callback);
    } else {
      iosRegisterEvent4Native(callbackName, callback);
    }
  },
  callNativeEvent: function(callbackName, data, callback) {
    if (!this.browser.isWebview) return;
    if (this.browser.isAndroid) {
      if (!this.isInit) {
        androidInit();
        this.isInit = true;
      }
      androidCallNativeEvent(callbackName, data, callback);
    } else {
      iosCallNativeEvent(callbackName, data, callback);
    }
  }
};

/**
 * 获取浏览器的相关信息
 */
function getBrowser() {
  var UA = navigator.userAgent || "";
  var isAndroid = (function() {
    return !!UA.match(/Android/i);
  })();
  var isIOS = (function() {
    return !!UA.match(/iPhone|iPad|iPod/i);
  })();
  var isWebview = (function() {
    var rules = [
      "WebView",
      "(iPhone|iPod|iPad)(?!.*Safari/)",
      "Android.*(wv|.0.0.0)"
    ];
    var regex = new RegExp(`(${rules.join("|")})`, "ig");
    return Boolean(UA.match(regex));
  })();
  return {
    isAndroid: isAndroid,
    isIOS: isIOS,
    isWebview: isWebview
  };
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
 * @param {string} callbackName 函数名，需要与原生约定好
 * @param {funtion} callback 形如：function(data, responseCallback){...}
 */
function androidRegisterEvent4Native(callbackName, callback) {
  connectWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler(callbackName, callback);
  });
}

/**
 * 调用原生服务
 * @param {string} callbackName 函数名，需要与原生约定好
 * @param {object} data 传原生的参数
 * @param {funtion} callback 形如：function(response){...}
 */
function androidCallNativeEvent(callbackName, data, callback) {
  connectWebViewJavascriptBridge(function(bridge) {
    bridge.callHandler(callbackName, data, callback);
  });
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
 * @param {string} callbackName 函数名，需要与原生约定好
 * @param {funtion} callback 形如：function(data, responseCallback){...}
 */
function iosRegisterEvent4Native(callbackName, callback) {
  setupWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler(callbackName, callback);
  });
}

/**
 * 调用原生服务
 * @param {string} callbackName 函数名，需要与原生约定好
 * @param {object} data 传原生的参数
 * @param {funtion} callback 形如：function(response){...}
 */
function iosCallNativeEvent(callbackName, data, callback) {
  setupWebViewJavascriptBridge(function(bridge) {
    bridge.callHandler(callbackName, data, callback);
  });
}

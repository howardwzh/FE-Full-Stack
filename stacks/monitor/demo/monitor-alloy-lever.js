AlloyLever.config({
  cdn:'https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js',  //vconsole的CDN地址
  reportUrl: '',           //错误上报地址
  reportPrefix: 'gzjk',    //错误上报msg前缀，一般用于标识业务类型
  reportKey: 'msg',        //错误上报msg前缀的key，用户上报系统接收存储msg
  otherReport: {},         //需要上报的其他信息
  entry: '#entry'           //请点击这个DOM元素6次召唤vConsole。//你可以通过AlloyLever.entry('#entry2')设置多个机关入口召唤神龙
})
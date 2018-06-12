
module.exports = {
  onLocalIP:{
    rule: /https?:\/\/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}(:\d*)?/,
    msg: '线上发布脚本中不能含有本地测试ip！请删除后再执行发布操作。'
  }
};

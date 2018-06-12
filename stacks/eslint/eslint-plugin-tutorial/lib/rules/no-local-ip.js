var onLocalIP = require('../utils/check-list').onLocalIP;

module.exports = {
  meta: {
    docs: {
      description: "线上发布脚本中不能含有本地测试ip！请删除后再执行发布操作。",
      category: "Possible Errors",
      recommended: true
    },
    schema: []
  },
  create: function (context) {
    return {
      Literal: function (node) {
        if (onLocalIP.rule.test(node.value)) {
          context.report(node, onLocalIP.msg);
        }
      }
    };
  }
};
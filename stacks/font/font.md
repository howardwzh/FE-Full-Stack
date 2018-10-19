## 参考资源
- [被方正投诉侵权用了他们的字体，该怎么处理最佳？](https://www.zhihu.com/question/37167583)
- [How to Add Custom Font to Website through @fontface?](https://www.balbooa.com/knowledgebase/32-documentation-faq-joomla/176-how-to-add-custom-font-to-website-through-fontface)

## 替换方案研究
> 主要问题出在方正的 **“微软雅黑”**

1. 如果紧急，可先换成 **“宋体”**
2. 之后再找替换字体，可选 **“汉仪字体”** - **“汉仪旗黑”**


## css字体引入

### Step:1 Download the font


### Step:2 用font-face引入
```css
/** 引入 */
@font-face {
  font-family: "Harabara Bold";
  src: url("css/fonts/Harabara.eot");
  src: 
  url("css/fonts/Harabara.woff") format("woff"),
  url("css/fonts/Harabara.otf") format("opentype"),
  url("css/fonts/Harabara.svg#HarabaraBold") format("svg"); /* 打开svg文件，查看font标签的id值HarabaraBold */
}
```

### Step:3 使用font
```css
/** 使用 */
body {
  font-family: "Harabara Bold";
}
```

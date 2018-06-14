# 面试

## 参考文章

- [关于前端面试](https://mdluo.github.io/blog/about-front-end-interview/)
- [Angular面试从喜剧到悲剧的十个问题](https://segmentfault.com/a/1190000005817928)
- [React 常用面试题目与分析](https://zhuanlan.zhihu.com/p/24856035#tipjar)
- [写给前端面试者](https://github.com/amfe/article/issues/5)
- [FEX 面试问题](https://github.com/fex-team/interview-questions)
- [前端工作面试问题](https://github.com/h5bp/Front-end-Developer-Interview-Questions/tree/master/Translations/Chinese)

## 问题

- 简单自我介绍？(着重看项目和技术能力上的成长经历)
- 最近所用技术?（与公司的契合度、是否是前沿技术）
- 用该项技术是出于什么考虑，有什么优点?（考查其对些技术的综合了解程度，与运用心得）
- 有没有了解过世面上的mvvm框架（vue、react、angular）？有接触过哪些？这些框架之间的区别是什么
- 有了解过[mvvm](http://www.ruanyifeng.com/blog/2015/02/mvcmvp_mvvm.html)吗？前端的mv指什么？后面的vm是什么？ 
  + 我们常说的MV模式，而MVC、MVVM、 MVP[2]等都是MV的衍生物， 其实叫什么模式名称并不重要，当你现在搞清楚了这种代码组织结构的目的，就会明白这些模式本质上都是一回事，让数据与视图间不会发生直接联系。
- 具体技术点问题:
  - javascript(es6)
    - 闭包是什么？
    - 有了解过Common.js吗？
      + CommonJS就是为JS的表现来制定规范，因为js没有模块的功能所以CommonJS应运而生，它希望js可以在任何地方运行，不只是浏览器中。CommonJS定义的模块分为:{模块引用(require)} {模块定义(exports)} {模块标识(module)}。require()用来引入外部模块；exports对象用于导出当前模块的方法或变量，唯一的导出口；module对象就代表模块本身。
  - http
  - vue(vue1还是vue2)
    + 纵向
      * 是一套构建用户界面的 渐进式框架？那什么是渐进式框架？
        - 渐进式代表的含义是：主张最少。
        - Vue可能有些方面是不如React，不如Angular，但它是渐进的，没有强主张，你可以在原有大系统的上面，把一两个组件改用它实现，当jQuery用；也可以整个用它全家桶开发，当Angular用；还可以用它的视图，搭配你自己设计的整个下层用。你可以在底层数据逻辑的地方用OO和设计模式的那套理念，也可以函数式，都可以，它只是个轻量视图而已，只做了自己该做的事，没有做不该做的事，仅此而已。渐进式的含义，我的理解是：没有多做职责之外的事。
    + 横向
      * 用什么ui框架（mint、element、vux）
      * vuex
      * [更轻更快的Vue.js 2.0与其他框架对比](https://mp.weixin.qq.com/s?__biz=MzIwNjQwMzUwMQ==&mid=2247484329&idx=1&sn=f79da7c92cda7352c8a651f459ef4172&chksm=9723616ba054e87df94522a9c67de26c9ac1f2532198506f47f9c589070d4c530a66ed37dd70&scene=21#wechat_redirect)
  - react
    + 纵向
      + 调用 setState 之后发生了什么？
        * 在代码中调用setState函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个UI界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。
      + React 中 keys 的作用是什么？
        * Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。
      + React 有哪些生命周期？在生命周期中的哪一步你应该发起 AJAX 请求？
        * componentWillMount()
        * componentDidMount()
        * componentWillUpdate(object nextProps, object nextState)
        * componentDidUpdate(object prevProps, object prevState)
        * componentWillUnmount()
        * 应该发起 AJAX 请求在componentDidMount
      + shouldComponentUpdate 的作用是啥以及为何它这么重要？
        * shouldComponentUpdate 允许我们手动地判断是否要进行组件更新，根据组件的应用场景设置函数的合理返回值能够帮我们避免不必要的更新。
      + 为什么我们需要使用 React 提供的 Children API 而不是 JavaScript 的 map？
        * props.children并不一定是数组类型，如果我们使用props.children.map函数来遍历时会受到异常提示，因为在这种情况下props.children是对象（object）而不是数组（array）。React 当且仅当超过一个子元素的情况下会将props.children设置为数组。这也就是我们优先选择使用React.Children.map函数的原因，其已经将props.children不同类型的情况考虑在内了。
    + 横向
      * 使用过什么ui框架（antd）
      * redux(mobx更佳)
      * immutable
  - RN
    - 用什么布局，兼容性怎么处理（字号在不同设备上的适配）
    - 用什么ui框架
    - ListView 与 ScrollView区别
      + 记住ScrollView必须有一个确定的高度才能正常工作
- 现在你再找工作最看重的是什么？未来发展方向（技术or管理）？
- 如果前面回答的不错
  - 兴趣爱好
  - 最近研究的技术

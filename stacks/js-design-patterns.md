## 设计模式
> 每个模式都描述了一个在我们的环境中不断出现的问题，然后描述了该问题的解决方案的核心，通过这种方式，我们可以无数次地重用那些已有的成功的解决方案，无须再重复相同的工作。这个定义可以简单地用一句话表示：
>
> 模式是在特定环境下人们解决某类重复出现问题的一套成功或有效的解决方案。【A pattern is a successful or efficient solution to a recurring  problem within a context】
> 
> 设计模式(Design Pattern)是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结，使用设计模式是为了可重用代码、让代码更容易被他人理解并且保证代码可靠性。

## 目录
- 单例模式


### 单例模式
- 使用场景：类似情况-Windows的“任务管理器”只需打开一个，避免资源浪费，且多个窗口时造成数据显示可能不一致问题
- 构成：
    - 唯一实例
    - 缓存唯一实例的私有变量
    - 返回唯一实例的方法
- 代码：
```js
const SingletonPractice = (function () {
    // 参数：传递给单例的一个参数集合
    function Singleton(args) {
        const _args = args || {} // 设置args变量为接收的参数或者为空
        this.name = 'howard' // 设置name参数，不可变
        this.age = _args.age || 18 // 设置age参数，从接收参数获取，或者使用默认
    }
    // 唯一实例私有变量
    let instance
    return {
        name: 'SingletonPractice',
        // 获取实例的方法
        // 返回Singleton的唯一实例
        getInstance (args) {
            if (instance === undefined) {
                instance = new Singleton(args) // 实例化并缓存在私有变量，之后只返回缓存的唯一实例
            } else { // 已经有实例时，直接改变实例中的参数
                for (const k in args) {
                    instance[k] = args[k]
                }
            }
            return instance
        }
    }
})()
// 调用示例
const singletonA = SingletonPractice.getInstance({age: 20})
console.log(singletonA.age) // 输入：20
const singletonB = SingletonPractice.getInstance({age: 50})
console.log(singletonB.age) // 输入：50
console.log(singletonA.age) // 输入：50，值一样是因为使用了同一个实例
```

### 工厂模式
- 使用场景：一类事物（女生）的不同方法（逛街、化妆、看电影等）
- 代码：
```js
const Girl = {
    goShopping () {
        // TODO: 逛街
    },
    makeUp () {
        // TODO: 化妆
    },
    seeMovie () {
        // TODO: 看电影
    }
}
```

### 发布订阅模式
- 使用场景：需要监听变化（事件）去触发相应方法
- 代码：
```js
const event = {
    list: {},
    listen (key, fn) {
        if(!this.list[key]) {
            this.list[key] = []
        }
        // 订阅的消息添加到缓存列表中
        this.list[key].push(fn)
    },
    trigger () {
        const key = Array.prototype.shift.call(arguments)
        const fns = this.list[key]
        // 如果没有订阅过该消息的话，则返回
        if(!fns || fns.length === 0) {
            return;
        }
        for(const i = 0,fn; fn = fns[i++];) {
            fn.apply(this, arguments)
        }
    }
}
```
我们再定义一个initEvent函数，这个函数使所有的普通对象都具有发布订阅功能
```js
const initEvent = (obj) => {
    for(const i in event) {
        obj[i] = event[i]
    }
};
// 我们再来测试下，我们还是给shoeObj这个对象添加发布-订阅功能；
const shoeObj = {}
initEvent(shoeObj)

// 小红订阅如下消息
shoeObj.listen('red',(size) => {
    console.log("尺码是：" + size)  
})

// 小花订阅如下消息
shoeObj.listen('block',(size) => {
    console.log("再次打印尺码是：" + size)
});
shoeObj.trigger('red', 40)
shoeObj.trigger('block', 42)
```

### 中间件模式
- 对象方式
```js
const middleware = {
    init (num) {
        this.result = num
        return this
    },
    add (num) {
        this.result += num
        return this
    },
    sub (num) {
        this.result -= num
        return this
    },
    getResult () {
        return this.result
    }
}

const result = middleware.init(3).add(10).sub(2).getResult()
```
- 借用 express 与 koa的中间件思想
```js
// 初始化
function Middleware () {
    this.cache = []
}

// 通过数组缓存中间件
Middleware.prototype.use = (fn) => {
    if (typeof fn !== 'function') {
        throw 'middleware must be a function'
    }
    // console.log(this.cache)
    this.cache.push(fn)
    return this
}

// next
Middleware.prototype.next = () => {
    if(this.middlewares && this.middlewares.length) {
        const ware = this.middlewares.shift()
        ware.call(this, this.next.bind(this))
    }
}

// go
Middleware.prototype.go = () => {
    this.middlewares = this.cache.map(fn => fn)
    this.next()
}
```
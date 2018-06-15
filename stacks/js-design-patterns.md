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

# config-dictionary

- [karma.conf.js](./karma.conf.js.md)
- [karma.cov.conf.js](./karma.cov.conf.js.md)
- [mocha-chai](./mocha-chai.md)
- [jest](#jest)

### jest

> 参考：
> - [官网](https://jestjs.io/docs/zh-Hans/getting-started)
> - [命令/配置](https://jestjs.io/docs/zh-Hans/cli)

#### 命令/配置 (package.json -> scripts)
- 测试并watch
```json
"unit": "jest --watch"
```
- 测试覆盖率
```json
"coverage": "jest --coverage"
```
- 测试并debug
```json
"debug": "node --inspect-brk ./node_modules/.bin/jest -i --watch"
```
1. 执行`yarn run debug`
2. chrome地址栏输入`chrome://inspect/#devices`
3. 点击对应的`Remote Target - inspect`

#### 常见问题

1. `SecurityError: localStorage is not available for opaque`
```js
// 在`package.json`中加入

"jest": {
  "verbose": true,
  "testURL": "http://localhost/"
}
```
  
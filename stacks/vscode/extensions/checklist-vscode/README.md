# checklist-vscode

My first vscode plugin.

## 参考
- [Your first extension](https://code.visualstudio.com/docs/extensions/example-hello-world)

### 初始化
1. 使用yomen构建extension向导脚手架
```shell
npm install -g yo generator-code
yo code
```
2. 根据需要在交互命令行界面选择配置项
```
? What type of extension do you want to create? (Use arrow keys)
  New Extension (TypeScript) // 新建扩展（使用TypeScript）
❯ New Extension (JavaScript) // 新建扩展（使用JavaScript）选择此项
  New Color Theme // 新建颜色主题扩展
  New Language Support // 新建语言扩展
  New Code Snippets // 新建代码片断扩展
  New Keymap // 新建键盘映射扩展
  New Extension Pack // 新建扩展包
```
### 观察目录结构，主要可以修改2个文件`package.json`和`extension.js`
#### package.json
```json
...
"contributes": {
    "commands": [
        {
            "command": "extension.sayHello",
            "title": "Hello World"
        }
    ]
}
...
```
上面title对应的就是`⇧⌘P`弹出命令时需要输入的命令标题，其对应的实际命令是command(extension.sayHello)

#### extension.js
```js
...
let disposable = vscode.commands.registerCommand('extension.sayHello', function () {
    // The code you place here will be executed every time your command is executed

    // Display a message box to the user
    vscode.window.showInformationMessage('Hello World!');
});
context.subscriptions.push(disposable); // 将注册函数推入上下文订阅系统
...
```
上面是注册到命令command(extension.sayHello)的操作，这里只是显示一条"Hello World!"信息

### 调试
进入根目录，点击vscode左侧调试按钮，然后开启上方`Launch`，随后会自己新开一个窗口，然后就可以按`⇧⌘P`输入`Hello World`观察效果了

#### 尝试改变`extension.js`一下
```js
let disposable = vscode.commands.registerCommand('extension.sayHello', () => {
    // The code you place here will be executed every time your command is executed

    let editor = vscode.window.activeTextEditor; // 当前编辑区
    if (!editor) {
        return; // No open text editor
    }

    let selection = editor.selection; // 编辑区选中的部分
    let text = editor.document.getText(selection); // 获取选中部分的内容

    // Display a message box to the user
    vscode.window.showInformationMessage('Selected characters: ' + text.length); // 显示选中内容的长度
});
```
刷新一下调试，再回去选中一行，再执行命令可看到显示了选中字数提示

#### 其中的命令和方法，可参考[官方API](https://code.visualstudio.com/docs/extensionAPI/vscode-api)
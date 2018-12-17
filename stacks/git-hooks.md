## 参考资料
- [husky: Git hooks made easy](https://github.com/typicode/husky)
- [lint-staged: Run linters on git staged files](https://github.com/okonet/lint-staged)
- [用 husky 和 lint-staged 构建超溜的代码检查工作流](https://segmentfault.com/a/1190000009546913)
- [用 husky 和 prettier 保证团队代码格式一致性](https://aisensiy.github.io/2018/02/28/husky-and-prettier/)
- [commitlint: Lint commit messages](https://github.com/marionebl/commitlint)

## Example
### Step1
```zsh
yarn add husky lint-staged --dev
```
### Step2
在`package.json`中
```js
{
    ...
    ...
    "husky": {
        "hooks": {  
        "pre-commit": "lint-staged"
        }
    },
    "lint-staged": {
        "*.js": ["eslint --fix", "git add"]
    }
}
```

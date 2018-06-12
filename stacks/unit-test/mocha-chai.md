## 以react测试为例

```
--app
  |--src
    |--actions
    |--components
      |--Todo
        |--index.js
        |--Todo.js
        |--__test__
          --Todo.test.js
    |--containers
    ...
  |--test
    |--bootstrap.js
    |--mocha.opts
    ...
  |--package.json
  ...
```

#### mocha.opts

```js
--compilers jsx?:babel-register
--require test/bootstrap.js
src/**/*.test.js
```

#### package.json

```json
{
  ...
  "scripts": {
    ...
    "test": "mocha",
    "test:watch": "mocha --watch",
    "test:cov": "nyc npm run test && nyc report --reporter=lcov",
    ...
  },
  "devDependencies": {
    ...
    "babel-core": "^6.21.0",
    "babel-register": "^6.18.0",
    "chai": "^3.5.0",
    "chai-enzyme": "^0.6.1",
    "enzyme": "^2.7.0",
    "mocha": "^3.2.0",
    "nyc": "^10.1.2",
    ...
  },
  ...
}
```

#### bootstrap.js

```js
if (!global.document) {
  try {
    const jsdom = require('jsdom').jsdom; // could throw

    const exposedProperties = ['window', 'navigator', 'document'];

    global.document = jsdom('');
    global.window = document.defaultView;
    Object.keys(document.defaultView).forEach((property) => {
      if (typeof global[property] === 'undefined') {
        exposedProperties.push(property);
        global[property] = document.defaultView[property];
      }
    });

    global.navigator = {
      userAgent: 'node.js',
    };
  } catch (e) {
    // jsdom is not supported...
  }
}
```



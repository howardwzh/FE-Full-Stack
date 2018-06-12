```js
let path = require('path')

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/**/*.test.js'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'src/**/*.test.js': ['webpack', 'sourcemap']
    },

    webpack: { //kind of a copy of your webpack config
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: path.resolve(__dirname, 'node_modules')
        }, {
          test: /\.json$/,
          loader: 'json'
        }]
      },
      externals: {
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-chai'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  })
}
```
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
      'src/**/*.test.js': ['webpack']
    },

    webpack: { //kind of a copy of your webpack config
      devtool: 'eval',
      module: {
        preLoaders: [
          // transpile and instrument only testing sources with isparta
          {
            test: /\.jsx?$/,
            // exclude this dirs from coverage
            exclude: [path.resolve(__dirname, 'node_modules'), /\.test.js$/],
            loader: 'isparta-instrumenter'
          }
        ],
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
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-chai'
    ],
    reporters: ['mocha', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: true,
    coverageReporter: {
      reporters: [{
        type: 'text-summary'
      }, {
        type: 'html',
        dir: 'coverage/'
      }]
    }
  })
}
```
var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  dist: './dist',
  template: {'popup.html': './index.tpl'},

  devServer: {
    port: 3000,
    publicPath: '/',
    proxy: {
      '/': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/': '/popup.html'
        }
      },
      '/**/*.json': {
        target: 'http://api.asfun.cn',
        host: 'api.asfun.cn',
        secure: true
      }
    }
  },

  // production
  clean: true,
  hash: false,
  sourceMap: false,
  minimize: true,
  chunk: false, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: 'popup.css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'lint', 'saladcss']
});

cooking.add('loader.es6', {
  test: /node_modules\/.*airloy.*\.js$/,
  loaders: ['babel-loader']
});

module.exports = cooking.resolve();
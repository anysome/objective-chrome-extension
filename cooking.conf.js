var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  dist: './dist',
  template: './index.html',

  devServer: {
    port: 8080,
    publicPath: '/',
    proxy: {
      '/**/*.json': {
        target: 'http://api.asfun.cn',
        host: 'api.asfun.cn',
        secure: false
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
  assetsPath: 'assets',
  urlLoaderLimit: 10000,
  extractCSS: 'popup.css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['lint', 'saladcss'],
  format: 'umd'
});

module.exports = cooking.resolve();

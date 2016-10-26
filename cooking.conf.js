var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  dist: './dist',
  template: './index.tpl',

  devServer: {
    port: 3000,
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
  hash: true,
  sourceMap: false,
  minimize: true,
  chunk: true, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].[contenthash:7].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  extends: ['vue2', 'lint', 'saladcss']
});

module.exports = cooking.resolve();

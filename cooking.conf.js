var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  dist: './crx/page',
  template: {'popup.html': './index.tpl'},

  devServer: {
    port: 3000,
    publicPath: '/',
    historyApiFallback: {
      index: '/popup.html'
    },
    proxy: {
      '/**/*.json': {
        target: 'http://api.asfun.cn',
        host: 'api.asfun.cn',
        secure: true,
        changeOrigin: true
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
  publicPath: '/page/',
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

const path = require('path');
const webpack = require('webpack');
// 合并不同的webpack配置项
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.config.base');


// 不写在base的原因是： 客户端渲染需要defaultPlugins而服务端渲染不需要
const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  }),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
];

const devServer = {
  port: '8888',
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  // 因为我们这里用的是template并不是.vue文件所有不会热重载，只会刷新页面
  hot: true
};

let config;
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer,
  // vue有不同的版本来支持不同的环境,默认使用的是runtime版本的，runtime是不支持template编译
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
});

module.exports = config;

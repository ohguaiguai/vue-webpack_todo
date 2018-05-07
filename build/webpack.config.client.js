const path = require('path');
const webpack = require('webpack');
// 合并不同的webpack配置项
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');
const VueClientPlugin = require('vue-server-renderer/client-plugin');

const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

// 不写在base的原因是： 客户端渲染需要defaultPlugins而服务端渲染不需要
const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin(),
    new VueClientPlugin()
];

const devServer = {
    port: '8888',
    host: '0.0.0.0',
    overlay: {
        errors: true,
    },
    // 当路由使用的是history模式时
    historyApiFallback: {
        // 这里的写法是和webpack.config.base.js中的output的publicPath属性相关的
      index: '/public/index.html'
    },
    hot: true
};

let config;

if (isDev) {
    // 开发坏境的配置
    config = merge(baseConfig, {
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
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
    });

} else {
    // 生产坏境的配置
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/client-entry.js'),
            vendor: ['vue']
        },
        output: {
            filename: '[name].[chunkhash:8].js',
            publicPath: '/public/' //去掉前面的端口、域名
        },
        module: {
            rules: [
                {
                    test: /\.styl/,
                    use: ExtractPlugin.extract({
                        fallback: 'style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPlugins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })
}

module.exports = config;

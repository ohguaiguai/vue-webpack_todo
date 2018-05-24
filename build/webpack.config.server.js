const path = require('path')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin');
// 合并不同的webpack配置项
const merge = require('webpack-merge')
// 生成一个json文件, 最重要的插件
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const baseConfig = require('./webpack.config.base')

let config
config = merge(baseConfig, {
    target: 'node',// 打包出来的程序是在node环境运行
    entry: path.join(__dirname, '../client/server-entry.js'),
    output: {
        libraryTarget: 'commonjs2',// 指定写的代码的入口 通过modules.exports导出
        filename: 'server-entry.js', // 不需要使用浏览器端的缓存所以不需要hash
        path: path.join(__dirname, '../server-build')
    },
    externals: Object.keys(require('../package.json').dependencies),// 服务端因为是在node环境下，直接require就可以了;服务端是需要把用到的依赖打包到js中
    devtool: 'source-map',
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
                // use: [
                //     'style-loader', // 会有dom操作的代码，但是在服务端node环境下是没有dom的
                //     'css-loader',
                //     {
                //         loader: 'postcss-loader',
                //         options: {
                //             sourceMap: true
                //         }
                //     },
                //     'stylus-loader'
                // ]
            }
        ]
    },
    plugins: [
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"server"'
        }),
        new VueServerPlugin()
    ]
})

module.exports = config

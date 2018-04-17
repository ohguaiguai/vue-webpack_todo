const path = require('path');
const webpack = require('webpack');
// 合并不同的webpack配置项
const merge = require('webpack-merge');
const HTMLPlugin = require('html-webpack-plugin');
const ExtractPlugin = require('extract-text-webpack-plugin');

const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

// 不写在base的原因是： 客户端渲染需要defaultPlugins而服务端渲染不需要
const defaultPlugins = [
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: isDev ? '"development"' : '"production"'
		}
	}),
	new HTMLPlugin()
];

const devServer = {
	port: '8888',
	host: '0.0.0.0',
	overlay: {
		errors: true,
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
			// new webpack.NoEmitOnErrorsPlugin()
		])
	});

} else {
	// 生产坏境的配置
	config = merge(baseConfig, {
		entry: {
			app: path.join(__dirname, '../client/index.js')
		},
		output: {
			filename: '[name].[chunkhash:8].js'
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
		optimization: {
			splitChunks: {
				chunks: 'all'
			},
			runtimeChunk: true
		},
		plugins: defaultPlugins.concat([
			// new ExtractPlugin('styles.[contentHash:8].css') 这种写法最新版本的extract-text-webpack-plugin
			// 不再支持
			new ExtractPlugin('styles.[md5:contentHash:hex:8].css')
		])
	})
}

module.exports = config;

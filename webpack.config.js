/* eslint-disable @typescript-eslint/no-var-requires */
/* global require */
/* global module */
/* global JSON */

const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const appVersion = require('./package.json').version;

const config = {
    entry: {
        app: './src/index.js',
    },

    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'hashed',
        minimizer: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {preset: ['default', {discardComments: {removeAll: true}}]},
            }),
            new TerserPlugin(),
        ],
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
        new webpack.ProvidePlugin({
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            chunks: ['app', 'vendor', 'runtime'],
            minify: false,
        }),
        new webpack.DefinePlugin({
            'process.env.APP_VERSION': JSON.stringify(appVersion)
        }),
        new webpack.ExtendedAPIPlugin(),
        new ManifestPlugin({
            fileName: 'manifest.json',
            seed: {
                name: 'menu-app manifest'
            }
        })
    ],

    resolve: {
        extensions: ['.js'],
    },

    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },

    module: {},

    devServer: {
        host: '0.0.0.0',
        port: 8080,
        contentBase: false,
        historyApiFallback: {
            index: '/index.html'
        }
    }
};

module.exports = (env, argv) => {

    const {mode} = argv;
    const debug = 'development' === mode;

    if (debug) {
        config.devtool = 'source-map';
    }

    config.module.rules = require('./webpack/rules').getRules(mode);

    return config;
};

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
const WorkboxPlugin = require('workbox-webpack-plugin');
const appVersion = require('./package.json').version;
const manifest = require('./manifest.json');

const config = {
    entry: {
        app: './src/index.ts',
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
        new WorkboxPlugin.InjectManifest({
            swDest: 'service-worker.js',
            swSrc: 'src/service-worker.js',
        }),
        new ManifestPlugin({
            fileName: 'manifest.json',
            seed: manifest
        })
    ],

    resolve: {
        extensions: ['.js', '.ts'],
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

    config.module.rules = require('./webpack.rules').getRules(mode);

    return config;
};

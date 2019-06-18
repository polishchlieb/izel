const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
    mode: 'development',
    entry: [
        './src/dashboard/public/app.js'
    ],
    performance: {
        hints: false
    },
    output: {
        path: resolve(__dirname, 'dist', 'dashboard', 'public'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use : [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{
            from: './src/dashboard/public/index.html',
            to: '.'
        }]),
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        })
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: 3000,
        proxy: {
            '/api/*': {
                target: 'http://[::1]:8090/',
                secure: false
            }
        }
    }
};
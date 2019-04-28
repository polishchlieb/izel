const { VueLoaderPlugin } = require("vue-loader");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const webpack = require('webpack')

const { resolve } = require("path");

module.exports = {
    mode: 'production',
    entry: [
        './src/dashboard/public/app.js'
    ],
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

        /*
        new HtmlWebpackPlugin({
            title: 'izel',
            template: './webpack-template.html',
            inject: 'body',
            alwaysWriteToDisk: true
        }),
        */
    ],
}
/**
 * @file $INfO$
 * @author zhangchaowei
 * @copyright QiYu Times Technology Ltd.
 * 2017/6/12
 * $END$
 */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'electron-main',
    entry: './app/index.js',

    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?sourceMap'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.css', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: path.resolve(__dirname, 'build', 'index.html'),
            chunksSortMode: 'dependency',
            inject: 'body'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: '#eval-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        historyApiFallback: true,
        compress: true,
        port: 8001,
        proxy: {
            '/api/*': {
                target: 'https://www.weibangong.com',
                secure: true,
                changeOrigin: true,
                xfwd: true,
                pathRewrite: {'^/api' : ''}
            }
        },
    }
};

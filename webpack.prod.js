const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

    mode: "production",

    entry: './src/scripts/app.js',

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[contenthash].bundle.js',
        publicPath: ''
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(scss|sass)$/,
                include: [path.resolve(__dirname, 'src')],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: './assets/images'
                }
            },
            {
                test: /.svg$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]',
                    outputPath: './assets/svg'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'app.[contenthash].css',
        }),
        new CleanWebpackPlugin()
    ]
};
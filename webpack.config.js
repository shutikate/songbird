const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      favicon: path.resolve(__dirname, './assets/img/favicon.ico'),
    }),
    new MiniCssExtractPlugin({
        filename: 'style.css'
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // new CopyPlugin({
    //     patterns: [
    //       { from: path.resolve(__dirname, 'assets'), to: path.resolve(__dirname, 'dist/assets') }
    //     ],
    //   }),
  ],
  module: {
    rules: [
        {
          test: /\.(с|sa|sc)ss$/i,
          use:[MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
            test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'fonts/[name].[ext]'
            }
        },
        {
            test: /\.(mp3|wav)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'assets/[name][ext]'
            }
        },
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};
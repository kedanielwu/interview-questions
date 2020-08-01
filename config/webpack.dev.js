const path = require('path')
const baseConfig = require('./webpack.base.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
        ]
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          "less-loader"
        ]
      },
      {
        test: /\.sass/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')
              ]
            }
          },
          "sass-loader"
        ]
      },
    ]
  },
  devServer: {
    port: 3000,
    hot: true,
    host: 'localhost',
    publicPath: '/',
    inline: true,
    overlay: {
      warnings: false,
      errors: true
    },
    open: true,
    compress: true,
    contentBase: path.resolve(__dirname, '../src'),
    clientLogLevel: 'warning',
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: './src/assets/',
      to: 'assets'
    }]),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'React App',
      template: path.resolve(__dirname, '../src/dev.ejs'),
      inject: false
    })
  ]
})

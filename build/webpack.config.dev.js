const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.js')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const config = webpackMerge.smart(baseConfig, {
    mode: 'development',
    devServer: {
      open: true,
      contentBase: path.resolve(__dirname, 'dist'),
      compress: false,
      port: 9000,
      hot: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].css',//devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: '[id].css'// devMode ? '[id].css' : '[id].[hash].css',
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module:{
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',//devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ],
        },
      ]
    }
})
module.exports = config

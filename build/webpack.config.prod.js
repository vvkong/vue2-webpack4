const baseConfig = require('./webpack.config.js')
const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const config = webpackMerge.smart(baseConfig, {
    mode: 'production',
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[hash].css',
        chunkFilename: '[id].[hash].css',
      })
    ],
    module:{
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,//devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader'
          ],
        },
      ]
    }
})
console.log(JSON.stringify(config))
module.exports = config

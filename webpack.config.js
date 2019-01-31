const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Vue2 && Webpack4',
            // template: './src/index.html'
        }),
        new CleanWebpackPlugin([
            'dist'
          ], {
            // Absolute path to your webpack root folder (paths appended to this)
            // Default: root of your package
            root:  __dirname,
            exclude:  [],
            // Write logs to console.
            verbose: true,
            // Use boolean "true" to test/emulate delete. (will not remove files).
            // Default: false - remove files
            dry: false,
            // If true, remove files on recompile.
            // Default: false
            watch: false,
          }),
          new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',//devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: '[id].css'// devMode ? '[id].css' : '[id].[hash].css',
          })
    ],
    // 新增vue-loader配置
    module:{
        rules: [
          {
            enforce: "pre",
            test: /\.(vue|js)$/,
            exclude: /node_modules/,
            loader: "eslint-loader"
          },
          {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                // 配置也可独立到.babelrc文件中
                options: {
                  presets: ['@babel/preset-env']
                }
              }
          },
          {
              test: /\.vue$/,
              loader: 'vue-loader'
          },
          {
              test: /\.css$/,
              use: [
                MiniCssExtractPlugin.loader,//devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
              ],
          },
          // {
          //     test: /\.css$/,
          //     exclude: /node_modules/,
          //     // 温馨提示：webpack调用顺序是从右到左
          //     use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
          // },
          {
              test: /\.(png|jpe?g|gif)$/i,
              use: [
                  {
                      loader: 'url-loader',
                      options: {
                          // 自定义输出命名规则
                          name: 'resources/[name].[hash:8].[ext]',
                          // 图片转为base64的最大阈值
                          limit: 8192,
                          // 当大于limit时采用file-loader加载器处理，默认即是file-loader
                          fallback: 'file-loader'
                      }
                  }
              ]
          }
        ]
    },

    // webpack will automatically split chunks based on these conditions:
    // New chunk can be shared OR modules are from the node_modules folder
    // New chunk would be bigger than 30kb (before min+gz)
    // Maximum number of parallel requests when loading chunks on demand would be lower or equal to 5
    // Maximum number of parallel requests at initial page load would be lower or equal to 3
    // When trying to fulfill the last two conditions, bigger chunks are preferred.
    // 默认配置
    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 0,
          minChunks: 1,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: true,
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true
            }
          }
        }
    }
}

module.exports = config

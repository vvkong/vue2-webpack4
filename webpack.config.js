const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')  
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
 
const config = {
    mode: 'development',
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
          })
    ],
    // 新增vue-loader配置
    module:{
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                // 温馨提示：webpack调用顺序是从右到左
                use: ['vue-style-loader', 'css-loader', 'postcss-loader'],
            },
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
    }
}

module.exports = config
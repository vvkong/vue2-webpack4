### 零、前言
本文从零开始vu2+webpack4脚手架搭建，各种步骤配置都可从最后的“参考”中获得，采用yarn作为包管理工具，mac电脑，vs code作为ide开发工具。温馨提示：所有命令执行都是在项目目录（vue-demo)中执行。根据本教程走一遍（记得看参考中对应的连接），webpack4的常用插件、加载器基本熟悉，可应付大部分开发。
### 一、创建项目
    `mkdir vue-demo && cd vue-demo && yarn init`

### 二、添加配置webpack依赖
1. `yarn add webpack webpack-cli -D `
2. 配置webpack编译脚本 vi package.json 新增如下内容：

    ```
    "scripts": {
        "build": "webpack --config webpack.config.js"
      },
    ```
    3. 创建webpack配置文件 `touch webpack.config.js && vi webpack.config.js`

    ```
    // 配置入口文件与输出打包文件及路径
    const path = require('path')

    module.exports = {
      entry: './src/index.js',
      output: {
        path: path.join(__dirname, dist),
        filename: 'index.js'
      }
    }
    ```
4. 创建入口文件 ./src/index.js: `mkdir src && touch ./src/index.js`

    ```
    console.log('Hello vue2&webpack4.')
    ```
5. 测试配置 `yarn build && node ./dist/bundle.js` 验证dist/bundle.js是否存在，控制台输出"Hello vue2&webpack4."字符串即表示成功

### 三、html-webpack-plugin自动创建html并装配打包的bundle.js
1. 添加html-webpack-plugin
    `yarn add html-webpack-plugin -D`
2. 修改webpack.config.js配置

    ```
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    module.exports = {
        mode: "development",
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        plugins:[
            new HtmlWebpackPlugin({
                title: 'Vue2 && Webpack4'
            })
        ]
    }
    ```
3. `yarn build` 编译验证，采用浏览器打开dist/index.html,cmd+option+i查看控制台输出"Hello vue2&webpack4."字符串

### 四、添加vue相关依赖
1. `yarn add vue`
2. `yarn add vue-loader vue-template-compiler css-loader -D`
3. `yarn add url-loader file-loader -D`
4. 修改webpack.config.js配置

    ```
    const path = require('path')
    const { VueLoaderPlugin } = require('vue-loader')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

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
                title: 'Vue2 && Webpack4'
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
                    use: ['vue-style-loader', 'css-loader'],
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
    ```
5. 创建源码存放目录`mkdir src/components && mkdir src/api && mkdir src/store && mkdir -p src/assets/images`，拷贝2张图片到src/assets/images目录下，分别命名如下：bg.jpg logo.png，最好有一张大于8092kb(见上配置)
6. 创建src/components/app.vue

    ```
    <template>
    <div>
        <h2>{{title}}</h2>
        <img src="../assets/images/logo.png" width="50px" height="50px"/>
        <div class="bg">
            我在背景图上
        </div>
    </div>
    </template>
    <script>
    export default {
        data() {
            return {
                title: 'Hello vue2&&webpack4....3'
            }
        }
    }
    </script>
    <style scoped>
        .bg {
            width: 500px;
            height: 500px;
            background-image: url('../assets/images/bg.jpg');
        }
    </style>
    ```
7. 编译`yarn build`
8. 浏览器打开dist/index.html可以到展示Hello vue2&&webpack4. logo图以及背景图

### 五、postcss加载器安装配置
    `yarn add -D postcss-loader autoprefixer`

1. 修改webpack.config.js配置
    ```
    {
        test: /\.css$/,
        exclude: /node_modules/,
        // 温馨提示：webpack调用顺序是从右到左
        use: ['vue-style-loader', 'css-loader', 'postcss-loader']
    },
    ```
2. 创建postcss的配置文件postcss.config.js，启用autoprefixer插件
    ```
    module.exports = {
    plugins: [
      // require('precss'),
      require('autoprefixer')
    ]
  }
  ```

3. 修改src/components/app.vue

```
<template>
        <div>
            <h2>{{title}}</h2>
            <!-- 新增 -->
            <div class="test-prefix">
                <p>我就测试一下，看看而已</p>
            </div>
            <img src="../assets/images/logo.png" width="50px" height="50px"/>
            <div class="bg">
                我在背景图上
            </div>
        </div>
    </template>
    <script>
    export default {
        data() {
            return {
                title: 'Hello vue2&&webpack4....3'
            }
        }
    }
    </script>
    <style scoped>
        .bg {
            width: 500px;
            height: 200px;
            background-image: url('../assets/images/bg.jpg');
        }
        /*   新增  */
        .test-prefix{
            display: flex;
            user-select: none;
        }
    </style>
```

4. yarn build，打开dist/bundle.js，搜索test-prefix字符串，找到类定义，可验证user-select自动添加了浏览器前缀
    ```
    test-prefix[data-v-6c0a0fc1]{\\n    display: flex;\\n
    -webkit-user-select: none;\\n       -moz-user-select: none;\\n
    -ms-user-select: none;\\n            user-select: none;\\n}\\n\", \"\"]
    ```
### 六、安装配置mini-css-extract-plugin
1. `yarn add mini-css-extract-plugin --save-dev`
2. 修改webpack配置
```
// 新增
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// 修改
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

// 新增
new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: '[name].css',//devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: '[id].css'// devMode ? '[id].css' : '[id].[hash].css',
  })
```
3. 验证，`yarn build`,查看dist目录下生成的main.css文件,内容如下：
    ```
    .bg[data-v-6c0a0fc1] {
        width: 500px;
        height: 200px;
        background-image: url(resources/bg.dedfb384.jpg);
    }
    /*   新增  */
    .test-prefix[data-v-6c0a0fc1]{
        display: flex;
        -webkit-user-select: none;
           -moz-user-select: none;
            -ms-user-select: none;
                user-select: none;
        color: red;
    }
    ```
    dist/bundle.js搜索test-prefix，只能看到引用而没有此类定义，即被提取到main.css文件

### 七、安装配置babel-loader
1. `yarn add babel-loader @babel/core @babel/preset-env webpack -D`
2. `yarn add @babel/polyfill`
3. 修改webpack配置

    ```
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
    ```
3. 修改src/components/app.vue

```
<template>
    <div>
        <h2>{{title}}</h2>
        <!-- 新增 -->
        <div class="test-prefix">
            <p>我就测试一下，看看而已，我是红色哦</p>
        </div>
        <img src="../assets/images/logo.png" width="50px" height="50px"/>
        <div class="bg">
            我在背景图上
            <div v-for="(item, index) in list" :key="index">
                {{item}}
            </div>
        </div>
        <button @click="onClickButton">测试ES6 ES7语法</button>
    </div>
</template>
<script>
require('@babel/polyfill')
class Echo {
    constructor(msg){
        this.msg = msg
    }
    print() {
        console.log(this.msg)
    }
    getMsg() {
        return this.msg
    }
}
export default {
    data() {
        return {
            title: 'Hello vue2&&webpack4....3',
            list: ['test1', 'test2', 'test3']
        }
    },
    methods: {
        onClickButton(e) {
            let echo = new Echo('我是ES6语法class构建的对象哦')
            echo.print();
            alert(echo.getMsg())
            let sum = 2 ** 10
            alert(`ES7 求幂运算符（2 ** 10）= ${sum}`)
        },
        // async特性，切记添加require('@babel/polyfill')在前面
        async getA() {
            return new Promise((resolve, rejuect) => {
                console.log('====== getA')
                setTimeout(()=>resolve(`It's timeout.`), 3000)
            })
        }
    }
}
</script>
<style scoped>
    .bg {
        width: 500px;
        height: 200px;
        background-image: url('../assets/images/bg.jpg');
    }
    /*   新增  */
    .test-prefix{
        display: flex;
        user-select: none;
        color: red;
    }
</style>
```
4. 验证，`yarn build`，打开dist/bundle.js文件，搜索onClickButton,可看到函数体里面的求幂运算**被转为了Math.pow函数，如：

```
onClickButton:function(t){var e=new s("我是ES6语法class构建的对象哦");e.print(),alert(e.getMsg());var n=Math.pow(2,10);alert("求幂运算符（2 ** 10）= ".concat(n))}
```
### 八、eslint安装配置
1. `yarn add -D eslint eslint-plugin-vue`
2. `yarn add -D eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node`
3. 创建.eslintrc.js文件

```
module.exports = {
    extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      // 'plugin:vue/recommended',
      "plugin:vue/essential"
    ],
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
      'no-console': 'off',
    },
    "plugins": [
    ]
  }

```
3. 修改src/components/App.vue

```
<template>
  <div>
    <h2>{{ title }}</h2>
    <div class="test-prefix">
      <p>我就测试一下，看看而已，我是红色哦</p>
    </div>
    <img
      src="../assets/images/logo.png"
      width="50px"
      height="50px"
    />
    <div class="bg">
      我在背景图上
    </div>
    <button v-bind:click="onClickButton">
      测试ES6语法
    </button>
    <!-- idx没使用，给eslint-plugin-vue检测 -->
    <div v-for="(item, idx) in list" :key="item.id">
      <p>{{item}}{{}}</p>
    </div>
  </div>
</template>
<script>
class Echo {
  constructor (msg) {
    this.msg = msg
  }
  print () {
    console.log(this.msg)
  }
  getMsg () {
    return this.msg
  }
}
export default {
  data () {
    return {
      title: 'Hello vue2&&webpack4....3',
      list: ['test1', 'test2', 'test3']
    }
  },
  methods: {
    onClickButton (e) {
      // js标准风格字符串必须适应'号，故意为之
      let echo = new Echo("我是ES6语法class构建的对象哦")
      echo.print()
      alert(echo.getMsg())
      let sum = 2 ** 10
      alert(`求幂运算符（2 ** 10）= ${sum}`)
    }
  }
}
</script>
<style scoped>
    .bg {
        width: 500px;
        height: 200px;
        background-image: url('../assets/images/bg.jpg');
    }
    /*   新增  */
    .test-prefix{
        display: flex;
        user-select: none;
        color: red;
    }
</style>

```
4. 在package.json的scripts中添加命令:`"lint": "eslint src/**/*.{js,vue}",`
5. 验证，`yarn lint`，可以看到输出2处错误都是src/components/App.vue中引起的，根据报错原因修改后，再运行正常即可。温馨提示：可安装ide插件自动提示修复eslint错误。

### 九、安装配置clean-webpack-plugin
1. `yarn add clean-webpack-plugin --save-dev`
2. 修改webpack.config.js配置

    ```
    // 引入插件
    const CleanWebpackPlugin = require('clean-webpack-plugin')

    // 修改
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'Vue2 && Webpack4',
            // template: './src/index.html'
        }),
        // 新增
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
    ```
3. 验证，`yarn build`,可先看到删除dist目录然后再生成dist目录内容

### 十、build前eslint检测
1. `yarn add eslint-loader`
2. 修改webpack配置

    ```
    {
        enforce: "pre",
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      }
    ```
3. 不修复步骤十执行`yarn lint`出错的代码，执行`yarn build`会出现同样的错误build前进行了eslint检测，根据错误原因修复后再执行即可正常打包。

### 十一、开发生产环境配置
1. `mkdir build && mv webpack.config.js build/webpack.config.js && touch build/webpack.config.dev.js && touch build/webpack.config.prod.js`
2. `yarn add -D webpack-merge`
3. 抽离公共逻辑在webpack.config.js,开发特性配置放在build/webpack.config.dev.js，生产特性配置放在build/webpack.config.dev.js
4. 修改三文件内容如下：

    ```
    // build/webpack.config.js
    const path = require('path')
    const { VueLoaderPlugin } = require('vue-loader')
    const HtmlWebpackPlugin = require('html-webpack-plugin')
    const CleanWebpackPlugin = require('clean-webpack-plugin')

    const config = {
      entry: path.resolve(__dirname, '../src/index.js'), // 为消除异议，明确指定
      //entry: './src/index.js',// 相对路径这里不是基于本文件的位置，而是工程目录，所以不是../src/index.js
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
              path.resolve(__dirname, 'dist')
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
    ```

    ```
    // build/webpack.config.dev.js
    const baseConfig = require('./webpack.config.js')
    const webpackMerge = require('webpack-merge')
    const MiniCssExtractPlugin = require("mini-css-extract-plugin")

    const config = webpackMerge.smart(baseConfig, {
        mode: 'development',
        plugins: [
          new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',//devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: '[id].css'// devMode ? '[id].css' : '[id].[hash].css',
          })
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
    ```

```
// build/webpack.config.js
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
module.exports = config
```

```
// 修改package.json
"scripts": {
    "lint": "eslint src/**/*.{js,vue}",
    "build": "yarn build:prod",
    "build:prod": "webpack --config ./build/webpack.config.prod.js",
    "build:dev": "webpack --config ./build/webpack.config.dev.js"
  },
```
3. 验证，`yarn build:prod`打包生产环境，`yarn build:dev`打包开发环境，可对比两次打包build/dist下生成的内容
4. 开发环境配置服务，以及热更新

    * `yarn add -D webpack-dev-server`

    * 修改build/webpack.config.dev.js

        ```
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
        ```
    * 修改package.json

        ```
        "scripts": {
            "lint": "eslint src/**/*.{js,vue}",
            "build": "yarn build:prod",
            "build:prod": "webpack --config ./build/webpack.config.prod.js",
            "build:dev": "webpack --config ./build/webpack.config.dev.js",
            "start": "webpack-dev-server --progress --config ./build/webpack.config.dev.js"
          },
        ```
    * 验证：`yarn start`, 成功后自动利用默认浏览器打开build/dist/index.html，修改src/components/App.vue的样式或内容，保存即会自动打包同步到打开页面。
### 十二、总结
    本文主要根据各个需求点的官网指导例子进行编写，基本无错进行到底。所以文档还是一手的好。本文demo已上传到git。欢迎交流start。
### 十三、参考
1. [yarn](https://yarnpkg.com/zh-Hans/docs/usage)
2. [webpack](https://webpack.js.org/concepts/)
3. [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin)
4. [vue](https://cn.vuejs.org/v2/guide/installation.html)
5. [vue-loader](https://vue-loader.vuejs.org/)
6. [css-loader](https://www.npmjs.com/package/css-loader)
7. [postcss](https://www.npmjs.com/package/postcss)
8. [autoprefixer](https://github.com/postcss/autoprefixer)
9. [url-loader](https://www.npmjs.com/package/url-loader)
10. [file-loader](https://www.npmjs.com/package/file-loader)
11. [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin)
12. [webpack optimization](https://webpack.js.org/configuration/optimization/)
13. [split-chunks-plugin](https://webpack.js.org/plugins/split-chunks-plugin/)
14. [babel-loader](https://github.com/babel/babel-loader)
15. [vue eslint](https://eslint.vuejs.org/user-guide/#installation)
16. [eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)
17. [JavaScript Standard Style ](https://standardjs.com/readme-zhcn.html)
18. [eslint-loader](https://github.com/webpack-contrib/eslint-loader)
19. [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)
20. [webpack-merge](https://www.npmjs.com/package/webpack-merge)
21. [webpack-dev-server](https://github.com/webpack/webpack-dev-server#getting-started)
22. [devserver配置](https://webpack.js.org/configuration/dev-server/#devserver)

const { merge } = require('webpack-merge')
const path = require("path");
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const { PROJECT_PATH, SERVER_HOST, SERVER_PORT } = require("./constant")
// const {isDevelopment,isProduction} = require("./env")
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  output: {
    // 打包文件根目录
    filename: 'js/[name].js',
    path: path.resolve(PROJECT_PATH, "./dist"),
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(jsx|js)?$/,
  //       use: ["babel-loader"],
  //       include: path.resolve(__dirname, "src"),
  //       exclude: /node_modules/,
  //     },
  //   ],
  // },
  devServer: {
    host: SERVER_HOST, // 服务ip
    port: SERVER_PORT, // 服务端口
    // stats: 'errors-only', // 设为errors-only表示终端只打印错误类型的日志，不会打印warning以及其他信息影响阅读
    clientLogLevel: 'none', // 设为none表示去除多余网页console信息
    hot: true, // 设为true表示启用服务热替换配置
    open: true, // 设为true表示第一次启动项目时自动打开默认浏览器
    // historyApiFallback: true,
    compress: true,
    noInfo: true, // 设为true表示去除启动项目时显示的打包信息
  },
  target: 'web',
  plugins: [
    // 实际上只开启 hot：true 就会自动识别有无声明该插件，没有则自动引入，但是怕有隐藏问题这里还是手动加上了
    new webpack.HotModuleReplacementPlugin(),
    new WebpackBar({
      name: 'dev Link Startou!!!', 
      color: '#199a1e' 
    }),
  ]
})

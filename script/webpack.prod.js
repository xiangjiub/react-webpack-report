const { merge } = require('webpack-merge')
const path = require('path')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const common = require('./webpack.common')
const { PROJECT_PATH } = require('./constant')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(PROJECT_PATH, './dist')
  },
  // optimization：在 webpack4 之后添加了 optimization 属性，专门用于存放优化打包的配置，minimizer属性存放一个数组，
  // 里可以存放用于代码压缩的插件，minimize 置 true 表示启用 minimizer 配置
  optimization: {
    minimize: true,
    minimizer:[
      new CssMinimizerPlugin()
    ]
  },
  target: 'browserslist',
  plugins: [
    new WebpackBar({
      name: 'build Link Startou!!!', 
      color: '#f40' 
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    })
  ]
})
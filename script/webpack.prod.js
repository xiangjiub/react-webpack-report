const { merge } = require('webpack-merge')
const path = require('path')
const WebpackBar = require('webpackbar')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const common = require('./webpack.common')
const { PROJECT_PATH } = require('./constant')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(PROJECT_PATH, './dist'),
    assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
  },
  // optimization：在 webpack4 之后添加了 optimization 属性，专门用于存放优化打包的配置，minimizer属性存放一个数组，
  // 里可以存放用于代码压缩的插件，minimize 置 true 表示启用 minimizer 配置
  optimization: {
    minimize: true,
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: { pure_funcs: ['console.log'] },
        }
      })
      // extractComments：设为 false 表示去除所有注释，除了有特殊标志的注释如 @preserve 标记
      // pure_funcs：去除函数，如上述配置的意思是将所有 console.log 函数去除
    ]
  },
  target: 'browserslist',
  plugins: [
    new WebpackBar({
      name: 'build Link Startou!!!', 
      color: '#199a1e' 
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].chunk.css',
    })
  ]
})
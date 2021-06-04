const { merge } = require('webpack-merge')
const path = require('path')
const WebpackBar = require('webpackbar')

const common = require('./webpack.common')
const { PROJECT_PATH } = require('./constant')

module.exports = merge(common, {
  mode: 'production',
  devtool: false,
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(PROJECT_PATH, './dist')
  },
  plugins: [
    new WebpackBar({
      name: 'build Link Startou!!!', 
      color: '#f40' 
    }),
  ]
})
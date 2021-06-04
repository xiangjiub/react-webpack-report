const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { PROJECT_PATH } = require('./constant')

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.js')
  },
  plugins: [
  	new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
    }),
    // new CleanWebpackPlugin(),
  ]
}
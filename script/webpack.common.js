const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const {isDevelopment,isProduction} = require('./env')
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { PROJECT_PATH } = require('./constant')

const getCssLoaders = () => [
  isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader, 
  {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: "[local]--[hash:base64:5]"
      },
      sourceMap: isDevelopment,
    }
  }
]

module.exports = {
  entry: {
    app: path.resolve(PROJECT_PATH, './src/index.js')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[...getCssLoaders()]
        // css-loader的options配置:
        // modules：开启 css module，看个人习惯，如果不使用可以直接置值 false，否则影响打包速度，localIdentName 表示自定义类名，为了确保类名全局统一加上哈希值
        // sourceMap：为 true 时会根据 devtool 映射css错误，生产环境不需要映射所有这里给的值是开发环境
      },
      {
        test:/\.less$/,
        use:[
          ...getCssLoaders(),
          {
            loader: 'less-loader',
            options: {
              sourceMap: isDevelopment,
            }
          }
        ]
      }
    ]
  },
  plugins: [
  	new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
    }),
    new CleanWebpackPlugin(),
  ]
}
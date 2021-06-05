const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const {isDevelopment,isProduction} = require('./env')

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
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
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
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024,
          },
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2?)$/,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(PROJECT_PATH, './src'),
      // 'components': path.resolve(PROJECT_PATH, './src/components'),
      // 'utils': path.resolve(PROJECT_PATH, './src/utils'),
    },
    extensions: ['.tsx', '.ts', '.js', '.json','.jsx']
  },
  plugins: [
  	new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, './public/index.html'),
    }),
    new CopyPlugin({
      patterns: [
        {
          context: 'public', 
          from: '*',
          to: path.resolve(PROJECT_PATH, './dist/public'), 
          toType: 'dir',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html'],		// **表示任意目录下
          },
        },
      ],
    }),
    // content：解释 fron 路径，具体作用未知
    // from：定义要拷贝的源文件
    // to：定义粘贴的指定路径
    // toType：确定粘贴路径的类型，dir表示路径为一个文件夹
    // globOptions：允许使用全局匹配
  ],
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename],
    },
  },
  optimization: {
    minimize: false,
    minimizer: [],
    splitChunks: {
      chunks: 'all',
      minSize: 0,
    },
  },
  // splitChunks：代码分割相关配置
  // splitChunks.chunks：选择哪些内容进行优化，如果为 all 时表示即使同步和异步的代码也可以共享thunk
  // minSize：生成chunk的最小大小（以字节为单位）
}
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  return {
    mode: "development",
    entry: "./src/index.js",
    output: {
      // 打包文件根目录
      path: path.resolve(__dirname, "dist/"),
    },
    plugins: [
      // 生成 index.html
      new HtmlWebpackPlugin({
        // filename: "index.html",
        template: "./public/index.html",
      }),
      new CleanWebpackPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          use: ["babel-loader"],
          include: path.resolve(__dirname, "src"),
          exclude: /node_modules/,
        },
      ],
    },
    devServer: {
      port: 8080,
      //   host: "0.0.0.0",
      contentBase: path.resolve(__dirname, "dist"),
      hot: true,
      historyApiFallback: true,
      compress: true,
    },
  };
};

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: isDev ? 'js/[name].js' : 'js/[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: isDev ? 'js/[id].js' : 'js/[id].[hash:8].js',
  },
  devServer: {
    compress: false,
    client: {
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.ejs'),
      filename: "index.html",
      inject: 'body',
      minify: {// 压缩HTML文件
        removeComments: true,//去除注释
        collapseWhitespace: true,//去除空格
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,//不需要去转译"node\_modules"这里面的文件。
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',// 最后计算完的css，将会使用style-loader生成一个内容为最终解析完的css代码的style标签，放到head标签里
          'css-loader' // css-loader加载器去解析这个文件，遇到“@import”等语句就将相应样式文件引入
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ],
  },
}

const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html'
});
const cleanWebpackPlugin = new CleanWebpackPlugin(['dist']);
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: 'inline-source-map',
  // devtool: 'eval',
  devServer: {
    // contentBase: './dist',
    hot: true,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'haml-jsx-loader']
      },
      {
        test: /\.(sass|css)$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [ 'file-loader' ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [htmlWebpackPlugin, cleanWebpackPlugin, hotModuleReplacementPlugin],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};

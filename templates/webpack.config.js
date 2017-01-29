const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => ({
  context: resolve(__dirname, 'src'),
  devtool: env.prod ? 'source-map' : 'eval',
  bail: env.prod,
  entry: resolve(__dirname, 'src', 'app', 'index.jsx'),
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
    pathinfo: !env.prod
  },
  devServer: {
    inline: true,
    contentBase: resolve(__dirname, 'dist'),
    port: 3000,
    proxy: {
      '/api/*': 'http://localhost:1337'
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        loader: 'url-loader',
        query: {
          mimetype: 'image/png'
        }
      },
      {
        test: /\.json$/,
        include: /node_modules/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
});

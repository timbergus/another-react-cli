const glob = require('glob');
const webpack = require('webpack');
const { resolve } = require('path');
const PurifyCSSPlugin = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SystemBellPlugin = require('system-bell-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  app: resolve(__dirname, 'src', 'app', 'index.jsx'),
  images: resolve(__dirname, 'src', 'images'),
  build: resolve(__dirname, 'dist'),
  html: resolve(__dirname, 'src', 'index.html'),
  nodeModules: resolve(__dirname, 'node_modules')
};

module.exports = env => ({
  devtool: env.prod ? 'source-map' : 'eval',
  entry: {
    app: PATHS.app,
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router-dom',
      'react-tap-event-plugin',
      'material-ui',
      'superagent'
    ]
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.[hash].js'
  },
  devServer: {
    contentBase: [PATHS.images],
    host: '0.0.0.0',
    port: 3000
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.png$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
          options: {
            query: {
              mimetype: 'image/png'
            }
          }
        }
      },
      {
        test: /\.json$/,
        include: /node_modules/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: PATHS.html
    }),
    new SystemBellPlugin(),
    new CopyWebpackPlugin([
      {
        from: resolve(PATHS.images, 'favicon.png'),
        to: resolve(__dirname, 'dist')
      }
    ]),
    new ExtractTextPlugin('styles.[hash].css'),
    new PurifyCSSPlugin({
      paths: glob.sync(resolve(__dirname, 'src', 'app', '**', '*'))
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    })
  ]
});

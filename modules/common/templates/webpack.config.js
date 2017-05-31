const glob = require('glob');
const webpack = require('webpack');
const { resolve } = require('path');
const PurifyCSSPlugin = require('purifycss-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SystemBellPlugin = require('system-bell-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
    'vendor-react': [
      'react',
      'react-dom',
      'prop-types'
    ],
    {{# redux }}
    'vendor-redux': [
      'redux',
      'react-redux',
      'redux-thunk'
    ],
    {{/ redux }}
    {{# routes}}
    'vendor-routes': [
      'react-router-dom'
    ],
    {{/ routes}}
    {{# material-ui }}
    'vendor-material-ui': [
      'material-ui',
      'react-tap-event-plugin'
    ],
    {{/ material-ui }}
    {{# websockets }}
    'vendor-sockets': [
      'socket.io-client'
    ],
    {{/ websockets }}
    'vendor-utils': [
      'superagent',
      'classnames'
    ]
  },
  output: {
    path: PATHS.build,
    filename: '[name].[chunkhash].js'
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
        from: resolve(PATHS.images),
        to: resolve(__dirname, 'dist', 'assets', 'images')
      }
    ]),
    new ExtractTextPlugin('styles.[chunkhash].css'),
    new PurifyCSSPlugin({
      paths: glob.sync(resolve(__dirname, 'src', 'app', '**', '*'))
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [
        'vendor-react',
        {{# redux }}
        'vendor-redux',
        {{/ redux }}
        {{# routes}}
        'vendor-routes',
        {{/ routes}}
        {{# material-ui }}
        'vendor-material-ui',
        {{/ material-ui }}
        {{# websockets }}
        'vendor-sockets',
        {{/ websockets }}
        'vendor-utils'
      ]
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: ['shared.js'],
      watch: false
    })
  ]
});

'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.resolve(__dirname, 'src/index')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/'
  },
  context: path.resolve(__dirname, 'src'),

  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: 2,
      name: 'shared',
      filename: 'shared.js'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true
    },
    sourceMap: true
  }));
  config.plugins.push(new ExtractTextPlugin({filename: 'bundle.css', disable: false, allChunks: true}));
  config.module.rules.push({
    test: /\.less$/i,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader', 'postcss-loader', 'less-loader'
      ],
      publicPath: '/dist'
    })
  });
  config.module.rules.push({
    test: /\.css$/i,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        'css-loader', 'postcss-loader'
      ],
      publicPath: '/dist'
    })
  });
} else {
  config.devtool = '#cheap-module-source-map'
  config.devServer = {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
  config.module.rules.push({
    test: /\.less$/i,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
  });
  config.module.rules.push({
    test: /\.css$/i,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
    })
  });
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NamedModulesPlugin());
}
module.exports = config;

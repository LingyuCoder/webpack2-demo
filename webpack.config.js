'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port =  process.env.PORT || 7878;

const config = {
  devtool: 'source-map',
  entry: {
    list: [path.resolve(__dirname, 'src/pages/list'), 'webpack/hot/only-dev-server'],
    vote: [path.resolve(__dirname, 'src/pages/vote'), 'webpack/hot/only-dev-server'],
    devServerClient: ['react-hot-loader/patch', `webpack-hot-middleware/client?http://0.0.0.0:${port}`]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ],
    extensions: ['.web.js', '.jsx', '.js']
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
    new webpack.optimize.CommonsChunkPlugin({name: 'shared', filename: 'shared.js'}),
    // new webpack.HotModuleReplacementPlugin(),
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true
    },
    sourceMap: true
  }));
  config.plugins.push(new ExtractTextPlugin({filename: '[name].css', disable: false, allChunks: true}));
  config.module.rules.push({
    test: /\.less$/i,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'less-loader',
          options: {
            sourceMap: true
          }
        }
      ],
      publicPath: '/dist'
    })
  });
  config.module.rules.push({
    test: /\.css$/i,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }
      ],
      publicPath: '/dist'
    })
  });
} else {
  config.devtool = 'cheap-eval-source-map'
  config.devServer = {
    hot: true,
    contentBase: path.resolve(__dirname, 'page'),
    publicPath: '/'
  }
  config.module.rules.push({
    test: /\.less$/i,
    use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
  });
  config.module.rules.push({
    test: /\.css$/i,
    use: ['style-loader', 'css-loader', 'postcss-loader']
  });
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NamedModulesPlugin());
}
module.exports = config;

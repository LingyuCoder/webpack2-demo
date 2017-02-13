require('colors')
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const express = require('express');
const app = express();
const compiler = webpack(webpackConfig);
const port =  process.env.PORT || 7878;
const mockMiddleware = require('express-mock-middleware')({
  glob: 'mock/**/*.js'
});
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})
const hotMiddleware = require('webpack-hot-middleware')(compiler)
app.use(mockMiddleware);
app.use(devMiddleware)
app.use(hotMiddleware)
app.use('/', express.static('./page/'))
app.listen(port, function (err) {
  if (err) return console.log(err);
  devMiddleware.waitUntilValid(function () {
    console.info(`server is runing on localhost:${port}`);
  })
})

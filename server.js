require('colors')
const webpackConfig = require('./webpack.config');
const webpack = require('webpack');
const path = require('path');
const express = require('express');
const glob = require('glob');
const app = express();
const compiler = webpack(webpackConfig);
const port =  process.env.PORT || 7878;
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})
const hotMiddleware = require('webpack-hot-middleware')(compiler)
console.info('----------------');
const mockedApi = glob.sync('mock/**/*.js')
  .map(file => require(path.resolve(file)))
  .reduce((res, file) => res.concat(Object.keys(file).map(api => ({
    method: api.split(' ')[0],
    uri: api.split(' ')[1],
    fn: file[api]
  }))), [])
  .map(api => {
    app.all(api.uri, (req, res, next) => req.method === api.method ? api.fn(req, res) : next());
    return `mock api: ${api.method.green} ${api.uri}`;
  });
app.use(devMiddleware)
app.use(hotMiddleware)
app.use('/', express.static('./page/'))
app.listen(port, function (err) {
  if (err) return console.log(err);
  devMiddleware.waitUntilValid(function () {
    console.info(`server is runing on localhost:${port}`)
    mockedApi.map((line) => console.info(line))
  })
})

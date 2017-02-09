process.env.NODE_ENV = 'development'

require('colors')

var webpackConfig = require('./webpack.config'),
  path = require('path'),
  webpack = require('webpack'),
  express = require('express'),
  mockedApi = [],
  app = express(),
  compiler = webpack(webpackConfig),
  port =  process.env.PORT || 7878


var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)

// var hotMiddleWare = require('webpack-hot-middleware')(compiler)

// mock server
require('fs').readdirSync(require('path').join(`${__dirname}/mock`))
  .forEach((file) => {
    console.info('----------------');
    const mockConfig = require(`./mock/${file}`);
    Object.keys(mockConfig).forEach((context) => {
      const resFunc = mockConfig[context];
      const [method, path] = context.split(' ');
      mockedApi.push(`mock api: ${method.green} ${path}`)
      app.all(path, (req, res, next) => {
        if (req.method === method) {
          resFunc(req, res);
        }
        else {
          next();
        }
      });
    });
  });

app.use(devMiddleware)
app.use(hotMiddleware)
app.use('/', express.static('./page/'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  devMiddleware.waitUntilValid(function () {
    console.info(`server is runing on localhost:${port}`)
    mockedApi.map((line) => console.info(line))
  })
})


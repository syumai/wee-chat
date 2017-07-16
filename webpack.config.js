const path = require('path');
const webpack = require('webpack');
const { address } = require('ip');

const bannerPlugin = new webpack.BannerPlugin(
  '// { "framework": "Vue" }\n',
  { raw: true }
);

const definePlugin = new webpack.DefinePlugin({
  WEBSOCKET_HOST: JSON.stringify(address())
});
console.log(address());

function getBaseConfig () {
  return {
    entry: {
      app: path.resolve('./app.js')
    },
    output: {
      path: 'dist',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          exclude: /node_modules/
        }, {
          test: /\.vue(\?[^?]+)?$/,
          loaders: [
          ]
        }
      ]
    },
    plugins: [bannerPlugin, definePlugin]
  }
}

const webConfig = getBaseConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.loaders[1].loaders.push('vue')

const weexConfig = getBaseConfig()
weexConfig.output.filename = '[name].weex.js'
weexConfig.module.loaders[1].loaders.push('weex')

module.exports = [webConfig, weexConfig]

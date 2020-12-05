'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
//motor在源码库中的位置
const motorSource = `./library`;
//打包后motor静态资源存放的位置
const motorDist = 'motor';


const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  devtool: config.dev.devtool,
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true,
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
      /**复制motorSource中的静态资源到打包后根目录的motor文件夹下**/
      new CopyWebpackPlugin([{ from: path.join(motorSource, 'Workers'), to: path.join(motorDist, 'Workers') }]),
      new CopyWebpackPlugin([{ from: path.join(motorSource, 'images'), to: path.join(motorDist, 'images') }]),
      new CopyWebpackPlugin([{ from: path.join(motorSource, 'environmentMap'), to: path.join(motorDist, 'environmentMap') }]),
      new CopyWebpackPlugin([{ from: path.join(motorSource, 'Assets'), to: path.join(motorDist, 'Assets') }]),
      new CopyWebpackPlugin([{ from: path.join(motorSource, 'Widgets'), to: path.join(motorDist, 'Widgets')}]),
      new CopyWebpackPlugin([{ from: path.join(motorSource, 'ThirdParty'), to: path.join(motorDist, 'ThirdParty') }]),
      new CopyWebpackPlugin([{ from: path.join(motorSource, 'wasm'), to: path.join(motorDist, 'wasm') }]),
      new CopyWebpackPlugin([{ from: path.join(motorSource, 'model'), to: path.join(motorDist, 'model') }]),
      /**设置全局变量，存放静态资源目录路径**/
      new webpack.DefinePlugin({
          MOTOR_BASE_URL: JSON.stringify(motorDist)
      }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      process.env.PORT = port
      devWebpackConfig.devServer.port = port
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})

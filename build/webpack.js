const {resolve} = require('path')
const HappyPack = require('happypack')
const CopyPlugin = require('copy-webpack-plugin')
module.exports = {
  entry: {main: resolve(__dirname, '../config/main.js')},
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'happypack/loader?id=frame'},
      {test: /\.node$/, exclude: /node_modules/, use: 'node-loader'}
    ]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: resolve(__dirname, '../dist')
  },
  plugins: [
    new HappyPack({
      id: 'frame',
      loaders: [{
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }],
      threadPool: HappyPack.ThreadPool({size: require('os').cpus().length})
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../config/loading.html'),
          to: resolve(__dirname, '../dist')
        }
      ]
    })
  ],
  resolve: {extensions: ['.tsx', '.ts', '.js', '.json', '.node']},
  watch: true,
  watchOptions: {poll: 1000, aggregateTimeout: 500, ignored: /node_modules/},
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false
  }
}

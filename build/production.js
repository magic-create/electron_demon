//  定义环境变量
process.env.NODE_ENV = 'production'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
const chalk = require('chalk')
const electron = require('electron')

//  Webpack配置
const webpackConfig = require('./webpack.js')
webpackConfig.mode = process.env.NODE_ENV
const report = require('ora')(`Building ${process.env.NODE_ENV} electron...`)
let electronProcess = null

//  定义Webpack
const startMain = () => {
  return new Promise((resolve) => {
    report.start()
    require('rimraf')('./dist/main.js', (e) => {
      if(e) throw e
      compiler = require('webpack')(webpackConfig, (e, stats) => {
        if(e) throw e
        report.stop()
        process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunks: false, chunkModules: false}) + '\n\n')
        if(stats.hasErrors()){
          console.log(chalk.red('Build failed with errors.\n'))
          process.exit(1)
        }
        console.log(chalk.cyan(`Build complete production in ${stats.endTime - stats.startTime}ms.\n`))
        resolve()
        if(process.env.IS_BUILDER === 'builder') process.exit()
      })
    })
  })
}

//  启动Electron
try{
  startMain().then(() => {
    if(process.env.IS_BUILDER === 'builder') return
    electronProcess = require('child_process').spawn(electron, ['--inspect=5858', require('path').resolve(__dirname, '../dist/main.js')]).on('close', () => { process.exit() })
  })
}catch(e){ console.error(e)}
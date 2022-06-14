//  定义环境变量
process.env.NODE_ENV = 'development'
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true
const chalk = require('chalk')
const electron = require('electron')
const child_process = require('child_process')

//  Webpack配置
const webpackConfig = require('./webpack.js')
webpackConfig.mode = process.env.NODE_ENV
const report = require('ora')(`Building ${process.env.NODE_ENV} electron...`)
let electronProcess = null
let manualRestart = false

//  定义Webpack
const startMain = () => {
  return new Promise((resolve) => {
    report.start()
    require('rimraf')('./dist/main.js', (e) => {
      //  抛出异常
      if(e) throw e
      require('webpack')(webpackConfig, (e, stats) => {
        if(e) throw e
        report.stop()
        process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunks: false, chunkModules: false}) + '\n\n')
        if(stats.hasErrors()){
          console.log(chalk.red('Build failed with errors.\n'))
          process.exit(1)
        }
        if(electronProcess && electronProcess.kill){
          manualRestart = true
          process.kill(electronProcess.pid)
          electronProcess = child_process.spawn(electron, ['--inspect=5858', require('path').resolve(__dirname, '../dist/main.js')]).on('close', () => { if(!manualRestart) process.exit() })
          setTimeout(() => { manualRestart = false }, 5000)
        }
        console.log(chalk.cyan(`Build complete development in ${stats.endTime - stats.startTime}ms.\n`))
        resolve()
      })
    })
  })
}

//  启动Electron
try{ startMain().then(() => { electronProcess = child_process.spawn(electron, ['--inspect=5858', require('path').resolve(__dirname, '../dist/main.js')]).on('close', () => { if(!manualRestart) process.exit() }) })}catch(e){ console.error(e)}

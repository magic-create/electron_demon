import path from 'path'
import fs from 'fs'
import {exec} from 'child_process'

const install = Vue => {
  //  定义方法
  const define = Vue.config.globalProperties
  define.console = console
  define.scrollTop = (el) => {
    if(el.offsetParent) return define.scrollTop(el.offsetParent) + el.offsetTop
    return el.offsetTop
  }
  define.scrollTo = (top = 0) => {
    if(typeof top == 'object') top = define.scrollTop(top)
    window.scrollTo({top: top, behavior: 'smooth'})
  }
  define.toast = (content, options = {}, duration = 2500) => {
    if(typeof content != 'string' && typeof content != 'function') content = content.toString()
    if(typeof options != 'object'){
      duration = options
      options = {}
    }
    options.type = options.type || 'info'
    options.closable = options.closable || false
    options.keepAliveOnHover = options.keepAliveOnHover != undefined ? options.keepAliveOnHover : true
    options.duration = options.duration || duration
    return define.messages[options.type](content, options)
  }
  define.error = (content, options = {}, duration = 2500) => {
    if(typeof content != 'string' && typeof content != 'function') content = content.toString()
    if(typeof options != 'object'){
      duration = options
      options = {}
    }
    options.type = options.type || 'error'
    options.closable = options.closable || false
    options.keepAliveOnHover = options.keepAliveOnHover != undefined ? options.keepAliveOnHover : true
    options.duration = options.duration || duration
    return define.messages[options.type](content, options)
  }
  define.realpath = (file, root = true) => {
    return (process.env.NODE_ENV == 'production' ? path.join(path.dirname(define.$exe.app.getPath('exe')), root ? '' : 'resources', file || '') : file).replace(/\\/g, '/')
  }
  define.fread = (file, json = false) => {
    const content = fs.readFileSync(define.realpath(file)).toString()
    return json ? JSON.parse(content) : content
  }
  define.exec = (command, options, callback) => {
    return exec(command, options, callback)
  }
  define.exit = () => {
    define.$exe.app.exit()
  }
  define.window = (width, height) => {
    const win = define.$exe.getCurrentWindow()
    if(width){
      win.setMinimumSize(width, height)
      win.setSize(width, height)
      win.center()
    }
    else return win
  }
}

export default {install}
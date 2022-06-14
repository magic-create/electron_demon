import axios from 'axios'
import qs from 'qs'
import Common from './api/common'

const install = Vue => {
  //  定义方法
  const define = Vue.config.globalProperties
  const api = (path, params, options) => {
    const method = (options.method || 'get').toLowerCase()
    let loading = options.loading != undefined ? options.loading : (method == 'post')
    let wait = options.wait != undefined ? options.wait : 100
    const data = method == 'get' ? qs.stringify(params) : params
    if(method == 'get' && typeof data == 'string' && data.length > 0) path += (path.indexOf('?') == -1 ? ('?' + data) : ('&' + data))
    return new Promise((resolve, reject) => {
      if(loading) define.loading.show(method)
      return new Promise((resolve) => { setTimeout(() => { resolve() }, wait || 0) }).then(() => {
        return axios({method: method, url: path, data: data})
          .then(res => {
            if(loading) define.loading.hide()
            if(res.status == 0 || res.status == 200) resolve(res.data)
            //  开发模式下输出内容
            else if(process.env.NODE_ENV == 'development') console.error(res)
          })
          .catch(err => {
            if(loading) define.loading.hide()
            reject(err)
          })
      }).catch(err => {
        if(loading) define.loading.hide()
        reject(err)
      })
    })
  }
  define.api = {
    get: (path, params, options) => api(path, params, Object.assign({method: 'get'}, options)),
    post: (path, params, options) => api(path, params, Object.assign({method: 'post'}, options)),
    common: new Common(define)
  }
}

export default {install}

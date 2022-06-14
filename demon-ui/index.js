// 三方组件
import axios from 'axios'
import VueAxios from 'vue-axios'
import Naive from 'naive-ui'
// 全局Loading
import loading from './libs/components/loading'
// 引入全局mixin
import method from './libs/mixin/method.js'
//	安装
const install = (Vue, options) => {
  //  申明应用
  const app = Vue._context
  //  关闭提示
  if(process.env.NODE_ENV == 'production') app.config.productionTip = false
  //	混入通用方法
  app.config.globalProperties.$http = axios
  app.config.globalProperties.$exe = require('@electron/remote')
  Vue.use(Naive)
     .use(VueAxios, axios)
     .use(loading)
     .use(method)
}

export default {install}

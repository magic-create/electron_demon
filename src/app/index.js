// 引入动态计算mixin
import store from './mixin/store.js'
//	http拦截器
import httpInterceptor from './http/interceptor.js'
//	api接口
import httpApi from './http/api.js'
//	注册
const install = (Vue, options) => {
  //	混入通用方法
  Vue.use(store, options)
  Vue.use(httpApi, options)
  Vue.use(httpInterceptor, options)
}
export default {install}

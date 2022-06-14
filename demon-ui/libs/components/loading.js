import {createApp} from 'vue'

import Loading from './loading.vue'

export default {
  loading: null,
  install(Vue){
    if(this.loading){
      Vue.config.globalProperties.loading = this.loading
      return
    }
    let instance = createApp(Loading)
    let parent = document.createElement('div')
    let bodyDom = document.body
    bodyDom.appendChild(parent)
    this.loading = instance.mount(parent)
    Vue.config.globalProperties.loading = this.loading
  }
}
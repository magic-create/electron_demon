import {computed} from 'vue'
import {useStore} from 'vuex'

const install = Vue => {
  //  定义变量
  const define = Vue.config.globalProperties
  define._config = computed(() => useStore().getters.config)
}

export default {install}

<template>
  <n-config-provider :theme-overrides="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-global-style/>
    <frame-provider>
      <router-view/>
    </frame-provider>
  </n-config-provider>
</template>
<script>
  import {getCurrentInstance, onMounted, watch} from 'vue'
  import {useRoute} from 'vue-router'
  import {zhCN, dateZhCN} from 'naive-ui'
  import FrameProvider from 'demon/components/frame.vue'
  import themeConfig from '@/app/components/theme.json'

  export default {
    name: 'app',
    components: {FrameProvider},
    setup(){
      const instance = getCurrentInstance()
      const proxy = instance.proxy
      const global = instance.appContext.config.globalProperties
      proxy.route = useRoute()
      onMounted(() => {
        console.info('%cFrame:Init', 'color:blue;font-weight:bold;')
        proxy.api.common.init().then(() => { console.info('%cFrame:Complete', 'color:green;font-weight:bold;') }).catch(res => { console.info('%cFrame:Failure : ' + res.message, 'color:red;font-weight:bold;')})
        setTimeout(() => { route(proxy.$route) }, 200)
      })
      const route = (info) => {
        proxy.scrollTo()
        proxy.progress.finish()
        console.info('%cFrame:' + (info.meta.title || 'Unknown'), 'color:purple;font-weight:bold;')
        if(typeof info.meta.progress != 'undefined' ? info.meta.progress : true) proxy.progress.start()
      }
      watch(() => proxy.route.path, () => { route(proxy.$route) })
      global.themeConfig = themeConfig
      return {theme: themeConfig, zhCN, dateZhCN}
    }
  }
</script>
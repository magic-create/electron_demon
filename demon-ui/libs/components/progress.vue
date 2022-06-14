<template></template>
<script>
  import {getCurrentInstance} from 'vue'
  import {useLoadingBar} from 'naive-ui'

  export default {
    name: 'ProgressContent',
    setup(){
      getCurrentInstance().appContext.config.globalProperties.progress = useLoadingBar()
    }
  }
</script>
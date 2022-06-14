<template></template>
<script>
  import {getCurrentInstance} from 'vue'
  import {useMessage} from 'naive-ui'

  export default {
    name: 'MessageContent',
    setup(){
      getCurrentInstance().appContext.config.globalProperties.messages = useMessage()
    }
  }
</script>
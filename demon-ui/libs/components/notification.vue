<template></template>
<script>
  import {getCurrentInstance} from 'vue'
  import {useNotification} from 'naive-ui'

  export default {
    name: 'NotificationContent',
    setup(){
      getCurrentInstance().appContext.config.globalProperties.notification = useNotification()
    }
  }
</script>
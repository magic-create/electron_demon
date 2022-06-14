<template></template>
<script>
  import {getCurrentInstance} from 'vue'
  import {useDialog} from 'naive-ui'

  export default {
    name: 'DialogContent',
    setup(){
      getCurrentInstance().appContext.config.globalProperties.dialog = useDialog()
    }
  }
</script>
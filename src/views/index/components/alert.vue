<template>
  <n-alert :title="title" type="info">{{content}}</n-alert>
</template>
<script>
  export default {
    name: 'index-alert',
    props: {
      title: {type: String, default: 'Version'},
      content: {type: String}
    }
  }
</script>
<template>
  <div class="demon-loading" v-show="data.visible">
    <div class="shade"></div>
    <div class="anim" :class="'anim-'+data.type"></div>
  </div>
</template>
<script>
  import {reactive} from 'vue'

  export default {
    name: 'LoadingMask',
    setup(){
      const data = reactive({visible: false})
      const show = (type) => {
        type = (type || 'default').toLowerCase()
        switch(type){
          case 'get':
            data.type = 1
            break
          case 'post':
            data.type = 2
            break
          default:
            data.type = 0
            break
        }
        data.visible = true
      }
      const hide = () => {data.visible = false}
      return {data, show, hide}
    }
  }
</script>
<style lang="scss" scoped>
  .demon-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999999;
    pointer-events: auto;

    .shade {
      width: 100%;
      height: 100%;
      background-color: $modal-backdrop-bg;
      opacity: $modal-backdrop-opacity;
    }

    .anim {
      position: fixed;
      top: calc(40% - 64px / 2);
      left: calc(50% - 64px / 2);
      width: 64px;
      height: 64px;
      background-repeat: no-repeat;
      background-size: contain;
    }

    .anim-0 {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='60px' height='60px' viewBox='0 0 50 50' style='enable-background:new 0 0 50 50' xml:space='preserve'%3E%3Ccircle fill='%23FFFFFF' stroke='none' cx='8' cy='25' r='6'%3E%3Canimate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.1'%3E%3C/animate%3E%3C/circle%3E%3Ccircle fill='%23FFFFFF' stroke='none' cx='24' cy='25' r='6'%3E%3Canimate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.2'%3E%3C/animate%3E%3C/circle%3E%3Ccircle fill='%23FFFFFF' stroke='none' cx='40' cy='25' r='6'%3E%3Canimate attributeName='opacity' dur='1s' values='0;1;0' repeatCount='indefinite' begin='0.3'%3E%3C/animate%3E%3C/circle%3E%3C/svg%3E");
    }

    .anim-1 {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='48px' height='60px' viewBox='0 0 24 30' style='enable-background:new 0 0 50 50' xml:space='preserve'%3E%3Crect x='0' y='7.6416' width='4' height='14.7168' fill='%23FFFFFF' opacity='0.2'%3E%3Canimate attributeName='opacity' attributeType='XML' values='0.2; 1; .2' begin='0s' dur='0.6s' repeatCount='indefinite'%3E%3C/animate%3E%3Canimate attributeName='height' attributeType='XML' values='10; 20; 10' begin='0s' dur='0.6s' repeatCount='indefinite'%3E%3C/animate%3E%3Canimate attributeName='y' attributeType='XML' values='10; 5; 10' begin='0s' dur='0.6s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3Crect x='8' y='5.1416' width='4' height='19.7168' fill='%23FFFFFF' opacity='0.2'%3E%3Canimate attributeName='opacity' attributeType='XML' values='0.2; 1; .2' begin='0.15s' dur='0.6s' repeatCount='indefinite'%3E%3C/animate%3E%3Canimate attributeName='height' attributeType='XML' values='10; 20; 10' begin='0.15s' dur='0.6s' repeatCount='indefinite'%3E%3C/animate%3E%3Canimate attributeName='y' attributeType='XML' values='10; 5; 10' begin='0.15s' dur='0.6s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3Crect x='16' y='7.3584' width='4' height='15.2832' fill='%23FFFFFF' opacity='0.2'%3E%3Canimate attributeName='opacity' attributeType='XML' values='0.2; 1; .2' begin='0.3s' dur='0.6s' repeatCount='indefinite'%3E%3C/animate%3E%3Canimate attributeName='height' attributeType='XML' values='10; 20; 10' begin='0.3s' dur='0.6s' repeatCount='indefinite'%3E%3C/animate%3E%3Canimate attributeName='y' attributeType='XML' values='10; 5; 10' begin='0.3s' dur='0.6s' repeatCount='indefinite'%3E%3C/animate%3E%3C/rect%3E%3C/svg%3E");
    }

    .anim-2 {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='60px' height='60px' viewBox='0 0 40 40' enable-background='new 0 0 40 40' xml:space='preserve'%3E%3Cpath opacity='0.2' fill='%23FFFFFF' d='M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z'%3E%3C/path%3E%3Cpath fill='%23FFFFFF' d='M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z' transform='rotate%2842.1171 20 20%29'%3E%3CanimateTransform attributeType='xml' attributeName='transform' type='rotate' from='0 20 20' to='360 20 20' dur='0.5s' repeatCount='indefinite'%3E%3C/animateTransform%3E%3C/path%3E%3C/svg%3E");
    }
  }
</style>
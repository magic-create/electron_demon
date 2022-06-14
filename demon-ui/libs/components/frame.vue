<template>
  <n-loading-bar-provider>
    <progress-content/>
    <n-dialog-provider>
      <dialog-content/>
      <n-notification-provider placement="bottom-right">
        <notification-content/>
        <n-message-provider>
          <message-content/>
          <slot slot="default"></slot>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-loading-bar-provider>
</template>

<script>
  import MessageContent from './message.vue'
  import DialogContent from './dialog.vue'
  import ProgressContent from './progress.vue'
  import NotificationContent from './notification.vue'
  import LoadingMask from './loading.vue'

  export default {
    name: 'FrameProvider',
    components: {MessageContent, DialogContent, ProgressContent, NotificationContent, LoadingMask}
  }
</script>
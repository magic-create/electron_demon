<template>
  <div class="box">
    <index-alert title="Hello World" :content="'Local Version : '+(_config.value?.version || '0.0.0.0')"/>
    <n-form ref="formRef" :model="data.form.data" :rules="data.form.rule" label-placement="left" label-width="auto" require-mark-placement="right-hanging" size="medium" :style="{marginTop:'20px'}">
      <n-form-item label="Baidu Search" path="input">
        <n-input v-model:value="data.form.data.input" placeholder="Enter baidu search keywords" @keyup.enter="doValidateClick"/>
      </n-form-item>
    </n-form>
    <n-space style="justify-content:flex-end">
      <n-button round @click="doPingClick">Ping baidu</n-button>
      <n-button round :loading="data.loading" type="primary" @click="doValidateClick">Begin your search</n-button>
    </n-space>
    <n-list bordered>
      <template #header>Search matching</template>
      <template #footer>Just a simple test example</template>
      <n-list-item v-for="item in data.list" v-if="data.list.length">{{item.q}}</n-list-item>
      <n-list-item v-else>
        <n-empty description="No results or searches are in progress" :style="{padding:'20px 0'}"></n-empty>
      </n-list-item>
    </n-list>
  </div>
</template>
<script>
  import {getCurrentInstance, onMounted, reactive, ref, h} from 'vue'
  import iconv from 'iconv-lite'
  import IndexAlert from './components/alert.vue'

  export default {
    components: {IndexAlert},
    setup(){
      const instance = getCurrentInstance()
      const global = instance.appContext.config.globalProperties
      const formRef = ref(null)
      const data = reactive({
        form: {
          data: {},
          rule: {
            input: {
              required: true,
              trigger: ['blur', 'input'],
              message: 'Please enter the search keywords'
            }
          }
        },
        loading: false,
        list: []
      })
      onMounted(() => {
        setTimeout(() => {global.progress.finish()}, 500)
      })
      return {
        data,
        formRef,
        doPingClick(){
          global.loading.show()
          const cmd = 'ping www.baidu.com'
          global.exec(cmd, {encoding: 'buffer'}, (error, stdout, stderr) => {
              global.loading.hide()
              global.dialog.create({title: cmd, content: () => h('p', {innerHTML: iconv.decode(Buffer.from(error ? stderr : stdout, 'binary'), 'GBK').trim().replaceAll('\r\n', '<br>')}), type: error ? 'error' : 'info', positiveText: '👌', showIcon: false, style: {width: '600px'}})
            }
          )
        },
        doValidateClick(e){
          if(data.loading) return
          e.preventDefault()
          formRef.value?.validate((errors) => {
            if(!errors){
              data.loading = true
              global.api.get('sugrec', {prod: 'pc', wd: data.form.data.input}, {wait: 800}).then(res => {
                data.loading = false
                data.list = res.g
              }).catch(error => {
                data.loading = false
                global.error(error.message)
              })
            }
            else{
              console.error(errors)
              global.error('Form validation failed')
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .box {
    padding: 20px;
  }
</style>
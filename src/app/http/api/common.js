class Common {
  constructor(define){
    this.define = define
  }

  init(){
    this.define.loading.show()
    return this.define.api.get('sugrec', {prod: 'pc', wd: 'vue'}, {wait: 0, loading: true}).then(res => {
      this.define.loading.hide()
      //	设置变量
      const setting = this.define.fread('config.json', true)
      this.define.$store.dispatch('setting/config', setting)
      //	继续返回
      return res
    }).catch(() => {this.define.loading.hide()})
  }
}

export default Common
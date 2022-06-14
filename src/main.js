import {createApp} from 'vue'
import App from './Frame.vue'
import Demon from './../demon-ui'
import themeConfig from '@/app/components/theme.json'
// 创建项目
const app = createApp(App)
app.use(Demon, {themeConfig: themeConfig})
// 引入全局store和route
import store from './app/store'
import router from './app/router'
// 项目代码
import Project from './app'
// 运行项目
app.use(Project)
//  加载全局组件
app.use(router).use(store).mount('#app')
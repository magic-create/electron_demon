import {createStore, createLogger} from 'vuex'
import setting from './modules/setting'

const isDev = process.env.NODE_ENV === 'development'
export default createStore({
  getters: {
    config: state => state.setting.config
  },
  modules: {setting},
  strict: isDev,
  plugins: isDev ? [createLogger({logActions: false})] : []
})
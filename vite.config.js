import {defineConfig} from 'vite'
import {resolve} from 'path'
import vue from '@vitejs/plugin-vue'
import restart from 'vite-plugin-restart'
import {createHtmlPlugin} from 'vite-plugin-html'
import commonjsExternals from 'vite-plugin-commonjs-externals'

export default ({mode}) => defineConfig({
  //  配置需要使用的插件列表
  plugins: [
    vue(),
    restart({restart: ['vue.config.js']}),
    createHtmlPlugin({
      //  压缩
      minify: true,
      //  构造文件
      entry: mode == 'development' ? 'src/main.js' : resolve(__dirname, 'src/main.js'),
      //  模板文件
      template: 'build/index.html',
      //  数据
      inject: {data: {title: 'Frame'}}
    }),
    commonjsExternals({externals: ['fs', 'path', 'child_process', 'iconv-lite']})
  ],
  //  定义路径别名
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
      "demon": resolve(__dirname, 'demon-ui/libs')
    }
  },
  //  引用全局样式
  css: {
    preprocessorOptions: {scss: {additionalData: `@import "@/app/css/variable.scss";`}},
    postcss: {plugins: [{postcssPlugin: 'internal:charset-removal', AtRule: {charset: (atRule) => { if(atRule.name === 'charset'){ atRule.remove() } }}}]}
  },
  //  强制预构建插件包
  optimizeDeps: {include: ['axios']},
  //  基础路径
  base: './',
  //  打包配置
  build: {target: 'modules', outDir: resolve(__dirname, 'dist/render'), emptyOutDir: true, assetsDir: 'assets', minify: 'esbuild', chunkSizeWarningLimit: 1500},
  // 本地运行配置，及反向代理配置
  server: {
    //  设置IP
    host: '0.0.0.0',
    //  设置端口
    port: 8090,
    //  端口被占用直接退出
    strictPort: true,
    //  默认启用并允许任何源
    cors: true,
    //  在服务器启动时自动在浏览器中打开应用程序
    open: false
  }
})
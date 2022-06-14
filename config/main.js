const {join} = require('path')
const {app, Menu, BrowserWindow} = require('electron')
const isDev = process.env.NODE_ENV === 'development'
const isMac = process.platform === 'darwin'
const loadingWait = 1200
let mainWindow = null
let loadingWindow = null
//  隐藏菜单栏
Menu.setApplicationMenu(null)
// 创建加载窗口
const createLoadingWindow = () => {
  //  构建窗口
  loadingWindow = new BrowserWindow({
    width: 80,
    height: 60,
    resizable: false,
    frame: false,
    hasShadow: false,
    useContentSize: true,
    maximizable: false,
    titleBarStyle: 'hidden',
    center: true,
    modal: true,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      spellcheck: false,
      devTools: true
    }
  })
  //  去掉顶部菜单栏
  loadingWindow.setMenu(null)
  //  显示界面
  loadingWindow.loadURL(`file://${join(__dirname, 'loading.html')}`).then(() => {
    setTimeout(() => loadingWindow.show(), 500)
    setTimeout(() => createMainWindow(), loadingWait)
  })
  //  关闭时置空
  loadingWindow.on('closed', () => { loadingWindow = null })
}
// 创建程序窗口
const createMainWindow = () => {
  //  构建窗口
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    icon: isDev ? `${join(__dirname, '../config/icons/256x256.ico')}` : null,
    resizable: false,
    frame: true,
    hasShadow: false,
    useContentSize: false,
    movable: true,
    closable: true,
    minimizable: true,
    maximizable: true,
    fullscreenable: true,
    titleBarStyle: 'default',
    center: true,
    modal: true,
    transparent: false,
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
      allowRunningInsecureContent: true,
      spellcheck: false,
      devTools: isDev
    }
  })
  //  去掉顶部菜单栏
  mainWindow.setMenu(null)
  //  根据开发模式和发行模式加载不同的路径
  mainWindow.loadURL(isDev ? `http://localhost:8090` : `file://${join(__dirname, 'render/index.html')}`).then(() => {loadingWindow?.destroy()})
  //  开启remote
  require('@electron/remote/main').initialize()
  require('@electron/remote/main').enable(mainWindow.webContents)
  //  初始化完成
  mainWindow.webContents.once('dom-ready', () => { mainWindow.show() })
  //  调试模式则自动弹出分离式开发者工具
  if(isDev) mainWindow.webContents.openDevTools({mode: 'detach'})
  //  关闭时置空
  mainWindow.on('closed', () => { mainWindow = null })
}
//  创建窗口
if(!loadingWait){
  app.isReady() ? createMainWindow() : app.on('ready', createMainWindow)
  app.on('activate', () => {if(mainWindow === null) createMainWindow()})
}
else app.isReady() ? createLoadingWindow() : app.on('ready', createLoadingWindow)
app.on('window-all-closed', () => {if(!isMac) app.quit()})
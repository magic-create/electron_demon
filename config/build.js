module.exports = {
  productName: 'Frame',
  appId: 'com.frame.develop',
  copyright: '*本程序最终解释权归私人所属，请勿用于任何商业用途*',
  compression: 'maximum',
  asar: true,
  directories: {
    output: 'dist/build',
    buildResources: 'config'
  },
  files: ['', '!node_modules', 'node_modules/@electron/remote', 'dist/main.js', 'dist/loading.html', 'dist/render'],
  extraResources: [
    {
      from: './config.json',
      to: '../config.json'
    }
  ],
  dmg: {
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications'
      }, {
        x: 130,
        y: 150,
        type: 'file'
      }
    ]
  },
  mac: {
    icon: 'config/icons/icon.icns'
  },
  win: {
    icon: 'config/icons/icon.ico',
    target: 'dir'
  },
  linux: {
    icon: 'config/icons'
  }
}
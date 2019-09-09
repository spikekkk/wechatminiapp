const util = require('/utils/util');
//app.js
App({
  onLaunch: function() {
    // wx.clearStorageSync();
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    util.updateMiniprogram();
  },
  onShow: function() {

  },
  globalData: {
    // urlBase: 'http://192.168.3.51:8080/', //添饭
    // urlBase: 'http://192.168.1.48:8080/',  //笔记本添饭
    // urlBase: 'http://192.168.3.56:8080/', //王英语
    // urlBase: 'http://192.168.3.122:8080/', //liming

    urlBase: 'http://192.168.1.56:8981/', //offline
    socketUrl: 'ws://192.168.1.56:8982/websocket/',
    qrcodeUrl: 'http://exp.mynatapp.cc/',

    // urlBase: 'https://mp.lekecloud.cn/',
    // socketUrl: 'wss://mpshare.lekecloud.cn/websocket/',
    // qrcodeUrl: 'https://mp.lekecloud.cn/'
  }
})
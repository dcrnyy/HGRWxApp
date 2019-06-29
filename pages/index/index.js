//index.js
//获取应用实例
const app = getApp()
const pub = require('../../src/pub.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function() {
    // wx.redirectTo({
    //   url: '../foodlist/foodlist',
    // });
    //app.login();
    

    if (app.globalData.userInfo) {
      console.log(1)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true

      })
      wx.redirectTo({
        url: '../foodlist/foodlist',
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(2)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(3)
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    var info = e.detail.userInfo;
    if (typeof(info) == "undefined") {
      console.log("用户拒绝授权");
      wx.showToast({
        title: '登录失败',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    app.globalData.userInfo = info
    this.setData({
      userInfo: info,
      hasUserInfo: true
    })

  },

  login: function(open) {

  },
  test: function() {
    console.log(app.globalData.userInfo)
  }
})
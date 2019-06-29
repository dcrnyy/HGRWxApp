//index.js
//获取应用实例
const app = getApp()
const pub = require('../../src/pub.js')

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    islogin: false,
  },
  //事件处理函数
  onLoad: function() {
    // wx.redirectTo({
    //   url: '../foodlist/foodlist',
    // });

    //debugger;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              app.globalData.userInfo = res.userInfo
              // this.setData({
              //   userInfo: res.userInfo,
              //   islogin: true,
              // })
              //跳转
              wx.redirectTo({
                url: '../foodlist/foodlist',
              })
            }
          })
        }
      }
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    var info = e.detail.userInfo;
    if (typeof(info) == "undefined") {
      console.log("用户拒绝授权");
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    app.globalData.userInfo = info
    //跳转
    wx.redirectTo({
      url: '../foodlist/foodlist',
    })
  },
  updateInfo: function(userinfo)
  {

  }
  
})
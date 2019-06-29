//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  getUserInfo: function (e) {
    debugger;
    console.log(e)
    var info = e.detail.userInfo;
    if (typeof (info) == "undefined") {
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

  }
})

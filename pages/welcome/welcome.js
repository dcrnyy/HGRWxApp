//index.js
//获取应用实例
const app = getApp()
const pub = require('../../src/pub.js')
const req = require('../../src/request.js')

Page({
  data: {
    motto: 'Hello World',
    // userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    islogin: false,
  },
  //事件处理函数
  onLoad: function () {
    // wx.redirectTo({
    //   url: '../foodlist/foodlist',
    // });

    this.login();

  },
  getUserInfo: function (e) {
    // console.log(e)
    // debugger;
    var info = e.detail.userInfo;
    if (typeof (info) == "undefined") {
      console.log("用户拒绝授权");
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    this.login();

  },
  login: function (info) {
    var that = this;
    app.settoken(null);
    wx.login({
      success: loginres => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //debugger;
        if (loginres.code) {

          // 获取用户信息
          wx.getSetting({
            success: getres => {
              //debugger;
              if (getres.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                  success: userres => {
                    //debugger;
                    var userinfo = userres.userInfo;
                    //全局记录
                    app.globalData.userInfo = userinfo;
                    //登录：发送 loginres.code和用户信息 到后台登录以及换取 openId, sessionKey, unionId
                    var param = {
                      code: loginres.code,
                      brandId: app.globalData.brandId,
                      name: userinfo.nickName,
                      image: userinfo.avatarUrl,
                      sex: userinfo.gender
                    };
                    that.applogin(param);

                  }
                })
              }
            }
          })
        }
      }
    })
  },
  applogin: function (param) {
    req.postapi("APPLogin", param, function (data) {
      //debugger;

      //console.log(result);
      if (data.code == 0) {
        var result = data.data;
        //console.log(result.token);
        app.settoken(result.token)
        app.globalData.token = result.token;
        app.globalData.openid = result.openId;
        //跳转
        console.log("跳转:../index/index");
        // wx.redirectTo({
        //   url: '../index/index',
        // });
        //tabBar页面用 wx.switchTab
        wx.switchTab({
          url: '../index/index',
        });
      }

    })
  }


})
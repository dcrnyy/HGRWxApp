//app.js


App({
  onLaunch: function() {
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
  },

  // login: function() {
  //   var _this = this;
  //   var param = {
  //     code: res.code,

  //   };

  //   // 登录
  //   wx.login({
  //     success: res => {
  //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
  //       debugger;
  //       if (res.code) {
  //         wx.request({
  //           url: "http://localhost:63102/api",
  //           data: {
  //             Function: "APPLogin",
  //             Data: JSON.stringify(param)
  //           },
  //           dataType: 'json',
  //           method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
  //           // header: {}, // 设置请求的 header
  //           success: function(data) {
  //             debugger;
  //             //接口调用成功的回调函数
  //             var result = data.data;
  //             console.log(result);
  //             if (data.statusCode == 200 && result.code == 0) {

  //               //console.log(result.data.token);
  //               _this.settoken(result.data.token)

  //               _this.globalData.token = result.data.token;
  //               _this.globalData.openid = result.data.openId;


  //             } else {
  //               wx.showToast({
  //                 title: result.message,
  //                 icon: 'none',
  //                 duration: 2000
  //               })
  //               //关闭
  //               wx.navigateBack({
  //                 delta: 1
  //               })
  //             }

  //           },
  //           fail: function() {
  //             // 接口调用失败的回调函数
  //           },
  //           complete: function() {
  //             // 接口调用结束的回调函数（调用成功、失败都会执行）
  //           }
  //         })
  //       }
  //     },
  //   })
  //   debugger;
  // },

  //设置token
  settoken: function(token) {
    //debugger;
    wx.setStorage({
      key: this.globalData.tokenName,
      data: token,
    })
  },
  //获取token
  gettoken: function() {
    try {
      //debugger;
      var token = wx.getStorageSync(this.globalData.tokenName);
      if (token) {
        return token;
      }
      return null;
    } catch (e) {
      return null;
    }
  },
 
  globalData: {
    brandId: "052f47b84beb4d228e97409496f96953", //品牌id
    userInfo: null,
    tokenName: "usertoken", //token缓存的key名称
    token: "",
    openid: "",
  }
})
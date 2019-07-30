//index.js
//获取应用实例
const app = getApp()
const req = require('../../src/request.js')


Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    interval: 3000,
    duration: 1000,
    

    noticeList: [], //顶部公告 轮播图
    foodList: [],   //菜式推荐
    shopList: []     //店铺
  },



  //事件处理函数
  onLoad: function () {
    var that = this;
    var brandId = app.globalData.brandId;
    req.postapi("APPGetIndex", brandId, function (result) {
      //console.log(result);
      that.setData({
        noticeList: result.data.noticeList,
        foodList: result.data.foodList,
        shopList: result.data.shopList,
      });
    })
  },

  //页面加载时间
  onShow: function () {
    // wx.showToast({
    //   title: '加载中...',
    //   icon: 'loading'
    // });
    // 生命周期函数--监听页面显示
    // var ggtop = res.data.ggtop;
    // var indeximg = res.data.indeximg;
    // var prolist = res.data.prolist;
    // var mini = res.data.mini;
    // that.setData({
    //   imgUrls: ggtop,
    //   indeximg: indeximg,
    //   prolist: prolist,
    //   mini: mini,
    // });
  },

  system: function (e) {
    var ptype = e.currentTarget.dataset.ptype;
    //预约座位
    if (ptype == 'ydzw') {
      wx.navigateTo({
        url: '../dinner/dinner',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    //菜单列表
    if (ptype == 'ksdc') {
      wx.navigateTo({
        url: '../ordering/ordering',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    //商家活动
    if (ptype == 'dphd') {
      wx.navigateTo({
        url: '../activity/activity',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
    //优惠券
    if (ptype == 'vou') {
      wx.navigateTo({
        url: '../ritual/ritual',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  //菜品详情页
  jj: function (e) {
    var pid = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../product/product?proId=' + pid + '&title=' + title,
    })
  },

  onReady: function () {
    //页面渲染完成
    wx.hideToast();
  },

  onShareAppMessage: function () {
    return {
      title: '餐饮版',
      desc: '餐饮版!',
      path: '/pages/index/index',
      success: function (res) {
        // 分享成功
      },
      fail: function (res) {
        // 分享失败
      }
    }
  }
})
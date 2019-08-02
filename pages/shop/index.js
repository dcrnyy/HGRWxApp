const app = getApp()
const req = require('../../src/request.js')

Page({
  data: {
    goods_specification: '',	//规格--弃用
		goods_a_info: {},					//规格--弃用

    isload: true, //菜品加载状态
    info: null, //店铺信息
    shopid: "", //当前店铺id
    typeList: [], //分类和菜品
    guigeIsShow: false, //规格显示状态

    carIsShow: false, //是否显示购物车
    carList: [], //购物车
    totalNumber: 0, //购物车总数量
    totalPrice: 0, //购物车总价
    carButtonName: "请点菜品", //购物车按钮文字
    carButtonState: true, //购物车提交按钮状态
    submitIsLoading: false, //购物车按钮加载状态

  },
  onLoad: function(options) {
    var that = this;
    //debugger;
    //console.log(options);
    if (typeof(options) == "undefined" || typeof(options.id) == "undefined") {
      wx.switchTab({
        url: '../index/index',
      });
      return false;
    }
		that.data.shopid = options.id;
    this.getdata();
  },
  getdata: function() //获取数据
  {
    //debugger;
    var that = this;
		req.postapi("AppGetShopInfo", that.data.shopid, function(data) {
      //debugger;
      //console.log(data);
      var result = data.data;
      
      if (result.totalNumber > 0) {
        that.setData({
          carButtonName: "选好了",
          carButtonState: false,
          submitIsLoading: false
        });
      }
      else {
        that.setData({
          carButtonName: "请点菜品",
          carButtonState: true,
          submitIsLoading: false
        });
      }
      that.setData({
        info: result.shop,
        typeList: result.typeList,
        carList: result.carList,
        totalNumber: result.totalNumber,
        totalPrice: result.totalPrice,
        isload: false,
      });
    });

  },
  //获取购物车数据  暂时弃用
  getcardata: function() {
    var that = this;
    that.data.submitIsLoading=true;
    req.postapi("GetShopCarList", this.shopid, function(data) {
      //debugger;
      //console.log(data);
      var result = data.data;
      that.setData({
        carList: result.carList,
        totalNumber: result.totalNumber,
        totalPrice: result.totalPrice
      });
      if (result.totalNumber > 0){
        that.setData({
          carButtonName: "选好了",
          carButtonState: false,
          submitIsLoading:false
        });
      }
      else{
        that.setData({
          carButtonName: "请点菜品",
          carButtonState: true,
          submitIsLoading: false
        });
      }
      //console.log(that.carList);
    });
  },
  //电话
  call_phone_bind: function() {
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.dish_data.dish_info[0].dish_con_mobile
    });
  },
  //选好了
  selAddress: function(e) {
    var that = this;
    var len = e.currentTarget.dataset.id;

    wx.navigateTo({
			url: '/pages/order/seladdress?id=' + that.data.shopid,
    })
  },
  //删除购物车菜品
  cardelone: function(e) {
    var that = this;
    var id = e.currentTarget.id;
    var name = e.currentTarget.dataset.cname;
    wx.showModal({
      title: '提示',
      content: '你确定要删除 [' + name+'] 吗',
      success: function (res) {
        if (res.confirm) {
          req.postapi("ShopCarDel", id, function (data) {
            wx.showToast({
              title: '删除菜品成功',
              icon: 'success',
              duration: 1000
            })
          });
          

        }
      }
    });
  },

  //加减购物车
  carreduce: function(e) {
    wx.showToast({
      title: '选餐中',
      icon: 'loading',
      duration: 1000
    });
    var that = this;
  },
  //加减购物车
  caradd: function(e) {
    wx.showToast({
      title: '选餐中',
      icon: 'loading',
      duration: 1000
    });
    var that = this;
    var param = {
      shopid: that.shopid,
      foodid: e.currentTarget.dataset.fid,
      carid: e.currentTarget.dataset.cid,
      number: e.currentTarget.dataset.num,
    };
    req.postapi("AddShopCar", param, function(data) {
      //debugger;
      //console.log(data);
      //that.getcardata();
      that.getdata();
    });

  },
  //清空购物车
  cartdelall: function() {
    var that = this;
    wx.showModal({
      title: '提示',
      content: "确认要清空购物车吗",
      confirmText: "确定",
      cancelText: "取消",
      success: function(res) {
        if (res.confirm == true) {
          wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 10000
          });


        }
      }
    });

  },
  //显示隐藏购物车
  carListShow: function() {
    //debugger;
    var that = this;
    console.log(that.data.carList);
    if (that.data.carIsShow == true) {
      that.setData({
        carIsShow: false
      });
    } else {
      that.setData({
        carIsShow: true
      });
    }
  },

  //单击分类
  tapClassify: function(e) {
    var id = e.target.dataset.id;
    var seid = e.target.dataset.seid;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function() {
      self.setData({
        classifySeleted: seid
      });
    }, 100);
  },
  //菜品滚动
  onfoodsScroll: function(e) {
    //console.log("滚动");
    var that = this
    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = that.data.typeList.length;
    that.data.typeList.forEach(function(classify, i) {
      var _h = 70 + classify.foodList.length * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },


  //下拉刷新
  onPullDownRefresh: function() {
    var that = this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    //that.onShow();
    that.getdata();
    setTimeout(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh();
    }, 1000)
  },
})
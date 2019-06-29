var tokenkey = "token";
//api接口地址
var apiurl = "http://localhost:63102/api";



//post提交
function postapi(code, params, success) {

  //接口数据格式
  var param = {
    Token: gettoken(),
    Function: code,
    Data: JSON.stringify(params),
  };

  wx.request({
    url: apiurl,
    data: params,
    dataType:'json',
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function (res) {
      console.log(d);
      if(res.statusCode!=200)
      {

      }
      else
      {
        var data = res.data;
        success(data);
      }
      

    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })

}

function gettoken() {
  try {
    var token = wx.getStorageSync(tokenkey);
    if (token) {
      return token;
    }
    return null;
  } catch (e) {
    return null;
  }
}

function settoken(token) {
  wx.setStorage({
    key: tokenkey,
    data: token,
  })
}

module.exports = {
  gettoken,
  settoken,
  postapi,
  test,
}
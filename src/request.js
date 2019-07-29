const app = getApp();
var tokenkey = "token";

//api接口地址
var apiurl = "http://localhost:63102/api";


function test(a, b) {
  console.log(a);
  console.log(b);
  if (typeof(b) == "undefined") {
    console.log(typeof(b));
  }
}



//post提交
function postapi(code, params, success, token) {
  if (typeof(token) == "undefined") {
    token = app.gettoken();
  }

  //接口数据格式
  var param = {
    Token: token,
    Function: code,
    Data: JSON.stringify(params),
  };
  // console.log("发送：");
  // console.log(param);
  wx.request({
    url: apiurl,
    data: param,
    dataType: 'json',
    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    // header: {}, // 设置请求的 header
    success: function(res) {
      // console.log(code + "返回：");
      // console.log(res);
      //debugger;
      var data = res.data;
      if(data.code!=0){
        console.log(code+"：返回");
        console.log(data);
      }

      if (typeof(success) == "function") {
        success(data);
      }



    },
    fail: function() {
      // fail
    },
    complete: function() {
      // complete
    }
  })

}






module.exports = {
  test,
  postapi,
}
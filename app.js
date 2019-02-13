//app.js
//index.js
const util = require('utils/util.js');
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          var that =this;
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wxd13a7000a0d1c67b',
              secret: '77888ae73ae4e32ecf778449f909f70d',
              js_code: res.code,
              grant_type: 'authorization_code'
            },
            success: function (response) {
              console.log(response.data.openid);
              //询问用户是否授权是wx.getUserInfo发起的
              if (response.data.openid != null && response.data.openid != undefined){
                that.globalData.openid = response.data.openid;
                that.getUser();
              }
            },
            fail: function(error){
              console.log('获取openid失败');
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getUser: function(){
    var that = this;
    wx.login({
      success: res=>{
        if(res.code){
          var url = that.globalData.domain + 'User/get_user';
          var params = {code: res.code, openid:that.globalData.openid};
          util.wxRequest(url, params, data => {
            if( data.status == 200 ){
                that.globalData.userInfo=data.data;
                if(data.data.nick_name){
                  that.globalData.login = true;
                }
            } else if (data.status == 400){
                that.register();
            }else{
              that.globalData.login = false;
              wx.showToast({
                title:data.msg,
                icon:none,
                duration:2000
              })
            }
          }, data => { }, data => { });
        }else{
          console.log('error');
        }
      }
    })
  },
  register: function(){
    var url = this.globalData.domain + 'User/register';
    var openid = this.globalData.openid;
    var params = { openid: openid};
    util.wxRequest(url, params, data => {
      if( data.status == 200 ){
        this.globalData.userInfo = data.data
      }
    }, data => { }, data => { });
  },
  globalData: {
    domain:'http://127.0.0.1/legou/public/index.php/api/',
    userInfo: null,
    openid:'',
    login:false,
    cartIds:'',
    goodsTotalPrice:0.0,
    wxData:[],
    order:[]
  }
})
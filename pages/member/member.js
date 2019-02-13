//index.js
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login:false
  },

  login: function(e){
    console.log(e);
    var that = this;
    wx.login({
      success: res => {
        if (res.code) {
          var url = app.globalData.domain + 'User/get_user';
          var params = { 
            code: res.code, 
            openid: app.globalData.openid, 
            nick_name:e.detail.userInfo.nickName,
            head_src: e.detail.userInfo.avatarUrl,
            };
          util.wxRequest(url, params, data => {
            if (data.status == 200) {
              app.globalData.userInfo = data.data;
              app.globalData.login = true; 
              this.setData({ login:true });
              wx.showToast({
                title: '登录成功！',
                icon: 'success',
                duration: 2000
              })
            } else {
              app.globalData.login = false;
              wx.showToast({
                title: data.msg,
                icon: none,
                duration: 2000
              })
            }
          }, data => { }, data => { });
        } else {
          console.log('error');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  navToCollect:function(){
    wx.navigateTo({
      url: '../collect/collect'
    })
  },
  navToAddress:function(){
    wx.navigateTo({
      url: '../address/list/list'
    })
  },
  navToOrderList: function () {
    wx.navigateTo({
      url: '../order/list/list'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
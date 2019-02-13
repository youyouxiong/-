const util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shr_name:'',
    mobile:'',
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  getshr:function(e){
    this.setData({shr_name: e.detail.value});
  },

  getmobile: function (e) {
    this.setData({ mobile: e.detail.value });
  },

  getaddress: function (e) {
    this.setData({ address: e.detail.value });
  },

  submit: function () {
    var shr_name = this.data.shr_name;
    var mobile = this.data.mobile;
    var address = this.data.address;
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Address/addAddress';
    var params = { shr_name: shr_name, mobile: mobile, address:address, openid: openid, token: token };
    util.wxRequest(url, params, data => {
      if (data.code == 200) {
        wx.showToast({
          title: data.msg,
          icon: 'success'
        });
        wx.navigateBack();
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'success'
        })
      }
    }, data => { }, data => { });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
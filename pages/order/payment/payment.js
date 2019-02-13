const util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxData: [],
    order: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      wxData:app.globalData.wxData,
      order: app.globalData.order
    });
  },

  //发起微信支付
  wxpay: function (){
    var order = this.data.order;
    var orderId = this.data.order.id;
    var wxData = this.data.wxData;
    var timeStamp = wxData.timeStamp + '';
    var nonceStr = wxData.nonceStr + '';
    var wxpackage = wxData.package + '';
    var paySign = wxData.paySign + '';
    wx.requestPayment({
      'timeStamp': timeStamp,
      'nonceStr': nonceStr,
      'package': wxpackage,
      'signType': 'MD5',
      'paySign': paySign,
      'success': function (res) {
        wx.navigateTo({
          url: '../result/result?status=1&orderId=' + orderId,
        })
      },
      'fail': function (res) {
        wx.navigateTo({
          url: '../result/result?status=0&orderId=' + orderId,
        })
      }
    })
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
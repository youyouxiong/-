const util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    shr_name:'',
    mobile:'',
    address:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({id:options.id});
    this.getAddress(options.id);
  },
  getshr: function (e) {
    this.setData({ shr_name: e.detail.value });
  },

  getmobile: function (e) {
    this.setData({ mobile: e.detail.value });
  },

  getaddress: function (e) {
    this.setData({ address: e.detail.value });
  },
  getAddress: function (id){
    var id = id;
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Address/getOneAddress';
    var params = { id: id, openid: openid, token: token };
    util.wxRequest(url, params, data => {
      console.log(data.data);
      if (data.code == 200) {
        this.setData({
          shr_name:data.data.shr_name,
          mobile:data.data.phone,
          address:data.data.address
        });
        wx.showToast({
          title: data.msg,
          icon: 'success'
        });
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'success'
        })
      }
    }, data => { }, data => { });
  },

  submit: function () {
    var shr_name = this.data.shr_name;
    var mobile = this.data.mobile;
    var address = this.data.address;
    var id = this.data.id;
    console.log(id);
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Address/updateAddress';
    var params = { id:id, shr_name: shr_name, mobile: mobile, address: address, openid: openid, token: token };
    util.wxRequest(url, params, data => {
      if (data.code == 200) {
        wx.showToast({
          title: data.msg,
          icon: 'success'
        });
        wx.navigateBack();
      } else {
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
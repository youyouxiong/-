// pages/address/list/list.js
const util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress();
  },

  getAddress:function(){
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Address/getAddress';
    var params = {openid: openid, token: token };
    util.wxRequest(url, params, data => {
      if (data.code == 200) {
        console.log(data.data);
        this.setData({address:data.data});
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }, data => { }, data => { });
  },

  navToAddAddress:function(){
    wx.navigateTo({
      url: '../add/add',
    })
  },

  navToEditAddress: function (e) {
    var index = e.currentTarget.dataset.index;
    var addressId = this.data.address[index].id;//获取到地址的id
    wx.navigateTo({
      url: '../edit/edit?id=' + addressId
    })
  },



  //设置默认地址
  setDeafult:function(e){
    var index = e.currentTarget.dataset.index;
    var addressId = this.data.address[index].id;//获取到地址的id
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Address/setDeafult';
    var params = { addressId: addressId, openid: openid, token: token };
    util.wxRequest(url, params, data => {
      if (data.code == 200) {
        wx.showToast({
          title: data.msg,
          icon: 'success'
        });
        this.getAddress();
      } else {
        wx.showToast({
          title: data.msg,
          icon: 'none'
        });
      }
    }, data => { }, data => { });
  },

  //取消/删除收货地址记录
  delAddress: function (e) {
    var index = e.currentTarget.dataset.index;
    var address = this.data.address;
    var addressId = address[index].id;//获取到地址的id
    address.splice(index, 1);
    this.setData({
      address: address
    });
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Address/delAddress';
    var params = { addressId: addressId, openid: openid, token: token };
    util.wxRequest(url, params, data => {
      if (data.code == 200) {
        wx.showToast({
          title: data.msg,
          icon: 'success'
        });
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'none'
        });
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
    this.getAddress();
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
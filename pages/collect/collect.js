// pages/collect/collect.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:1,
    goodsCollect:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCollectGoods(1);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  //取消/删除收藏的商品记录
  delCollectGoods:function(e){
    var index = e.currentTarget.dataset.index;
    var goodsCollect = this.data.goodsCollect;
    var goodsId = goodsCollect[index].id;//获取到商品的id
    goodsCollect.splice(index, 1);
    this.setData({
      goodsCollect: goodsCollect
    });
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Goods/delCollectGoods';
    var params = { goodsId: goodsId, openid: openid, token: token };
    util.wxRequest(url, params, data => {
      console.log(data);
      if (data.code == 201) {
        this.setData({
          dataEmpty: true
        });
      }
    }, data => { }, data => { });
  },

  getCollectGoods:function(page){
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Goods/getCollectGoods';
    var params = { page:page, openid: openid, token: token };
    util.wxRequest(url, params, data => {
      if(data.code == 200){
        var goodsCollect = this.data.goodsCollect;
        var newGoodsCollect = data.data;
        if(newGoodsCollect.length > 0){
          for (var i in newGoodsCollect){
            goodsCollect.push(newGoodsCollect[i]);
          }
          this.setData({ goodsCollect: goodsCollect});
        }else{
          wx.showToast({
            title: '没有更多数据了',
            icon: 'none',
            duration: 2000
          })
        }
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }, data => { }, data => { });
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
    wx.showToast({
      Title:'正在刷新···',
      Icon:'loading'
    });
    this.setData({
      page: 1,
      goodsCollect: []
    });
    this.getCollectGoods(1);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.getCollectGoods(++this.data.page);
    wx.showToast({
      Title: '正在加载···',
      Icon: 'loading'
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
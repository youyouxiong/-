// pages/goodslist/goodslist.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodslist: [],
    cates:[],
    cid:0,
    description:'',
    page:1,
    empty:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid=options.cid;
    this.setData({ cid:cid });
    this.getCates(cid);
    this.getGoods(cid, 1);
  },

  //获取同级分类
  getCates: function (cid) {
    var url = app.globalData.domain + 'cate/get_cates';
    var params = { cid:cid };
    util.wxRequest(url, params, data => {
      // console.log(data);
      this.setData({
        cates: data.cates,
        description: data.description
      })
    }, data => { }, data => { });
  },

  //获取商品列表
  getGoods: function (cid, page) {
    var url = app.globalData.domain + 'goods/get_goods';
    var params = { cid: cid, page: page};
    util.wxRequest(url, params, data => {
      // console.log(data);
      var goodslist=this.data.goodslist;
      console.log(goodslist);
      var newgoodslist = data.goods.data;
      if (newgoodslist.length > 0){
        for( var i in newgoodslist ){
          goodslist.push(newgoodslist[i]);
        }
        this.setData({ goodslist: goodslist, empty:false });
      } else{
        if( this.data.goodslist.length > 0 ){
          this.setData({ empty: false });
        }else{
          this.setData({ empty: true });
        }
        wx.showToast({
          title: '没有更多数据',
          icon: 'none'
        });
      }
    }, data => { }, data => { });
  },

  //跳转到商品详情页面
  showGoods: function(e) {
    var id=e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods/goods?id='+id,
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '正在刷新数据...',
      icon: 'loading'
    });
    this.setData({ goodslist:[], page:1 });
    this.getGoods(this.data.cid, 1);
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '正在加载数据...',
      icon: 'loading'
    });
    this.getGoods(this.data.cid, ++this.data.page);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
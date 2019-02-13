const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      // 'http://www.tongpankt.com/images/goods/s1.jpg',
      // 'http://www.tongpankt.com/images/goods/s2.jpg',
      // 'http://www.tongpankt.com/images/goods/s3.jpg',
      // 'http://www.tongpankt.com/images/goods/s4.jpg',
      // 'http://www.tongpankt.com/images/goods/s5.jpg',
    ],
    goodsInfo: [],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    minusStatus: '' ,
    num: 1,
    currentab:0,
    buyHeight:51,
    scrollHeight:0,
    collectStatus:-1,//商品收藏状态
    goodsId:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var that=this;
    that.doCollect(id);
    wx.getSystemInfo({
      success: function(res) {
        var screenHeight = res.windowHeight;
        var scrollHeight = screenHeight - that.data.buyHeight;
        that.setData({
          scrollHeight: scrollHeight,
          goodsId: id
        });
      },
    });
    this.getGoodsInfo(id);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //获取商品基本信息和商品相册
  getGoodsInfo: function (id) {
    var url = app.globalData.domain + 'Goods/get_goods_info';
    var params = { id: id };
    util.wxRequest(url, params, data => {
      console.log(data);
      this.setData({
        goodsInfo: data.goodsInfo,
        imgUrls: data.goodsImgs
      })
    }, data => { }, data => { });
  },
  //点击切换标题样式
  clicktab:function(e){
    if (this.data.currentab == e.target.dataset.current){
      return false;
    }else{
      this.setData({
        currentab: e.target.dataset.current
      });
    }
  },

  // 点击减购买量
  bindMinus: function(){
    var num=this.data.num;
    var minusStatus;
    if(num > 1){
      num --;
    }
    if(num <= 1){
      minusStatus='disabled';
    }else{
      minusStatus = '';
    }
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  // 点击增加购买量
  bindPlus:function(){
    var num = this.data.num;
    var minusStatus;
    num++;
    if (num <= 1) {
      minusStatus = 'disabled';
    } else {
      minusStatus = '';
    }
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },

  // 手动输入购买量
  bindmanual:function(e){
    var num=e.detail.value;
    this.setData({
      num:num
    });
  },

  //添加或者取消收藏商品
  addcollect:function(e){
    var goodsId = e.currentTarget.dataset.id;
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Goods/addCollect';
    var params = { goodsId: goodsId, openid: openid, token: token};
    util.wxRequest(url, params, data => {
      if(data.code == 200){
        this.setData({ collectStatus:data.status })
        wx.showToast({
          title: data.msg,
          icon: 'success',
          duration:2000
        })
      }
    }, data => { }, data => { });
  },

  //加入购物车
  addToCart:function(){
    var goodsId = this.data.goodsId;
    var goodsNum = this.data.num;
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Cart/addToCart';
    var params = { goodsId: goodsId, openid: openid, goodsNum:goodsNum, token: token };
    util.wxRequest(url, params, data => {
      wx.showToast({
        title: data.msg,
        icon: 'success',
        duration: 2000
      })
    }, data => { }, data => { });
  },

  //立即购买
  buyNow:function(){
    var goodsId = this.data.goodsId;
    var goodsNum = this.data.num;
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Cart/checkCart';
    var params = { goodsId: goodsId, openid: openid, goodsNum: goodsNum, token: token };
    util.wxRequest(url, params, data => {
      if(data.code == 200){
        wx.switchTab({
          url: '../cart/cart',
        })
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }, data => { }, data => { });
  },

  //打开商品的时候判断商品的收藏状态
  doCollect:function(id){
    var goodsId = id;
    var openid = app.globalData.openid;
    var url = app.globalData.domain + 'Goods/doCollect';
    var params = { goodsId: goodsId, openid: openid};
    util.wxRequest(url, params, data => {
      this.setData({ collectStatus: data.status })
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
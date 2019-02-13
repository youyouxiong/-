// pages/cart/cart.js
const util = require('../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartData:[],
    minusStatus: '',
    num: 1,
    buyHeight: 51,
    scrollHeight: 0,
    dataEmpty:true,
    checkAll:true,
    goodsTotalPrice:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        var screenHeight = res.windowHeight;
        var scrollHeight = screenHeight - that.data.buyHeight;
        that.setData({
          scrollHeight: scrollHeight,
        });
      },
    });
  },

  //立即结算处理
  buyNow: function (){
    var cartData = this.data.cartData;
    var cartIds = [];
    if (cartData.length > 0){
      for (var i = 0; i < cartData.length; i++){
        if (cartData[i].selected == 1){
          cartIds.push(cartData[i].id);
        }
      }
      cartIds = cartIds.join(',');
      app.globalData.cartIds = cartIds;
      app.globalData.goodsTotalPrice = this.data.goodsTotalPrice;
      //判断用户有没有默认收货地址
      var openid = app.globalData.openid;
      var token = app.globalData.userInfo.token;
      var url = app.globalData.domain + 'Address/deafultAddress';
      var params = {openid: openid, token: token };
      util.wxRequest(url, params, data => {
        if(data.code == 200){
          wx.navigateTo({
            url: '../order/submit/submit',
          })
        } else if (data.code == 401){
          wx.navigateTo({
            url: '../address/add/add',
          })
        }else{
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 2000
          })
        }
      }, data => { }, data => { });
    }else{
      wx.showToast({
        title: '至少选择一个商品',
        icon:'none',
        duration:2000
      })
    }
  },

  // 按钮的选中状态
  selectBox: function(e){
    var index = e.currentTarget.dataset.index;
    var cartData = this.data.cartData;
    if (cartData[index].selected == 1){
      cartData[index].selected = 0;
    }else{
      cartData[index].selected = 1;
    }
    this.setData({
      cartData: cartData
    });
    //修改数据表状态值
    this.updateSelected(cartData[index].id, cartData[index].selected);
    this.goodsTotalPrice();
  },

  //修改数据表状态值
  updateSelected: function (goodsId, selected){
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Cart/updateSelected';
    var params = { goodsId: goodsId, selected: selected, openid: openid, token: token };
    util.wxRequest(url, params, data => {
      if(data.selectAll == 1){
        this.setData({
          checkAll: true
        });
      }else{
        this.setData({
          checkAll: false
        });
      }
    }, data => { }, data => { });
  },

  //计算商品总价
  goodsTotalPrice: function(){
    var cartData = this.data.cartData;
    console.log(cartData);
    var goodsTotalPrice = 0;
    for(var i=0; i < cartData.length; i++){
      if(cartData[i].selected == 1 ){
        goodsTotalPrice += cartData[i].shop_price * cartData[i].goods_num;
      }
    }
    this.setData({
      goodsTotalPrice: goodsTotalPrice
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.firstGoodsTotalPrice();
  },

  // 初次打开购物车计算商品总价
  firstGoodsTotalPrice: function(){
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Cart/firstGoodsTotalPrice';
    var params = { openid: openid, token: token };
    util.wxRequest(url, params, data => {
      if(data.code == 200){
        this.setData({
          goodsTotalPrice: data.goodsTotalPrice
        });
      }
    }, data => { }, data => { });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getCart();
  },

  //全选反选
  checkAll: function(){
    var checkAll = !this.data.checkAll;
    var cartData = this.data.cartData;

    if (checkAll){
      for(var i=0; i<cartData.length; i++){
        cartData[i].selected = 1;
      }
    }else{
      for (var i = 0; i < cartData.length; i++) {
        cartData[i].selected = 0;
      }
    }
    this.setData({
      cartData:cartData,
      checkAll:checkAll
    });
    this.updateCheckAll();
    this.goodsTotalPrice();
  },

  //全选反选操作数据表
  updateCheckAll: function () {
    var checkAll = this.data.checkAll;
    var selected = 1;
    if (!checkAll){
      selected = 0;
    }
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Cart/updateCheckAll';
    var params = {selected: selected, openid: openid, token: token };
    util.wxRequest(url, params, data => {
    }, data => { }, data => { });
  },

  bindmanual: function(e){
    var index = e.currentTarget.dataset.index;
    var goods_num = e.detail.value;
    var cartData = this.data.cartData;
    cartData[index].goods_num = goods_num;
    this.setData({
      cartData: cartData
    });
    this.updateGoodsNum(cartData[index].goods_id, goods_num);
    if (cartData[index].selected == 1){
      this.goodsTotalPrice();
    }
  },

  bindMinus: function(e){
    var index = e.currentTarget.dataset.index;
    var cartData = this.data.cartData;
    var goodsNum = cartData[index].goods_num;
    if (goodsNum > 1){
      goodsNum = goodsNum-1;
    }
    cartData[index].goods_num = goodsNum;  
    this.setData({
      cartData: cartData
    });
    this.updateGoodsNum(cartData[index].goods_id, goodsNum);
    if (cartData[index].selected == 1) {
      this.goodsTotalPrice();
    }
  },

  bindPlus: function (e) {
    var index = e.currentTarget.dataset.index;
    var cartData = this.data.cartData;
    var goodsNum = cartData[index].goods_num + 1;
    cartData[index].goods_num = goodsNum;
    this.setData({
      cartData: cartData
    });
    this.updateGoodsNum(cartData[index].goods_id, goodsNum);
    if (cartData[index].selected == 1) {
      this.goodsTotalPrice();
    }
  },

  //修改购物车商品数量
  updateGoodsNum(goodsId, goodsNum){
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Cart/updateGoodsNum';
    var params = { goodsId:goodsId, goodsNum:goodsNum, openid: openid, token: token };
    util.wxRequest(url, params, data => {
    }, data => { }, data => { });
  },

  //获取购物车数据
  getCart: function(){
    var url = app.globalData.domain + 'Cart/cartList';
    var params = { openid: app.globalData.openid, token: app.globalData.userInfo.token};
    util.wxRequest(url, params, data => {
      console.log(data);
      if(data.code == 200){
        this.setData({
          cartData : data.data,
          dataEmpty : false
        })
      }
    }, data => { }, data => { });
    this.goodsTotalPrice();
  },

  //
  delCartGoods: function(e){
    var index = e.currentTarget.dataset.index;
    var cartData = this.data.cartData;
    var goodsId =  cartData[index].goods_id;
    cartData.splice(index, 1);
    this.setData({
      cartData: cartData
    });
    var openid = app.globalData.openid;
    var token = app.globalData.userInfo.token;
    var url = app.globalData.domain + 'Cart/delCartGoods';
    var params = { goodsId: goodsId, openid: openid, token: token };
    util.wxRequest(url, params, data => {
      if(data.code == 201){
        this.setData({
          dataEmpty:true
        });
      }
    }, data => { }, data => { });
    this.goodsTotalPrice();
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
  
  //跳转到主页
  jumpIndex: function(){
    wx.switchTab({
      url: '../index/index'
    })
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
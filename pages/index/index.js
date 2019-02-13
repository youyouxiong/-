//index.js
const util=require('../../utils/util.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls2: [
      'http://www.tongpankt.com/images/a1.png',
      'http://www.tongpankt.com/images/a2.png'
    ],
    imgUrls: [],
    goodslist:[
      {
        thumb:"http://www.tongpankt.com/images/g1.png",
        title:"圆领T-Shirt",
        price:99,
        collect:0
      },
      {
        thumb: "http://www.tongpankt.com/images/g2.png",
        title: "蓝色条纹衬衫",
        price: 80,
        collect: 1
      },
      {
        thumb: "http://www.tongpankt.com/images/g3.png",
        title: "时尚花裙子",
        price: 200,
        collect: 1
      },
      {
        thumb: "http://www.tongpankt.com/images/g4.png",
        title: "绿色T-Shirt",
        price: 900,
        collect: 0
      }
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    // 请求banner数据
    var that=this
    // wx.request({
    //   url: 'http://127.0.0.1/legou/public/index.php/api/index/getBanners', 
    //   success: function (res) {
    //     // console.log(res.data)
    //     that.setData({
    //       imgUrls: res.data
    //     })
    //   },
    // })
    this.loadIndex();
  },
  //首页数据获取
  loadIndex:function(){
    var url = app.globalData.domain+'index/getBanners';
    var params={};
    util.wxRequest(url, params, data => {
      // console.log(data);
      this.setData({
          imgUrls: data
        })
     }, data => {}, data => {});
  }
})

// pages/newsDetail/newsDetail.js
var network = require('../../utils/network.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    newsObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.setData({
      id: id
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
    var that = this;
    that.getNewsById('正在加载数据...');
  },
  getNewsById: function (message) {
    var that = this;
    var data = {
      showapi_appid: '77349',
      showapi_sign: 'dbb68fdcae714f3e8e6bd22e4135ee3c',
      id: that.data.id,//传入ID
      needContent:1
    }
    network.requestLoading('http://route.showapi.com/109-35', data, message, function (res) {
      console.log('res', res);
      var newsObj = res.showapi_res_body.pagebean.contentlist[0];
      that.setData({
        newsObj: newsObj
      })
      console.log('newsObj',newsObj);
      // var contentlistTem = that.data.contentlist;
      // if (res.showapi_res_code == 0) {//易源接口返回标志,0为成功，其他为失败。
      //   if (that.data.page == 1) {
      //     contentlistTem = []
      //   }
      //   var contentlist = res.showapi_res_body.pagebean.contentlist;
      //   if (contentlist.length < that.data.pageSize) {
      //     that.setData({
      //       contentlist: contentlistTem.concat(contentlist),
      //       hasMoreData: false
      //     })
      //   } else {
      //     that.setData({
      //       contentlist: contentlistTem.concat(contentlist),
      //       hasMoreData: true,
      //       page: that.data.page + 1
      //     })
      //   }
      // } else {//失败
      //   wx.showToast({
      //     title: res.showapi_res_error,
      //   })
      // }
    }, function (res) {
      wx.showToast({
        title: '加载数据失败',
      })

    })
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
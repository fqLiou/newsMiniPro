//news.js
var util = require('../../utils/util.js')
var network = require('../../utils/network.js')
var root = getApp()

Page({
  data: {
    page: 1,
    pageSize: 10,
    hasMoreData: true,
    contentlist: [],
    modalHidden: true,
    modalNewsContent: {}
  },
  onLoad: function () {
    var that = this;
    that.getNewsList('正在加载数据...');
  },
  getNewsList: function (message) {
    var that = this;
    var data = {
      showapi_appid: '77349',
      showapi_sign: 'dbb68fdcae714f3e8e6bd22e4135ee3c',
      maxResult: '10',
      page: that.data.page,
      needContent:1
    }
    network.requestLoading('http://route.showapi.com/109-35', data, message, function (res) {
      console.log('res',res);
      var contentlistTem = that.data.contentlist;
      if (res.showapi_res_code == 0) {//易源接口返回标志,0为成功，其他为失败。
        if (that.data.page == 1) {
          contentlistTem = []
        }
        var contentlist = res.showapi_res_body.pagebean.contentlist;
        if (contentlist.length < that.data.pageSize) {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: false
          })
        } else {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: true,
            page: that.data.page + 1
          })
        }
      } else {//失败
        wx.showToast({
          title: res.showapi_res_error,
        })
      }
    }, function (res) {
      wx.showToast({
        title: '加载数据失败',
      })

    })
  },
  showNewsDetail: function(e){
    var that = this, index = Number(e.currentTarget.dataset.index), newsContentObj = that.data.contentlist[index];
    wx.navigateTo({
      url: '../newsDetail/newsDetail?newsContentObj=' + newsContentObj
    })
    console.log('newsContentObj', newsContentObj);
  },
  modalTap: function (e) {
    var that = this, index = Number(e.currentTarget.dataset.index);
    console.log('index', index);

    this.setData({
      // modalContent: that.data.data.hotnews[Number(e.currentTarget.dataset.index)],
      // newsDetail: that.contentList[index],
      modalNewsContent: that.data.contentlist[index],
      modalHidden: false
    })
    console.log('contentlist', that.data.contentlist[index]);
    // console.log('url', that.data.contentlist[index].imageurls[0].url);
  },
  modalHide: function(e) {
    this.setData({
      modalHidden: true
    })
  },
  // backIndex: function(e){
  //   var currentPages = getCurrentPages();
  //   console.log('currentPages', currentPages);
  //   wx.navigateBack({
  //     url:'./index/index'
  //   })
  // },
  onPullDownRefresh: function (){//下拉刷新数据
    this.data.page = 1
    this.getNewsList('正在刷新数据');
    setTimeout(function(){
      wx.stopPullDownRefresh();//停止当前页面下拉刷新
    },600);
  },
  onReachBottom: function (currentPage){//上拉触底
    if (this.data.hasMoreData) {
      this.getNewsList('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
    console.log('已经是底部了');
    // if (wx.pageScrollTo) {
    //   wx.pageScrollTo({
    //     scrollTop: 0
    //   })
    // } else {
    //   wx.showModal({
    //     title: '提示',
    //     content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
    //   })
    // }
  }
  // contentLimit: function(content) {
  //   return content.substr(20)
  // }
})

//app.js
// var news = require('./news.js');

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    // news
  },
  onShareAppMessage: function () {
    return {
      title: 'getNews小程序',
      desc: '一款轻松便捷的新闻小程序，getNews，即刻出发。',
      path: 'pages/news/news',
      imageUrl: 'images/share.jpg'
      // imageUrl: 'http://img.027cgb.com/608987/share.jpg'
    }
  }
})
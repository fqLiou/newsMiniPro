//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    welcome: "点击进入",
    "username": "liou",
    current:0,
    img: "http://tva4.sinaimg.cn/crop.0.0.1080.1080.180/0066Db0Pjw8erk3vg33raj30u00u0jt0.jpg"
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../news/news'
    })
  },
  onLoad: function () {
    console.log('Loaded')
  },
  onReady: function(){
    this.load();
  },
  load: function(){
    var n = 1;
    var timer = setInterval(() => {
      if (n == 6) {
        clearInterval(timer);
        wx.redirectTo({
          url: '../news/news'
        })
      }
      this.setData({
        current: this.data.current + 1
      });
      if (this.data.current > 3)
        this.setData({
          current: 0
        });
      n++;
    }, 300);
  }
})
      
//news.js
var util = require('../../utils/util.js')
var network = require('../../utils/network.js')
var root = getApp()

Page({
  data: {
    navTab: ["全部新闻", "国内", "国际", "体育", "国足", "科技", "游戏", "娱乐", "电视", "社会","女人","教育","综合体育"],
    channel:'',
    currentNavtab:0,
    page: 1,
    pageSize: 10,
    hasMoreData: true,
    contentlist: [],
    modalHidden: true,
    modalNewsContent: {},
    showTipFlag:!1,
    defaultSource:'',
    defaultThumb:''
  },
  onLoad: function (e) {
    var that = this, message = '正在加载数据...', channelName = '全部新闻', needReset = !1, isFromOtherTab = !1;
    that.getNewsListByTab(message, channelName, needReset, isFromOtherTab);
  },
  refresh: function () {//请求数据失败时，点击缺省页进行刷新
    var that = this, message = '正在加载数据...', channelName = '全部新闻', needReset = !0, isFromOtherTab = !0;
    that.getNewsListByTab(message, channelName, needReset, isFromOtherTab);    
  },
  showNewsDetail: function(e){//详情页面跳转
    var that = this, index = Number(e.currentTarget.dataset.index), id = that.data.contentlist[index].id;
    wx.navigateTo({
      url: '../newsDetail/newsDetail?id=' + id
    })
  },
  modalTap: function (e) {//模态框
    var that = this, index = Number(e.currentTarget.dataset.index);
    this.setData({
      modalNewsContent: that.data.contentlist[index],
      modalHidden: false
    })
    // console.log('contentlist', that.data.contentlist[index]);
  },
  modalHide: function (e) {//模态框
    this.setData({
      modalHidden: true
    })
  },
  switchTab: function (e) {//切换tab
    var that = this,
        index = e.currentTarget.dataset.idx,
        channelName,
        message = '正在加载数据...',
      channelArr = ["全部新闻", "国内最新", "国际最新", "体育最新", "国内足球最新", "科技最新", "游戏最新", "娱乐最新", "电视最新", "社会最新", "女人最新", "教育最新", "综合体育最新"];
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    switch(index) {
      case 0://全部新闻
        channelName = channelArr[0];
        that.setData({
          channel: channelName
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 1://国内最新
        channelName = channelArr[1];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 2://国际最新
        channelName = channelArr[2];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 3://体育最新
        channelName = channelArr[3];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 4://国内足球最新
        channelName = channelArr[4];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 5://科技最新
        channelName = channelArr[5];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 6://游戏最新
        channelName = channelArr[6];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 7://娱乐最新
        channelName = channelArr[7];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 8://电视最新
        channelName = channelArr[8];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 9://社会最新
        channelName = channelArr[9];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 10://女人最新
        channelName = channelArr[10];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 11://教育最新
        channelName = channelArr[11];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      case 12://综合体育最新
        channelName = channelArr[12];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
      default://默认全部新闻
        channelName = channelArr[0];
        that.setData({
          channel: channelName,
        })
        that.getNewsListByTab(message, channelName, !0, !0);
        break;
    }
  },
  getNewsListByTab: function (message, channelName, needReset, isFromOtherTab){
    //根据标签获取新闻列表：message为提示消息，channelName为标签，needReset为需要重置数据，isFromOtherTab为来自其他tab的点击（设置page）
    var that = this,
        data = {//lioufq
          showapi_appid: '77349',
          showapi_sign: 'dbb68fdcae714f3e8e6bd22e4135ee3c',
          maxResult: '10',
          page: that.data.page,
          needContent: 1
        }
      // data = {
      //   showapi_appid: '77805',//fqLiou
      //   showapi_sign: '3afe36bdf06c480693bb135eac25a23e',
      //   maxResult: '10',
      //   page: that.data.page,
      //   needContent: 1
      // }
    if (needReset) {
      that.resetData();
    }
    if (channelName !== '全部新闻'){
      data.channelName = channelName
    }
    if (isFromOtherTab){
      data.page = 1;
      that.setData({
        page: 1
      })
    }
    network.requestLoading('http://route.showapi.com/109-35', data, message, function (res) {
      console.log('after');
      console.log('res', res);
      var contentlistTem = that.data.contentlist;
      if (res.showapi_res_code == 0) {//易源接口返回标志,0为成功，其他为失败。
        if (that.data.page == 1) {
          contentlistTem = []
        }
        var contentlist = res.showapi_res_body.pagebean.contentlist,
          thumbnail,
          showTipFlag,
          defaultSource = '时事新闻', 
          defaultThumb = 'http://n.sinaimg.cn/translate/350/w175h175/20180831/o3r_-hinpmnq4885533.gif';
          // defaultThumb = 'http://img.027cgb.com/608987/logo.jpg';
        // contentlist.forEach(function (value, index, arr) {
        //   console.log('val', value.channelName);
        // });
        // console.log(contentlist.channelName);
        if (contentlist.length < that.data.pageSize) {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: false,
            defaultSource: defaultSource,
            defaultThumb: defaultThumb
          })
        } else {
          that.setData({
            contentlist: contentlistTem.concat(contentlist),
            hasMoreData: true,
            page: that.data.page + 1,
            defaultSource: defaultSource,
            defaultThumb: defaultThumb
          })
        }
      } else {//请求失败
        wx.showToast({
          title: res.showapi_res_error
        })
        that.setData({
          showTipFlag: !0 //展示提示内容
        })

      }
    }, function (res) {
      wx.showToast({
        title: '加载数据失败',
      })
    });

  },
  resetData:function(){//重置数据
    var that = this;
    that.setData({
      contentlist: []
    })
  },
  onPullDownRefresh: function () {//下拉刷新加载数据
    var that = this, channel = that.data.channel, needReset = !1, isFromOtherTab = !0;
    this.data.page = 1;
    console.log('top');
    this.getNewsListByTab('加载更多数据', channel, needReset, isFromOtherTab);
    setTimeout(function () {
      wx.stopPullDownRefresh();//停止当前页面下拉刷新
    }, 600);
  },
  onReachBottom: function () {//上拉触底加载更多数据
    var that = this, channel = that.data.channel, needReset = !1, isFromOtherTab = !1;
    if (this.data.hasMoreData) {
      this.getNewsListByTab('加载更多数据', channel, needReset, isFromOtherTab);
    } else {
      wx.showToast({
        title: '没有更多数据'
      })
    }  
  },
  scrollToTop:function(){//滚动置顶
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  }
})

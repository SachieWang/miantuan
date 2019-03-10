// pages/main/main.js
var Bmob = require('../../src/lib/app.js');
Bmob.initialize("306985f4142230ae3693817dea9a51ff", "86fd59adfde1752a45188179f7dbfd71");

const app = getApp()
const {
  $Toast
} = require('../../dist/base/index');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tip: "下拉加载",
    loading: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    current: 'homepage',
    homepagedot: false,
    homepagecount: 0,
    minedot: true,
    minecount: 0,
    imgUrls: [
      'http://bmob-cdn-23772.b0.upaiyun.com/2019/02/14/164c6a7c407322ce808a8b21627a1101.png',
      'http://bmob-cdn-23772.b0.upaiyun.com/2019/02/14/164c6a7c407322ce808a8b21627a1101.png',
      'http://bmob-cdn-23772.b0.upaiyun.com/2019/02/14/164c6a7c407322ce808a8b21627a1101.png'
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var query = Bmob.Query("zhiwei");
    query.include("company")
    query.find().then(res => {
      //console.log(res)
      that.data.list = res //生成初list
      //数据完备，重渲染
      if (that.data.list.length < 5) {
        that.setData({
          list: that.data.list,
          showlist: that.data.list.slice(0, that.data.list.length),
          tip: "已无更多",
          pos: that.data.list.length - 1
        })
      } else {
        that.setData({
          list: that.data.list,
          showlist: that.data.list.slice(0, 5),
          pos: 5
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this
    var query = Bmob.Query("zhiwei");
    query.include("company")
    query.find().then(res => {
      //console.log(res)
      that.data.list = res //生成初list
      //数据完备，重渲染
      if (that.data.list.length < 5) {
        that.setData({
          list: that.data.list,
          showlist: that.data.list.slice(0, that.data.list.length),
          tip: "已无更多",
          pos: that.data.list.length - 1
        })
      } else {
        that.setData({
          list: that.data.list,
          showlist: that.data.list.slice(0, 5),
          pos: 5
        })
      }
      wx.stopPullDownRefresh()
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  handleChange({
    detail
  }) {
    if (detail.key != this.data.current) {
      wx.redirectTo({
        url: '../' + detail.key + '/' + detail.key,
      })
    }
  },

  /**
   * 找工作
   */
  handleZgz() {
    console.log("zgz")
    wx.navigateTo({
      url: '../comlist/comlist',
    })
  },

  /**
   * 招人才
   */
  handleZrc() {
    console.log("zrc")
  },

  /**
   * 招聘会
   */
  handleZph() {
    console.log("zph")
  },

  /**
   * 职场资讯
   */
  handleZczx() {
    console.log("zczx")
    var query = Bmob.Query("zhiwei");
    query.include("company")
    query.find().then(res => {
      console.log(res)
    });
  },

  /**
   * 发布简历
   */
  handleFbjl() {
    if (!app.globalData.userInfo) {
      $Toast({
        content: '未登录',
        type: 'warning',
        duration: 0,
      });
      setTimeout(() => {
        wx.switchTab({
          url: '../mine/mine',
        })
        $Toast.hide();
      }, 500);
    } else {
      wx.navigateTo({
        url: '../edit/edit',
      })
    }
  },

  /**
   * 我的收藏
   */
  handleWdsc() {
    console.log("wdsc")
  },

  /**
   * 面试通知
   */
  handleMstz() {
    console.log("mstz")
  },

  /**
   * 发布职位
   */
  handleFbzw() {
    console.log("fbzw")
    if (!app.globalData.userInfo) {
      $Toast({
        content: '未登录',
        type: 'warning',
        duration: 0,
      });
      setTimeout(() => {
        wx.switchTab({
          url: '../mine/mine',
        })
        $Toast.hide();
      }, 500);
    } else if (!app.globalData.comLogin) {
      $Toast({
        content: '未登录企业账号',
        type: 'warning',
        duration: 0,
      });
      setTimeout(() => {
        wx.navigateTo({
          url: '../comenter/comenter?path=../zhiwei/zhiwei',
        })
        $Toast.hide();
      }, 500);
    } else {
      wx.navigateTo({
        url: '../zhiwei/zhiwei',
      })
    }
  },

  /**
   * 下拉加载
   */
  onReachBottom: function() {
    var num1 = this.data.list.length
    var num2 = this.data.showlist.length
    var that = this
    if (num2 < num1) {
      this.setData({
        tip: "加载中",
        loading: true,
      })
      this.data.showlist = this.data.showlist.concat(this.data.list.slice(that.data.pos, num1))
      this.setData({
        showlist: this.data.showlist,
        tip: "下拉加载",
        loading: false,
      })
    } else {
      this.setData({
        tip: "已无更多",
        loading: false,
      })
    }
  },

  /**
   * 详情
   */
  handleMore() {
    console.log("test")
    wx.navigateTo({
      url: '/pages/zdetails/zdetails',
    })
  }
})
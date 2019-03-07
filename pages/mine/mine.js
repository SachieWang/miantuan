// pages/mine/mine.js
var Bmob = require('../../src/lib/app.js');
Bmob.initialize("306985f4142230ae3693817dea9a51ff", "86fd59adfde1752a45188179f7dbfd71");
const {
  $Toast
} = require('../../dist/base/index');

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    current: 'mine',
    ballery: '1', //余额
    homepagedot: false,
    homepagecount: 0,
    minedot: true,
    minecount: 0,
    //logs: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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

  /**
   * 获取用户信息
   */
  getUserInfo: function(e) {
    if (!e.detail.userInfo) {
      console.log("获取失败")
      return false
    }
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    // 存储用户基本信息
    var status = wx.getStorageSync('status') || {}
    status = app.globalData
    wx.setStorageSync('status', status)
    //获取openid
    var code = wx.getStorageSync('status').code
    Bmob.User.requestOpenId(code).then(value => {
      wx.setStorageSync('openid', value.openid)
    })
    $Toast({
      content: '登陆中',
      type: 'loading',
      duration: 0,
    });
    setTimeout(() => {
      $Toast.hide();
      //判断是否为系统新用户
      var openid = wx.getStorageSync('openid')
      var query = Bmob.Query("individual")
      query.equalTo("openid", "==", openid)
      query.find().then(res => {
        if (res.length == 0) {
          //新个人用户,则注册信息
          query.set("UserID", status.userInfo.nickName)
          query.set("openid", openid)
          query.set("haveResume", false)
          query.set("openInfo", false)
          query.save().then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }, 3000);
  },

  handleChange({
    detail
  }) {
    if (detail.key != this.data.current)
      wx.redirectTo({
        url: '../' + detail.key + '/' + detail.key,
      })
  },
  document() {
    console.log("document")
  },
  eit() {
    console.log("eit")
  },
  group() {
    console.log("group")
  },
  remind() {
    console.log("remind")
  },
  edit() {
    wx.navigateTo({
      url: '../edit/edit',
    })
  },
  company() {
    console.log("company")
    if (!app.globalData.userInfo) {
      $Toast({
        content: '请先登陆平台个人账号',
        type: 'warning',
        duration: 0,
      });
      setTimeout(() => {
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
          url: '../comenter/comenter?path=../company/company',
        })
        $Toast.hide();
      }, 500);
    } else {
      wx.navigateTo({
        url: '../company/company',
      })
    }
  },
})
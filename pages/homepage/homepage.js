// pages/main/main.js
const app = getApp()
const {
  $Toast
} = require('../../dist/base/index');

Page({
  /**
   * 页面的初始数据
   */
  data: {
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

  handleChange({
    detail
  }) {
    if (detail.key != this.data.current) {
      wx.redirectTo({
        url: '../' + detail.key + '/' + detail.key,
      })
    }
  },
  handleZgz() {
    console.log("zgz")
    console.log(app.globalData)
  },
  handleZrc() {
    console.log("zrc")
  },
  handleZph() {
    console.log("zph")
  },
  handleZczx() {
    console.log("zczx")
  },
  handleFbjl() {
    if (!app.globalData.userInfo) {
      $Toast({
        content: '未登录',
        type: 'warning',
        duration: 0,
      });
      setTimeout(() => {
        wx.redirectTo({
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
  handleWdsc() {
    console.log("wdsc")
  },
  handleMstz() {
    console.log("mstz")
  },
  handleFbzw() {
    console.log("fbzw")
    if (!app.globalData.comLogin) {
      $Toast({
        content: '未登录企业账号',
        type: 'warning',
        duration: 0,
      });
      setTimeout(() => {
        wx.redirectTo({
          url: '../comenter/comenter',
        })
        $Toast.hide();
      }, 500);
    } else {
      wx.navigateTo({
        url: '../edit/edit',
      })
    }
  },

})
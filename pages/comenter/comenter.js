// pages/comenter/comenter.js
const { $Toast } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://bmob-cdn-23772.b0.upaiyun.com/2019/02/14/164c6a7c407322ce808a8b21627a1101.png',
      'http://bmob-cdn-23772.b0.upaiyun.com/2019/02/14/164c6a7c407322ce808a8b21627a1101.png',
      'http://bmob-cdn-23772.b0.upaiyun.com/2019/02/14/164c6a7c407322ce808a8b21627a1101.png'
    ],
    value1: '',
    value2: '',
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

  handleValueChange(e) {
    if (e.currentTarget.id == "value1") {
      this.data.value1 = e.detail.detail.value
    } else if (e.currentTarget.id == "value2") {
      this.data.value2 = e.detail.detail.value
    }
  },
  handleLogin() {
    console.log("login")
    $Toast({
      content: '登陆成功',
      type: 'success',
      duration: 0,
    });
    setTimeout(() => {
      wx.redirectTo({
        url: '../company/company',
      })
      $Toast.hide();
    }, 300);
  },
  handleSignup() {
    console.log("signup")
    wx.redirectTo({
      url: '../signup/signup',
    })
  },
})
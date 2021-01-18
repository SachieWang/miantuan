// pages/comenter/comenter.js
var Bmob = require('../../lib/app.js');
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
    imgUrls: [
      'http://bmob-cdn-23772.b0.upaiyun.com/2019/02/14/164c6a7c407322ce808a8b21627a1101.png',
      'http://bmob-cdn-23772.b0.upaiyun.com/2019/02/14/164c6a7c407322ce808a8b21627a1101.png',
      'http://bmob-cdn-23772.b0.upaiyun.com/2019/02/14/164c6a7c407322ce808a8b21627a1101.png'
    ],
    value1: '',
    value2: '',
    value3: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    this.setData({
      url: options.path
    })
    var that = this
    // var name = wx.getStorageSync("status").userInfo.nickName
    var name = wx.getStorageSync('openid');
    //查询是否已注册
    var query = Bmob.Query("company");
    query.equalTo("openid", "==", name)
    query.find().then(res => {
      console.log(res)
      if (res.length == 0) {
        $Toast({
          content: '您尚未注册企业账号',
          type: 'warning',
          duration: 0,
        });
        setTimeout(() => {
          $Toast.hide();
        }, 300);
      } else {
        that.setData({
          value1: res[0].username
        })
      }
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
    // var that = this;
    // // var name = wx.getStorageSync("status").userInfo.nickName;
    // var name = wx.getStorageSync('openid');
    // //查询是否已注册
    // var query = Bmob.Query("company");
    // query.equalTo("openid", "==", name)
    // query.find().then(res => {
    //   console.log(res)
    //   if (res.length == 0) {
    //     console.log("test")
    //     $Toast({
    //       content: '您尚未注册企业账号',
    //       type: 'warning',
    //       duration: 0,
    //     });
    //     setTimeout(() => {
    //       $Toast.hide();
    //     }, 300);
    //   } else {
    //     that.setData({
    //       value1: res[0].username
    //     })
    //   }
    // })
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

  },

  /**
   * 输入框数值改变
   */
  handleValueChange(e) {
    if (e.currentTarget.id == "value1") {
      this.data.value1 = e.detail.detail.value
    } else if (e.currentTarget.id == "value2") {
      this.data.value2 = e.detail.detail.value
    }
  },

  /**
   * 登陆
   */
  handleLogin() {
    console.log("login")
    var that = this
    var name = wx.getStorageSync("status").userInfo.nickName
    //查询密码
    var query = Bmob.Query("company");
    query.equalTo("username", "==", that.data.value1)
    query.find().then(res => {
      console.log(res)
      if (that.data.value2 == res[0].password) {
        app.globalData.comLogin = true
        $Toast({
          content: '登陆成功',
          type: 'success',
          duration: 0,
        });
        setTimeout(() => {
          wx.redirectTo({
            url: that.data.url,
          })
          $Toast.hide();
        }, 300);
      } else {
        $Toast({
          content: '密码错误',
          type: 'error',
          duration: 0,
        });
        setTimeout(() => {
          $Toast.hide();
        }, 300);
      }
    })

  },

  /**
   * 注册
   */
  handleSignup() {
    console.log("signup")
    wx.navigateTo({
      url: '../signup/signup',
    })
  }
})
// pages/company/company.js
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var openid = wx.getStorageSync("openid")
    var that = this
    var query = Bmob.Query("zhiwei");
    query.include("company")
    query.equalTo("openid", "==", openid)
    query.find().then(res => {
      //console.log(res)
      that.data.list = res //生成初list
      //数据完备，重渲染
      that.setData({
        list: that.data.list,
        logo: that.data.list[0].company.logo,
        comname: that.data.list[0].company.comname,
        adress: that.data.list[0].company.adress,
      })
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
    var openid = wx.getStorageSync("openid")
    var that = this
    var query = Bmob.Query("zhiwei");
    query.include("company")
    query.equalTo("openid", "==", openid)
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

  handleinfoadmin() {
    wx.navigateTo({
      url: '../signup/signup',
    })
  }
})
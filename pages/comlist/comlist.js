// pages/comlist/comlist.js
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
    tip: "下拉加载",
    loading: false,
    showlist: []
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

  onReachBottom: function() {
    var num1 = this.data.list.length
    var num2 = this.data.showlist.length
    var that = this
    if (num2 < num1) {
      this.data.showlist = this.data.showlist.concat(this.data.list.slice(that.data.pos, num1))
      this.setData({
        tip: "加载中",
        loading: true,
      })
      $Toast({
        content: '加载中',
        type: 'loading',
        duration: 0,
      });
      setTimeout(() => {
        $Toast.hide();
        this.setData({
          showlist: this.data.showlist,
          tip: "下拉加载",
          loading: false,
        })
      }, 500);
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
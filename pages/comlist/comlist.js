// pages/comlist/comlist.js
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
    tip: "下拉加载",
    loading: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var query = Bmob.Query("zhiwei");
    query.find().then(res => {
      //console.log(res)
      that.data.list = res //生成初list
      //数据完备，重渲染
      that.setData({
        list: that.data.list
      })
      if (that.data.list.length < 5) {
        that.setData({
          tip: "已无更多"
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
    if (this.data.test.length <= 20) {
      var num = this.data.test.length
      for (var i = 0; i < 5; i++) {
        num = this.data.test.length
        this.data.test = this.data.test.concat([{
          content: num + 1,
          num: "num" + num + 1
        }])
      }
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
          test: this.data.test,
          tip: "下拉加载",
          loading: false,
        })
      }, 500);
    } else {
      this.setData({
        test: this.data.test,
        tip: "已无更多",
        loading: false,
      })
    }

  },
})
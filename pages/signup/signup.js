// pages/signup/signup.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['', '', ''],
    index1: -1,
    customItem: '全部',
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
    dizhi: '',
    value7: '',
    value8: '',
    value9: '',
    value10: '',
    logoimg: "https://i.loli.net/2017/08/21/599a521472424.jpg",
    infoimg: "https://i.loli.net/2017/08/21/599a521472424.jpg",
    cominfo: {},
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

  /**
   * 注册
   */
  handleSignup() {
    var that = this
    var status = wx.getStorageSync('status')
    //生成注册信息对象体
    this.data.cominfo.region = this.data.region[0] + ',' + this.data.region[1] + ',' + this.data.region[2]
    this.data.cominfo.v1 = this.data.value1
    this.data.cominfo.v2 = this.data.value2
    this.data.cominfo.v3 = this.data.value3
    this.data.cominfo.v4 = this.data.value4
    this.data.cominfo.v5 = this.data.value5
    this.data.cominfo.v6 = this.data.value6
    this.data.cominfo.dizhi = this.data.dizhi
    this.data.cominfo.v7 = this.data.value7
    this.data.cominfo.v8 = this.data.value8
    this.data.cominfo.v9 = this.data.value9
    this.data.cominfo.v10 = this.data.value10
    this.data.cominfo.logoimg = this.data.logoimg
    this.data.cominfo.infoimg = this.data.infoimg
    //判断是否已有企业信息
    var query = Bmob.Query('company');
    query.equalTo("UserID", "==", status.userInfo.nickName)
    query.find().then(res => {
      if (res.length == 0) {
        //非已有则存入
        query.set("UserID", status.userInfo.nickName)
        query.set("content", this.data.cominfo)
        query.save().then(res => {
          /*that.setData({
            haveResume: true,
          })
          query = Bmob.Query('individual')
          query.equalTo("UserID", "==", status.userInfo.nickName)
          query.find().then(res => {
            query.get(res[0].objectId).then(res => {
              res.set('haveResume', true)
              res.save()
            }).catch(err => {
              console.log(err)
            })
          })*/
        }).catch(err => {
          console.log(err)
        })
      }
    });
  },

  /**
   * 监听反馈输入框值改动
   */
  handleValueChange(e) {
    if (e.currentTarget.id == "value1") {
      this.data.value1 = e.detail.detail.value
    } else if (e.currentTarget.id == "value2") {
      this.data.value2 = e.detail.detail.value
    } else if (e.currentTarget.id == "value3") {
      this.data.value3 = e.detail.detail.value
    } else if (e.currentTarget.id == "value4") {
      this.data.value4 = e.detail.detail.value
    } else if (e.currentTarget.id == "value5") {
      this.data.value5 = e.detail.detail.value
    } else if (e.currentTarget.id == "value6") {
      this.data.value6 = e.detail.detail.value
    } else if (e.currentTarget.id == "value7") {
      this.data.value7 = e.detail.detail.value
    } else if (e.currentTarget.id == "value8") {
      this.data.value8 = e.detail.detail.value
    } else if (e.currentTarget.id == "value9") {
      this.data.value9 = e.detail.detail.value
    } else if (e.currentTarget.id == "value10") {
      this.data.value10 = e.detail.detail.value
    } else if (e.currentTarget.id == "dizhi") {
      this.data.dizhi = e.detail.detail.value
    }
  },

  /**
   * 获取地理位置
   */
  handleGetregion() {
    wx.chooseLocation({
      success: res => {
        this.setData({
          dizhi: res.address,
        })
      }
    })
  },
})
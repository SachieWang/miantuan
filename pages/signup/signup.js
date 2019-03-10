// pages/signup/signup.js
var Bmob = require('../../src/lib/app.js');
Bmob.initialize("306985f4142230ae3693817dea9a51ff", "86fd59adfde1752a45188179f7dbfd71");
const {
  $Toast
} = require('../../dist/base/index');

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
    comsignup: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var name = wx.getStorageSync("status").userInfo.nickName
    //查询是否已注册
    var query = Bmob.Query("individual");
    query.equalTo("UserID", "==", name)
    query.find().then(res => {
      that.setData({
        comsignup: true,
      })
    })
    //加载企业注册信息
    query = Bmob.Query("company");
    query.equalTo("UserID", "==", name);
    query.find().then(res => {
      console.log(res)
      if (res.length == 1) {
        var reglist = [res[0].region.split(",")[0], res[0].region.split(",")[1], res[0].region.split(",")[2]]
        that.setData({
          value3: res[0].quality,
          value4: res[0].scale,
          value5: res[0].agent,
          value6: res[0].tellphone,
          dizhi: res[0].adress,
          value7: res[0].username,
          //value8: res[0].password,
          value10: res[0].introduce,
          logoimg: res[0].logo,
          infoimg: res[0].license,
          value1: res[0].comname,
          value2: res[0].industry,
          index1: 0,
          region: [].concat(reglist),
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

  /**
   * 注册
   */
  handleSignup() {
    var that = this
    var status = wx.getStorageSync('status')
    //判断是否已有企业信息
    var query = Bmob.Query('company');
    query.equalTo("UserID", "==", status.userInfo.nickName)
    query.find().then(res => {
      if (res.length == 0) {
        //非已有则存入
        query.set("UserID", status.userInfo.nickName)
        query.set("region", that.data.region[0] + ',' + that.data.region[1] + ',' + that.data.region[2])
        query.set("comname", this.data.value1)
        query.set("industry", this.data.value2)
        query.set("quality", this.data.value3)
        query.set("scale", this.data.value4)
        query.set("agent", this.data.value5)
        query.set("tellphone", this.data.value6)
        query.set("adress", this.data.dizhi)
        query.set("username", this.data.value7)
        query.set("password", this.data.value8)
        query.set("introduce", this.data.value10)
        query.set("logo", this.data.logoimg)
        query.set("license", this.data.infoimg)
        query.save().then(res => {
          if (res.objectId) {
            $Toast({
              content: '注册成功',
              type: 'success',
              duration: 0,
            });
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              })
              $Toast.hide();
            }, 300);
          }
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      } else {
        query.equalTo("UserID", "==", status.userInfo.nickName)
        query.find().then(res => {
          query.get(res[0].objectId).then(res => {
            //已有则更新
            res.set("UserID", status.userInfo.nickName)
            res.set("region", that.data.region[0] + ',' + that.data.region[1] + ',' + that.data.region[2])
            res.set("comname", this.data.value1)
            res.set("industry", this.data.value2)
            res.set("quality", this.data.value3)
            res.set("scale", this.data.value4)
            res.set("agent", this.data.value5)
            res.set("tellphone", this.data.value6)
            res.set("adress", this.data.dizhi)
            res.set("username", this.data.value7)
            if (that.data.value8 != "") {
              res.set("password", this.data.value8)
            }
            res.set("introduce", this.data.value10)
            res.set("logo", this.data.logoimg)
            res.set("license", this.data.infoimg)
            res.save().then(res => {
              $Toast({
                content: '信息更新成功',
                type: 'success',
                duration: 0,
              });
              setTimeout(() => {
                $Toast.hide();
              }, 300);
              console.log(res)
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => {
            console.log(err)
          })
        });
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

  handleBlur() {
    if (this.data.value8 != this.data.value9) {
      $Toast({
        content: '请确认两次密码一致',
        type: 'warning',
        duration: 0,
      });
      setTimeout(() => {
        $Toast.hide();
      }, 300);
    }
  },

  /**
   * 获取地理位置
   */
  handleGetregion() {
    var that = this
    console.log("选择地理位置")
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userLocation']) {
          console.log("未授权")
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.chooseLocation({
                success: res => {
                  that.setData({
                    dizhi: res.address,
                  })
                }
              })
            }
          })
        } else {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.chooseLocation({
            success: res => {
              this.setData({
                dizhi: res.address,
              })
            }
          })
        }
      }
    });
  },

  /**
   * 改变地区
   */
  bindRegionChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      index1: 0
    })
  },

  /**
   * 上传照片
   */
  bindSelectLogo() {
    var that = this
    //上传照片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          var name = item.split(".")[2]
          var suffix = item.split(".")[3]
          file = Bmob.File(name + '.' + suffix, item);
        }
        file.save().then(res => {
          that.setData({
            logoimg: res[0].url
          })
        })
      }
    })
  },

  /**
   * 上传照片
   */
  bindSelectLicense() {
    var that = this
    //上传照片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths
        var file;
        for (let item of tempFilePaths) {
          var name = item.split(".")[2]
          var suffix = item.split(".")[3]
          file = Bmob.File(name + '.' + suffix, item);
        }
        file.save().then(res => {
          that.setData({
            infoimg: res[0].url
          })
        })
      }
    })
  },
})
//app.js
var Bmob = require('./lib/app.js');
Bmob.initialize("306985f4142230ae3693817dea9a51ff", "86fd59adfde1752a45188179f7dbfd71");

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.globalData.code = res.code
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              // 展示本地存储能力
              var status = wx.getStorageSync('status') || {}
              status = this.globalData
              wx.setStorageSync('status', status)
              //获取openid
              var code = wx.getStorageSync('status').code
              Bmob.User.requestOpenId(code).then(value => {
                wx.setStorageSync('openid', value.openid)
              })
            }
          })
        }
      }
    });
    //判断是否为平台用户，是否加载信息

  },
  globalData: {
    userInfo: null,
    comLogin: false,
    code: ''
  }
})
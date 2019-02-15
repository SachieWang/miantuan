// pages/edit/edit.js
var Bmob = require('../../src/lib/app.js');
Bmob.initialize("306985f4142230ae3693817dea9a51ff", "86fd59adfde1752a45188179f7dbfd71");

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    xueli: ['初中', '高中', '中技', '中专', '大专', '本科', '硕士', '博士', '博后'],
    index1: -1,
    gzjy: ['无经验', '1年以下', '1-3年', '3-5年', '5-10年', '10年以上'],
    index2: -1,
    mqzt: ['我目前已离职,可快速到岗', '我目前在职,但考虑换个环境', '观望,有好的机会在考虑', '目前暂无跳槽打算', '应届毕业生'],
    index3: -1,
    gzxz: ['全职', '兼职', '实习'],
    index4: -1,
    qwhy: ['外贸', '服务员', '人事专员', '室内设计', '行政专员', '平面设计', '前台', '会计', '司机', '文员', '客服', '导购员', '仓管', '网页设计', '网络编辑', '文案策划', '机械设计', '模具设计', '普工', '采购', '质检员', '保安', '操作工'],
    index5: -1,
    qwxz: ['1千~2千/月', '2千~3千/月', '3千~4千/月', '4千~5千/月', '5千~1万/月', '1万以上/月'],
    index6: -1,
    xingbie: [{
      id: 1,
      name: '男',
    }, {
      id: 2,
      name: '女'
    }],
    current: '男',
    position: 'left',
    date: '',
    region: ['', '广州市', '海珠区'],
    customItem: '全部',
    index7: -1,
    myimg: "https://i.loli.net/2017/08/21/599a521472424.jpg",
    resume: {},
    value1: '',
    value2: '',
    value7: '',
    value8: '',
    value9: '',
    value15: '',
    haveResume: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var name = wx.getStorageSync("status").userInfo.nickName
    //查询是否已有简历
    var query = Bmob.Query("individual");
    query.equalTo("UserID", "==", name)
    query.find().then(res => {
      that.setData({
        haveResume: res[0].haveResume
      })
    })
    //加载简历内容
    query = Bmob.Query("resume");
    query.equalTo("UserID", "==", name);
    query.find().then(res => {
      if (res.length == 1) {
        var reglist = [res[0].content.v14.split(",")[0], res[0].content.v14.split(",")[1], res[0].content.v14.split(",")[2]]
        that.setData({
          value1: res[0].content.v1,
          value2: res[0].content.v2,
          current: res[0].content.v3,
          date: res[0].content.v4,
          index1: res[0].content.v5id,
          index2: res[0].content.v6id,
          value7: res[0].content.v7,
          value8: res[0].content.v8,
          value9: res[0].content.v9,
          index3: res[0].content.v10id,
          index4: res[0].content.v11id,
          index5: res[0].content.v12id,
          index6: res[0].content.v13id,
          index7: 0,
          region: [].concat(reglist),
          value15: res[0].content.v15,
          myimg: res[0].content.v16,
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
    var that = this
    var name = wx.getStorageSync("status").userInfo.nickName
    //查询是否已有简历
    var query = Bmob.Query("individual");
    query.equalTo("UserID", "==", name)
    query.find().then(res => {
      that.setData({
        haveResume: res[0].haveResume
      })
    })
    //加载简历内容
    query = Bmob.Query("resume");
    query.equalTo("UserID", "==", name);
    query.find().then(res => {
      if (res.length == 1) {
        var reglist = [res[0].content.v14.split(",")[0], res[0].content.v14.split(",")[1], res[0].content.v14.split(",")[2]]
        that.setData({
          value1: res[0].content.v1,
          value2: res[0].content.v2,
          current: res[0].content.v3,
          date: res[0].content.v4,
          index1: res[0].content.v5id,
          index2: res[0].content.v6id,
          value7: res[0].content.v7,
          value8: res[0].content.v8,
          value9: res[0].content.v9,
          index3: res[0].content.v10id,
          index4: res[0].content.v11id,
          index5: res[0].content.v12id,
          index6: res[0].content.v13id,
          index7: 0,
          region: reglist,
          value15: res[0].content.v15,
          myimg: res[0].content.v16,
        })
      }
    });
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

  handleXingbieChange({
    detail = {}
  }) {
    this.setData({
      current: detail.value
    });
  },

  bindDateChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindPickerChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },

  bindGzjyChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },

  bindMqztChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },

  bindGzxzChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
  },

  bindQwhyChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index5: e.detail.value
    })
  },

  bindQwxzChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index6: e.detail.value
    })
  },

  bindRegionChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      index7: 0
    })
  },

  bindSelectimg() {
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
            myimg: res[0].url
          })
        })
      }
    })
  },

  handleSubmit() {
    var that = this
    var status = wx.getStorageSync('status')
    //生成简历对象体
    this.data.resume.v1 = this.data.value1
    this.data.resume.v2 = this.data.value2
    this.data.resume.v3 = this.data.current
    this.data.resume.v4 = this.data.date
    this.data.resume.v5 = this.data.xueli[this.data.index1]
    this.data.resume.v5id = this.data.index1
    this.data.resume.v6 = this.data.gzjy[this.data.index2]
    this.data.resume.v6id = this.data.index2
    this.data.resume.v7 = this.data.value7
    this.data.resume.v8 = this.data.value8
    this.data.resume.v9 = this.data.value9
    this.data.resume.v10 = this.data.mqzt[this.data.index3]
    this.data.resume.v11 = this.data.gzxz[this.data.index4]
    this.data.resume.v12 = this.data.qwhy[this.data.index5]
    this.data.resume.v13 = this.data.qwxz[this.data.index6]
    this.data.resume.v10id = this.data.index3
    this.data.resume.v11id = this.data.index4
    this.data.resume.v12id = this.data.index5
    this.data.resume.v13id = this.data.index6
    this.data.resume.v14 = this.data.region[0] + ',' + this.data.region[1] + ',' + this.data.region[2]
    this.data.resume.v15 = this.data.value15
    this.data.resume.v16 = this.data.myimg
    //判断是否已有简历
    var query = Bmob.Query('resume');
    query.equalTo("UserID", "==", status.userInfo.nickName)
    query.find().then(res => {
      if (res.length == 0) {
        //非已有则存入
        query.set("UserID", status.userInfo.nickName)
        query.set("content", this.data.resume)
        query.save().then(res => {
          that.setData({
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
          })
        }).catch(err => {
          console.log(err)
        })
      }
      /*
      else {
        //已有则更新内容
        query.get(res[0].objectId).then(res => {
          console.log(res)
          res.set('content', this.data.resume)
          res.save()
        }).catch(err => {
          console.log(err)
        })
      }*/
    });
  },

  handleGx() {
    //生成简历对象体
    this.data.resume.v1 = this.data.value1
    this.data.resume.v2 = this.data.value2
    this.data.resume.v3 = this.data.current
    this.data.resume.v4 = this.data.date
    this.data.resume.v5 = this.data.xueli[this.data.index1]
    this.data.resume.v5id = this.data.index1
    this.data.resume.v6 = this.data.gzjy[this.data.index2]
    this.data.resume.v6id = this.data.index2
    this.data.resume.v7 = this.data.value7
    this.data.resume.v8 = this.data.value8
    this.data.resume.v9 = this.data.value9
    this.data.resume.v10 = this.data.mqzt[this.data.index3]
    this.data.resume.v11 = this.data.gzxz[this.data.index4]
    this.data.resume.v12 = this.data.qwhy[this.data.index5]
    this.data.resume.v13 = this.data.qwxz[this.data.index6]
    this.data.resume.v10id = this.data.index3
    this.data.resume.v11id = this.data.index4
    this.data.resume.v12id = this.data.index5
    this.data.resume.v13id = this.data.index6
    this.data.resume.v14 = this.data.region[0] + ',' + this.data.region[1] + ',' + this.data.region[2]
    this.data.resume.v15 = this.data.value15
    this.data.resume.v16 = this.data.myimg
    //更新表
    var query = Bmob.Query('resume');
    var status = wx.getStorageSync('status')
    query.equalTo("UserID", "==", status.userInfo.nickName)
    query.find().then(res => {
      query.get(res[0].objectId).then(res => {
        res.set('content', this.data.resume)
        res.save()
      }).catch(err => {
        console.log(err)
      })
    })

  },

  handleFb() {
    console.log("发布简历")
  },

  handleValueChange(e) {
    if (e.currentTarget.id == "value1") {
      this.data.value1 = e.detail.detail.value
    } else if (e.currentTarget.id == "value2") {
      this.data.value2 = e.detail.detail.value
    } else if (e.currentTarget.id == "value7") {
      this.data.value7 = e.detail.detail.value
    } else if (e.currentTarget.id == "value8") {
      this.data.value8 = e.detail.detail.value
    } else if (e.currentTarget.id == "value9") {
      this.data.value9 = e.detail.detail.value
    } else if (e.currentTarget.id == "value15") {
      this.data.value15 = e.detail.detail.value
    }
  }
})
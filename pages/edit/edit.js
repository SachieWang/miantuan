// pages/edit/edit.js
var Bmob = require('../../lib/app.js');
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
    openInfo: '',
    optskey: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var openid = wx.getStorageSync('openid')
    //查询是否已有简历且开放
    var query = Bmob.Query("individual");
    query.equalTo("openid", "==", openid)
    query.find().then(res => {
      that.setData({
        haveResume: res[0].haveResume,
        openInfo: res[0].openInfo
      })
    })
    //加载简历内容
    query = Bmob.Query("individual");
    query.equalTo("openid", "==", openid);
    query.find().then(res => {
      console.log(res)
      if (res.length == 1) {
        var reglist = [res[0].R_region.split(",")[0], res[0].R_region.split(",")[1], res[0].R_region.split(",")[2]]
        that.setData({
          value1: res[0].R_intention,
          value2: res[0].R_name,
          current: res[0].R_gender,
          date: res[0].R_birth,
          index1: res[0].R_optskey.v5id,
          index2: res[0].R_optskey.v6id,
          value7: res[0].R_residence,
          value8: res[0].R_email,
          value9: res[0].R_tellphone,
          index3: res[0].R_optskey.v10id,
          index4: res[0].R_optskey.v11id,
          index5: res[0].R_optskey.v12id,
          index6: res[0].R_optskey.v13id,
          index7: 0,
          region: [].concat(reglist),
          value15: res[0].R_content,
          myimg: res[0].R_image,
        })
      }
    });
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
    var that = this
    var openid = wx.getStorageSync('openid')
    //查询是否已有简历
    var query = Bmob.Query("individual");
    query.equalTo("openid", "==", openid)
    query.find().then(res => {
      that.setData({
        haveResume: res[0].haveResume
      })
    })
    //加载简历内容
    query = Bmob.Query("individual");
    query.equalTo("openid", "==", openid);
    query.find().then(res => {
      if (res.length == 1) {
        var reglist = [res[0].R_region.split(",")[0], res[0].R_region.split(",")[1], res[0].R_region.split(",")[2]]
        that.setData({
          value1: res[0].R_intention,
          value2: res[0].R_name,
          current: res[0].R_gender,
          date: res[0].R_birth,
          index1: res[0].R_optskey.v5id,
          index2: res[0].R_optskey.v6id,
          value7: res[0].R_residence,
          value8: res[0].R_email,
          value9: res[0].R_tellphone,
          index3: res[0].R_optskey.v10id,
          index4: res[0].R_optskey.v11id,
          index5: res[0].R_optskey.v12id,
          index6: res[0].R_optskey.v13id,
          index7: 0,
          region: [].concat(reglist),
          value15: res[0].R_content,
          myimg: res[0].R_image,
        })
      }
    });
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
   * 性别picker事件
   */
  handleXingbieChange({
    detail = {}
  }) {
    this.setData({
      current: detail.value
    });
  },

  /**
   * 改变日期
   */
  bindDateChange(e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 改变学历
   */
  bindXueliChange(e) {
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

  /**
   * 上传照片
   */
  bindSelectimg() {
    var that = this;

    //上传照片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths;
        //新文件持久化到本地，获取文件摘要，区分文件
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success(res) {
            const savedNewFilePath = res.savedFilePath;
            //获取待上传文件摘要
            var newFileDigest = "";
            wx.getFileInfo({
              filePath: savedNewFilePath,
              success(res) {
                newFileDigest = res.digest;
                console.log(newFileDigest);
                //下载获取已有相关文件
                wx.cloud.downloadFile({
                  fileID: that.data.myimg,
                  success: res => {
                    wx.saveFile({
                      tempFilePath: res.tempFilePath,
                      success(res) {
                        wx.getFileInfo({
                          filePath: res.savedFilePath,
                          success(res) {
                            //比较摘要，相同则不上传
                            console.log("old file disgest: ", res.digest);
                            console.log("new file disgest: ", newFileDigest);
                            if (res.digest != newFileDigest) {
                              var fileInfoArray = savedNewFilePath.split("/");
                              var fileName = fileInfoArray[fileInfoArray.length - 1];
                              var suffix = fileName.split(".")[1];
                              //转存至云开发存储
                              wx.showLoading({
                                title: '上传 0%',
                              })
                              const uploadTask = wx.cloud.uploadFile({
                                //利用上传覆盖写机制避免冗余文件
                                cloudPath: 'miantuan/ID_Photos/user_' + wx.getStorageSync('openid') + '/' + newFileDigest + '.' + suffix, // 上传至云端的路径
                                filePath: savedNewFilePath, // 文件路径
                                success: res => {
                                  // 返回文件 ID
                                  console.log("新文件上传成功，文件ID：", res.fileID);
                                  that.setData({
                                    myimg: res.fileID //res[0].url
                                  });
                                  wx.hideLoading();
                                },
                                fail: console.error
                              });
                              uploadTask.onProgressUpdate(res => {
                                wx.showLoading({
                                  title: '上传 ' + res.progress + '%',
                                })
                              })
                            }
                          },
                          fail(err) {
                            console.error(err);
                          }
                        })
                      },
                      fail(err) {
                        console.error(err);
                      }
                    })
                  },
                  fail: err => {
                    // handle error
                  }
                });
              }
            });
          }
        });
      }
    })
  },

  /**
   * 保存简历
   */
  handleSubmit() {
    var that = this
    var openid = wx.getStorageSync('openid');
    //生成选项键对象体
    this.data.optskey.v5id = this.data.index1
    this.data.optskey.v6id = this.data.index2
    this.data.optskey.v10id = this.data.index3
    this.data.optskey.v11id = this.data.index4
    this.data.optskey.v12id = this.data.index5
    this.data.optskey.v13id = this.data.index6
    //判断是否已有简历
    var query = Bmob.Query('individual');
    query.equalTo("openid", "==", openid)
    query.find().then(res => {
      if (!res[0].haveResume) {
        //非已有则存入
        query.set("R_intention", that.data.value1)
        query.set("R_name", that.data.value2)
        query.set("R_gender", that.data.current)
        query.set("R_birth", that.data.date)
        query.set("R_edu", that.data.xueli[that.data.index1])
        query.set("R_exp", that.data.gzjy[that.data.index2])
        query.set("R_residence", that.data.value7)
        query.set("R_email", that.data.value8)
        query.set("R_tellphone", that.data.value9)
        query.set("R_status", that.data.mqzt[that.data.index3])
        query.set("R_quality", that.data.gzxz[that.data.index4])
        query.set("R_industry", that.data.qwhy[that.data.index5])
        query.set("R_salary", that.data.qwxz[that.data.index6])
        query.set("R_region", that.data.region[0] + ',' + that.data.region[1] + ',' + that.data.region[2])
        query.set("R_content", that.data.value15)
        query.set("R_image", that.data.myimg)
        query.set("R_optskey", that.data.optskey)
        query.save().then(res => {
          that.setData({
            haveResume: true,
          })
          query = Bmob.Query('individual')
          query.equalTo("openid", "==", openid)
          query.find().then(res => {
            query.get(res[0].objectId).then(res => {
              res.set('haveResume', true);
              res.save();
            }).catch(err => {
              console.log(err)
            })
          })
        }).catch(err => {
          console.log(err)
        })
      }
    });
  },

  /**
   * 更新简历
   */
  handleGx() {
    wx.showLoading({
      title: '更新简历中...',
    });
    var that = this
    //生成选项键对象体
    this.data.optskey.v5id = this.data.index1
    this.data.optskey.v6id = this.data.index2
    this.data.optskey.v10id = this.data.index3
    this.data.optskey.v11id = this.data.index4
    this.data.optskey.v12id = this.data.index5
    this.data.optskey.v13id = this.data.index6
    //更新表
    var query = Bmob.Query('individual');
    var openid = wx.getStorageSync('openid')
    query.equalTo("openid", "==", openid)
    query.find().then(res => {
      query.get(res[0].objectId).then(res => {
        res.set("R_intention", that.data.value1)
        res.set("R_name", that.data.value2)
        res.set("R_gender", that.data.current)
        res.set("R_birth", that.data.date)
        res.set("R_edu", that.data.xueli[that.data.index1])
        res.set("R_exp", that.data.gzjy[that.data.index2])
        res.set("R_residence", that.data.value7)
        res.set("R_email", that.data.value8)
        res.set("R_tellphone", that.data.value9)
        res.set("R_status", that.data.mqzt[that.data.index3])
        res.set("R_quality", that.data.gzxz[that.data.index4])
        res.set("R_industry", that.data.qwhy[that.data.index5])
        res.set("R_salary", that.data.qwxz[that.data.index6])
        res.set("R_region", that.data.region[0] + ',' + that.data.region[1] + ',' + that.data.region[2])
        res.set("R_content", that.data.value15)
        res.set("R_image", that.data.myimg)
        res.set("R_optskey", that.data.optskey)
        res.save()
        wx.hideLoading()
        wx.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 800
        })
      }).catch(err => {
        console.log(err)
      })
    })

  },

  handleFb() {
    console.log("发布简历")
    var query = Bmob.Query('individual');
    var openid = wx.getStorageSync('openid')
    var that = this
    that.setData({
      openInfo: true
    })
    query.equalTo("openid", "==", openid)
    query.find().then(res => {
      query.get(res[0].objectId).then(res => {
        res.set("openInfo", that.data.openInfo)
        res.save()
      }).catch(err => {
        console.log(err)
      })
    })
  },

  handleCh() {
    console.log("撤回简历")
    var query = Bmob.Query('individual');
    var openid = wx.getStorageSync('openid')
    var that = this
    that.setData({
      openInfo: false
    })
    query.equalTo("openid", "==", openid)
    query.find().then(res => {
      query.get(res[0].objectId).then(res => {
        res.set("openInfo", that.data.openInfo)
        res.save()
      }).catch(err => {
        console.log(err)
      })
    })
  },

  /**
   * 监听反馈输入框值改动
   */
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
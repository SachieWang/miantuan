// pages/edit/edit.js
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
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
    value7: '',
    qwhy: ['外贸', '服务员', '人事专员', '室内设计', '行政专员', '平面设计', '前台', '会计', '司机', '文员', '客服', '导购员', '仓管', '网页设计', '网络编辑', '文案策划', '机械设计', '模具设计', '普工', '采购', '质检员', '保安', '操作工'],
    index5: -1,
    xueli: ['初中', '高中', '中技', '中专', '大专', '本科', '硕士', '博士', '博后'],
    index1: -1,
    gzjy: ['无经验', '1年以下', '1-3年', '3-5年', '5-10年', '10年以上'],
    index2: -1,
    gzxz: ['全职', '兼职', '实习'],
    index4: -1,
    xingbie: [{
      id: 1,
      name: '男',
    }, {
      id: 2,
      name: '女'
    }, {
      id: 3,
      name: '不限'
    }],
    current: '',
    position: 'left',
    line1: [{
      id: 1,
      name: '五险一金',
    }, {
      id: 2,
      name: '交通补贴'
    }, {
      id: 3,
      name: '年终奖金'
    }, {
      id: 4,
      name: '双休',
    }],
    line2: [{
      id: 5,
      name: '医疗保险',
    }, {
      id: 6,
      name: '餐饮补贴'
    }, {
      id: 7,
      name: '定期体检'
    }, {
      id: 8,
      name: '调休',
    }],
    line3: [{
      id: 9,
      name: '员工旅游',
    }, {
      id: 2,
      name: '出国机会'
    }, {
      id: 3,
      name: '节日福利'
    }, {
      id: 4,
      name: '年假',
    }],
    currentchecks1: [],
    currentchecks2: [],
    currentchecks3: [],
    currentchecks: [],
    optskey: {},
    haveResume: false,
    logourl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var status = wx.getStorageSync('status')
    var openid = wx.getStorageSync('openid')
    var query = Bmob.Query('company');
    query.equalTo("openid", "==", openid)
    query.find().then(res => {
      console.log(res)
      this.data.logourl = res[0].logo
      this.data.DobjectId = res[0].objectId
    })
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

  /**
   * 发布职位
   */
  handleSubmit() {
    if (this.data.index1 == -1 || this.data.index2 == -1 || this.data.index4 == -1 || this.data.index5 == -1) {
      $Toast({
        content: '发布失败，请确认填写无误',
        type: 'warning',
        duration: 0,
      });
      setTimeout(() => {
        $Toast.hide();
      }, 1000);
      return false
    }
    var that = this
    var openid = wx.getStorageSync('openid')
    var status = wx.getStorageSync('status')
    //生成选项键对象体
    this.data.optskey.xlyq = this.data.index1
    this.data.optskey.gzjy = this.data.index2
    this.data.optskey.gzxz = this.data.index4
    this.data.optskey.gzlx = this.data.index5
    this.data.currentchecks = this.data.currentchecks1.concat(this.data.currentchecks2, this.data.currentchecks3)
    //生成关联体
    var pointer = Bmob.Pointer('company')
    var poiID = pointer.set(that.data.DobjectId)
    //录入
    var query = Bmob.Query('zhiwei');
    query.set("openid", openid)
    query.set('company', poiID)
    query.set("Z_gzzw", that.data.value1)
    query.set("Z_gzlx", that.data.qwhy[that.data.index5])
    query.set("Z_xsjj", that.data.value2)
    query.set("Z_ltjj", that.data.value3)
    query.set("Z_xzdy", that.data.value4)
    query.set("Z_zprs", that.data.value5)
    query.set("Z_xlyq", that.data.xueli[that.data.index1])
    query.set("Z_gzjy", that.data.gzjy[that.data.index2])
    query.set("Z_gzxz", that.data.gzxz[that.data.index4])
    query.set("Z_nlyq", that.data.value6)
    query.set("Z_gender", that.data.current)
    query.set("Z_tsfw", that.data.currentchecks)
    query.set("Z_zwxq", that.data.value7)
    query.set("Z_optskey", that.data.optskey)
    query.set("Z_logourl", that.data.logourl)
    query.save().then(res => {
      $Toast({
        content: '成功发布',
        type: 'success',
        duration: 0,
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
        $Toast.hide();
      }, 1000);
    }).catch(err => {
      console.log(err)
      console.log("shibai")
    })
  },

  /**
   * 更新简历
   */
  handleGx() {
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
    var status = wx.getStorageSync('status')
    query.equalTo("UserID", "==", status.userInfo.nickName)
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
      }).catch(err => {
        console.log(err)
      })
    })

  },

  handleFb() {
    console.log("发布简历")
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
    }
  },

  handleLine1Change({
    detail = {}
  }) {
    const index = this.data.currentchecks1.indexOf(detail.value);
    index === -1 ? this.data.currentchecks1.push(detail.value) : this.data.currentchecks1.splice(index, 1);
    this.setData({
      currentchecks1: this.data.currentchecks1
    });
  },
  handleLine2Change({
    detail = {}
  }) {
    const index = this.data.currentchecks2.indexOf(detail.value);
    index === -1 ? this.data.currentchecks2.push(detail.value) : this.data.currentchecks2.splice(index, 1);
    this.setData({
      currentchecks2: this.data.currentchecks2
    });
  },
  handleLine3Change({
    detail = {}
  }) {
    const index = this.data.currentchecks3.indexOf(detail.value);
    index === -1 ? this.data.currentchecks3.push(detail.value) : this.data.currentchecks3.splice(index, 1);
    this.setData({
      currentchecks3: this.data.currentchecks3
    });
  },
})
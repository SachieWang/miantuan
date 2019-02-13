// pages/edit/edit.js
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
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    index7: -1,
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

  handleXingbieChange({
    detail = {}
  }) {
    this.setData({
      current: detail.value
    });
  },

  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },

  bindGzjyChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value
    })
  },
  bindMqztChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index3: e.detail.value
    })
  },
  bindGzxzChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index4: e.detail.value
    })
  },
  bindQwhyChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index5: e.detail.value
    })
  },
  bindQwxzChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index6: e.detail.value
    })
  },
  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      index7: 0
    })
  }
})
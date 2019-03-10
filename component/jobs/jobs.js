// component/jobs/jobs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showlist: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      const myEventDetail = {}
      const myEventOption = {}
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
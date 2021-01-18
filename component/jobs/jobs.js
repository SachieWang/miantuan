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
    actions: [{
      name: '撤回',
      color: '#fff',
      fontsize: '20',
      width: 50,
      icon: 'undo',
      background: '#ed3f14'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      console.log("组件内数据：", e);
      const myEventDetail = {
        objectid: e.currentTarget.dataset.objectid
      };
      const myEventOption = {};
      this.triggerEvent('myTap', myEventDetail, myEventOption)
    }
  }
})
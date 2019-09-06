Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    now_date: '',
    jbxtInfo: [],
  },
  attached() {

    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    wx.hideLoading()

    this.setData({
      now_date: getApp().globalData.now_date,
      jbxtInfo:getApp().globalData.jbxtInfo
    })
  },

  methods: {
  }
})
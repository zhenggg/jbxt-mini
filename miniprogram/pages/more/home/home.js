Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    jbxtInfo: getApp().globalData.jbxtInfo,
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    wx.hideLoading()
  },
  methods: {
  }
})
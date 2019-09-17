const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    date: ''
  },
  onLoad: function() {
    this.setData({
      date: app.globalData.now_date
    })
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  DateChange(e) {
    wx.showLoading({
      title: '切换中...',
      mask: true,
    })
    this.setData({
      date: e.detail.value
    });
    app.initSys(e.detail.value,'/pages/index/index');
    wx.hideLoading()
  },

});
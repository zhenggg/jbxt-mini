const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    date:app.globalData.jbxtInfo.date,
  },
  onLoad: function () { },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
});

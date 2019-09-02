const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    date: app.globalData.adminUserInfo.date
  },
  onLoad: function() {
    this.setData({
      date: app.globalData.adminUserInfo.date
    })
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
    //todo 选择中了时间改变 app.globalData.adminUserInfo.date 和 user.now_date
  },

});
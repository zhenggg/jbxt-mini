const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    date: '',
  },
  onLoad: function() {
    let date = this.TimestampToDate(app.globalData.adminUserInfo.date);
    this.setData({
      date: date
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
  TimestampToDate(timestamp) {
    var date = new Date(parseInt(timestamp));
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());

    return Y + M + D;
  }

});
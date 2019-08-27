const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    index: null,
    pickerUsers: ['喵喵喵', '汪汪汪', '哼唧哼唧'],
  },
  onLoad: function () {
    //获取users
    const db = wx.cloud.database()
    db.collection('users').where({
      openid: null
    }).get({
      success: function(res) {
        console.log(res.data)
        //pickerUsers
      }
    })
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
});

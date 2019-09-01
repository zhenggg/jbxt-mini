const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    ColorList: app.globalData.ColorList,
    index: null,
    pickerUsers: [],
  },
  onLoad: function () {
    //获取pickerUsers
    const db = wx.cloud.database()
    let res = db.collection('users').get()
    .then(res => {
        console.log(res)
        console.log(res.list)
        this.setData({
          pickerUsers: res.list
        })
      })
  },
  pageBack() {
    wx.navigateBack({
      delta: 1
    });
  },
  reg_user() {
    let id = this.data.pickerUsers[this.data.index]._id 
    console.log(id)
    if (typeof (id) !== 'string') {
        wx.showToast({
          title: '请选择值班人员',
        })
        return
    }
    wx.cloud.callFunction({
      name: 'reg',
      data: { id: id},
      success: res => {
        console.log('call [云函数] [reg]')

        if (res.result.status != 1) {
          console.log('call [云函数] [reg] fail')
        } else {
          wx.navigateTo({
            url: '../index/index',
          })
        }
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })

  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
});

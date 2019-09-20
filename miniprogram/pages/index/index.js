Page({
  data: {
    PageCur: 'jobs',
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

  onLoad:  function() {
    // 登录
      //this.callLogin();


      
  },
  callLogin : function () {
    wx.cloud.callFunction({
      name: 'login',
      //data: { userInfo: getApp().globalData.userInfo },
     
    }).then(res => {
      
      //获取duty
      if (res.result.adminUserInfo) {
        getApp().globalData.adminUserInfo.date = res.result.adminUserInfo.data[0].now_date
      } else {
        getApp().globalData.adminUserInfo.date = new Date(
          new Date(new Date().toLocaleDateString()).getTime()
        )
      }
      console.log(res.result.adminUserInfo.data[0].now_date)
      const db = wx.cloud.database()
      db.collection('dutys').where({
        date: getApp().globalData.use_date
      }).get({
        success: function (res) {
          console.log(getApp().globalData.use_date)
          console.log(res.data)
          //jbxtInfo

          //userJobs
        }
      })

      if (res.result.is_reg) {
        getApp().globalData.adminUserInfo = res.result.adminUserInfo
       
      } else {
        getApp().globalData.adminUserInfo.openid = res.result.openid

      }
      }).catch(err => {
        console.error('[云函数] [login] 调用失败', err)
      })
  },
  onShareAppMessage() {
    return {
      title: '技保小程序',
      imageUrl: '/images/share.png',
      path: '/pages/index/index'
    }
  },
})
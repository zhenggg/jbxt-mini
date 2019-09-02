//app.js
var until = require('/until/until.js')
App({
  onLaunch: function () {
    if (wx.cloud) {
      wx.cloud.init({
        traceUser: true
      })
    }
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
            }
          })
        }
      }
    })
    this.globalData.adminUserInfo.date = until.utcDateToString(date)
    // 登录
    wx.cloud.callFunction({
      name: 'login',
      data: { userInfo: this.globalData.userInfo },
      success: res => {
        let is_reg = res.result.is_reg
        let adminUserInfo = res.result.adminUserInfo
        let date = res.result.date
       //设置默认用户日期 （今日）
        if (is_reg) {
          this.globalData.adminUserInfo = adminUserInfo
          this.globalData.adminUserInfo.date = until.utcDateToString(date)
        } else {
          this.globalData.adminUserInfo.openid = res.result.openid
        }

        if (!res.result.is_reg) {

          wx.navigateTo({
            url: '../reg/reg',
          })
        }


      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })


  },
  globalData: {
    adminUserInfo: { avatarUrl: './user-unlogin.png', openid: '', name: '', date: '' },
    userInfo: { name: '' },
    jbxtInfo: [],
    userJobs: {
      jb: 1, dp: 1, qw: 1, dd: 1
    },

    ColorList: [{
      title: '嫣红',
      name: 'red',
      color: '#e54d42'
    },
    {
      title: '桔橙',
      name: 'orange',
      color: '#f37b1d'
    },
    {
      title: '明黄',
      name: 'yellow',
      color: '#fbbd08'
    },
    {
      title: '橄榄',
      name: 'olive',
      color: '#8dc63f'
    },
    {
      title: '森绿',
      name: 'green',
      color: '#39b54a'
    },
    {
      title: '天青',
      name: 'cyan',
      color: '#1cbbb4'
    },
    {
      title: '海蓝',
      name: 'blue',
      color: '#0081ff'
    },
    {
      title: '姹紫',
      name: 'purple',
      color: '#6739b6'
    },
    {
      title: '木槿',
      name: 'mauve',
      color: '#9c26b0'
    },
    {
      title: '桃粉',
      name: 'pink',
      color: '#e03997'
    },
    {
      title: '棕褐',
      name: 'brown',
      color: '#a5673f'
    },
    {
      title: '玄灰',
      name: 'grey',
      color: '#8799a3'
    },
    {
      title: '草灰',
      name: 'gray',
      color: '#aaaaaa'
    },
    {
      title: '墨黑',
      name: 'black',
      color: '#333333'
    },
    {
      title: '雅白',
      name: 'white',
      color: '#ffffff'
    },
    ],
  }
})
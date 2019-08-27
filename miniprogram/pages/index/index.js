Page({
  data: {
    PageCur: 'jobs'
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

  onLoad: function() {

  },

  onShareAppMessage() {
    return {
      title: '技保小程序',
      imageUrl: '/images/share.jpg',
      path: '/pages/index/index'
    }
  },
})
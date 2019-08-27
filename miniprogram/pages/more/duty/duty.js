const app = getApp();
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        ColorList: app.globalData.ColorList,
        userInfo: app.globalData.userInfo,
        jbxtInfo: app.globalData.jbxtInfo,
        items: {
            jb:{name: '技术保障岗', value: 'jb', checked: false},
            dp:{name: '大屏维护岗', value: 'dp', checked: false},
            qw:{name: '勤务检查岗', value: 'qw', checked: false},
            dd:{name: '一键点调岗', value: 'dd', checked: false},
        },
    },
    submit: function (e) {
        var values = e.detail.value;
        console.log('checkbox发生change事件，携带value值为：',  values)

        //调用更新duty云函数 where(date,openid)
        wx.cloud.callFunction({
            name: 'duty',
            data: {
                date:app.globalData.jbxtInfo.date,
                posts:values
            },
            success: res => {
                console.log('[云函数] [duty]: ')
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
            },
            fail: err => {
                console.error('[云函数] [login] 调用失败', err)
            }
        })
    },
    onLoad: function () {
        if (this.data.adminUserInfo.openid == this.data.jbxtInfo.jb.openid) {
            this.data.items.jb.checked = true;
        }
        if (this.data.adminUserInfo.openid == this.data.jbxtInfo.dp.openid) {
            this.data.items.dp.checked = true;
        }
        if (this.data.adminUserInfo.openid == this.data.jbxtInfo.qw.openid) {
            this.data.items.qw.checked = true;
        }
        if (this.data.adminUserInfo.openid == this.data.jbxtInfo.dd.openid) {
            this.data.items.dd.checked = true;
        }
        this.setData({
            items:this.data.items
        });
    },
    pageBack() {
        wx.navigateBack({
            delta: 1
        });
    },
});

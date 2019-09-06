const app = getApp();
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar,
        ColorList: app.globalData.ColorList,
        items: {
            jb: {name: '技术保障岗', value: 'jb', checked: false},
            dp: {name: '大屏维护岗', value: 'dp', checked: false},
            qw: {name: '勤务检查岗', value: 'qw', checked: false},
            dd: {name: '一键点调岗', value: 'dd', checked: false},
        },
        items_values: []
    },
    checkboxChange: function (e) {

    },
    formSubmit: function (e) {
        console.log(e.detail.value);
        wx.showModal({
            title: '提示',
            content: '确认选择值班类型？',
            success(res) {
                if (res.confirm) {
                } else if (res.cancel) {
                }
            }
        })
        console.log(e.detail.value);
        return false;
    },
    onLoad: function () {

        if (app.globalData.adminUserInfo.openid === app.globalData.jbxtInfo[0].openid) {
            this.data.items.jb.checked = true;
        }
        if (app.globalData.adminUserInfo.openid === app.globalData.jbxtInfo[1].openid) {
            this.data.items.dp.checked = true;
        }
        if (app.globalData.adminUserInfo.openid === app.globalData.jbxtInfo[2].openid) {
            this.data.items.qw.checked = true;
        }
        if (app.globalData.adminUserInfo.openid === app.globalData.jbxtInfo[3].openid) {
            this.data.items.dd.checked = true;
        }
        this.setData({
            items: this.data.items
        });
    },
    pageBack() {
        wx.navigateBack({
            delta: 1
        });
    },
});

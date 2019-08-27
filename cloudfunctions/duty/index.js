const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

const db = cloud.database()
const _ = db.command
exports.main = async (event, context) => {
    let {userInfo, date, posts} = event
    let {OPENID, APPID} = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的

    let user_date_duty_exist = await db.collection('dutys').where({
        date: date,
        post: post,
    }).count()
    console.log(user_date_duty_exist);

    if (user_date_duty_exist) {
        // 更新
        try {
            return await db.collection('dutys').where({
                data: {
                    date: date,
                    post: post
                }
            }).update({
                    data: {
                        openid: OPENID,
                    },
                })
        } catch(e) {
            console.error(e)
        }
    } else {
        //add
        try {
            return await db.collection('dutys').add({
                data: {
                    date: date,
                    openid: OPENID,
                    post: post
                }
            })
        } catch(e) {
            console.error(e)
        }
    }
}
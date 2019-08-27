const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  console.log('zhenggg-login:s')
  let {OPENID} = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的

  const user_exist = await db.collection('users').where({
    openid: OPENID,
  }).count()
  const total = user_exist.total
  console.log('zhenggg-login:' + total)

  //有返回 adminUserInfo(date)
  if (user_exist.total == 0) {
    //没有插入到云数据库 并 跳到reg页面
    try {
      await db.collection('todos').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          openid: OPENID,
        }
      })
    } catch(e) {
      console.error(e)
    }
    return {
      is_reg:false,
      openid: OPENID,
    }
  }
  return {
    is_reg:true,
    adminUserInfo:{
      openid: OPENID,
    },
  }
}

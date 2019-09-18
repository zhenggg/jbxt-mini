// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  console.log('zhenggg-login:s')
  let id =  event.id;
  let { OPENID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的
  let user = await db.collection('users').where({
    _id: id,
    openid: '',
  }).count();

  if (user.total === 0) {
    return {
      err: 1,
    }
  }
  try {
    await db.collection('users').where({
      _id: id,
    }).update({
        data: {
          openid: OPENID
        },
    })
    return {
      err: 0,
    }
  } catch (e) {
    console.error(e)
  }
   

}
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {

  let { OPENID } = cloud.getWXContext() // 这里获取到的 openId 和 appId 是可信的

  const user_exist = await db.collection('users').where({
    openid: OPENID,
  }).count()
  const total = user_exist.total
  if (user_exist.total == 0) {

   
  } else {
    const user = await db.collection('users').where({
      openid: OPENID,
    }).get()

    let date = user.data[0].now_date,
  }

  const user_date_dutys = await db.collection('dutys').where({
    date: date
  }).get()

  let jbxtInfo = [
    { name: '', openid: '' },//jb
    { name: '', openid: '' },//dp
    { name: '', openid: '' },//qw
    { name: '', openid: '' }//dd
  ]

  if (user_date_dutys.data) {

    user_date_dutys.data.forEach(function (e) {

      let user = await db.collection('users').doc(e.user_id).get()

      let index = e.post - 1

      jbxtInfo[e.post - 1].name = user.data.name
      jbxtInfo[e.post - 1].name = user.data.openid
    })
  }

  //有返回 adminUserInfo(date)
  if (user_exist.total == 0) {
    
    return {
      is_reg: false,
      jbxtInfo: jbxtInfo,
      adminUserInfo: {
        openid: OPENID,
      },
    }
  }

  const user = await db.collection('users').where({
    openid: OPENID,
  }).get()

  return {
    is_reg: true,
    jbxtInfo: jbxtInfo,
    adminUserInfo: {
      openid: OPENID,
      date: user.data[0].now_date,
      name: user.data[0].name
    },
  }

}
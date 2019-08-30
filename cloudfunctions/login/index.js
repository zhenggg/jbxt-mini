const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
const _ = db.command
const $ = db.command.aggregate
exports.main = async(event, context) => {
  console.log('zhenggg-login:s')
  let {
    OPENID
  } = cloud.getWXContext()

  const user_exist = await db.collection('users').where({
    openid: OPENID,
  }).count()
  const total = user_exist.total
  console.log('zhenggg-login:' + total)

  //有返回 adminUserInfo(date)
  if (user_exist.total == 0) {
    return {
      is_reg: false,
      openid: OPENID,
    }
  }
  const user = await db.collection('users')
  .aggregate()
    .project({
      formatDate: $.dateToString({
        date: '$now_date',
        format: '%Y-%m-%d',
        timezone: 'Asia/Shanghai'
      })
    }).where({
      openid: OPENID,
    })
    .end()
  // const user = await db.collection('users').where({
  //   openid: OPENID,
  // }).get()

  return {
    is_reg: true,
    adminUserInfo: user
  }
}
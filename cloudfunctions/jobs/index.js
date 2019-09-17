// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  //let {OPENID} = cloud.getWXContext();// 这里获取到的 openId 和 appId 是可信的
  let {date} = event;

  const user_sign_logs = await db.collection('sign_logs').where({
    date: date
  }).get();

  return user_sign_logs
}
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let {OPENID} = cloud.getWXContext();// 这里获取到的 openId 和 appId 是可信的
  let {date,job_id,jbxtInfo,img_path} =  event;


  const cur_user = await db.collection('users').where({
    openid: OPENID,
    can_sign: '1'
  }).get();

  if (cur_user.data === []) {
    return {
      err: 1,
    }
  }


  let jobsInfo = [{
    id: 1,
    start: "00:00:00",
    end: "09:00:00",
    time_description: "9:00前",
    order: 1,
    name: "打卡上班，着装进驻指挥大厅做好交接班，并在交接班记录本上签字，关注移交事项!",
    jb:1,dp:1,qw:1,dd:1,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 2,
    start: "09:15:00",
    end: "09:30:00",
    time_description: "9:15-9:30",
    order: 2,
    name: "市局机关上午常态点名",
    jb:0,dp:0,qw:1,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 3,
    start: "00:00:00",
    end: "00:00:00",
    time_description: "110点评晨会后",
    order: 3,
    name: "点评会议桌桌面\/座椅整理",
    jb:0,dp:0,qw:0,dd:1,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 4,
    start: "00:00:00",
    end: "00:00:00",
    time_description: "大厅交接班后",
    order: 4,
    name: "交班会议桌桌面\/座椅整理,整理无线话筒并收好",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 5,
    start: "10:00:00",
    end: "10:30:00",
    time_description: "10:00-10:30 ",
    order: 5,
    name: "二级指挥室、主城区处警单位上午常态点名",
    jb:0,dp:0,qw:1,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 6,
    start: "10:15:00",
    end: "11:00:00",
    time_description: "10:15-11:00",
    order: 6,
    name: "联合指挥1-2号桌席巡检",
    jb:0,dp:0,qw:0,dd:1,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 7,
    start: "10:15:00",
    end: "11:00:00",
    time_description: "10:15-11:00",
    order: 7,
    name: "联合指挥3-4号桌席巡检",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 8,
    start: "10:15:00",
    end: "11:00:00",
    time_description: "10:15-11:00",
    order: 8,
    name: "机房上午巡检 ，检查后签字登记",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 9,
    start: "11:45:00",
    end: "12:15:00",
    time_description: "11:45-12:15",
    order: 9,
    name: "指挥大厅桌面整理",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 10,
    start: "11:45:00",
    end: "12:15:00",
    time_description: "11:45-12:15",
    order: 10,
    name: "指挥大厅座椅整理",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 11,
    start: "12:00:00",
    end: "13:45:00",
    time_description: "12:00-13:45",
    order: 11,
    name: "应急值守午间值班",
    jb:0,dp:0,qw:1,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 12,
    start: "12:00:00",
    end: "13:45:00",
    time_description: "12:00-13:45",
    order: 12,
    name: "大屏维护午间值班",
    jb:0,dp:0,qw:0,dd:1,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 13,
    start: "14:30:00",
    end: "15:00:00",
    time_description: "14:30-15:00",
    order: 13,
    name: "二级指挥室、主城区处警单位下午常态点名",
    jb:0,dp:0,qw:1,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 14,
    start: "14:45:00",
    end: "15:30:00",
    time_description: "14:45-15:30",
    order: 14,
    name: "联合指挥5-6号桌席巡检",
    jb:0,dp:0,qw:0,dd:1,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 15,
    start: "14:45:00",
    end: "15:30:00",
    time_description: "14:45-15:30",
    order: 15,
    name: "联合指挥7-8号桌席巡检",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 16,
    start: "14:45:00",
    end: "15:30:00",
    time_description: "14:45-15:30",
    order: 16,
    name: "机房下午巡检，检查后签字登记",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 17,
    start: "15:00:00",
    end: "15:30:00",
    time_description: "15:00-15:30",
    order: 17,
    name: "市局机关下午常态点名",
    jb:0,dp:0,qw:1,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 18,
    start: "15:45:00",
    end: "17:00:00",
    time_description: "15:45-17:00",
    order: 18,
    name: "4G图传抽查",
    jb:0,dp:0,qw:1,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 19,
    start: "17:30:00",
    end: "18:00:00",
    time_description: "17:30-18:00",
    order: 19,
    name: "指挥大厅桌面整理",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 20,
    start: "17:30:00",
    end: "18:00:00",
    time_description: "17:30-18:00",
    order: 20,
    name: "指挥大厅座椅整理",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 21,
    start: "19:30:00",
    end: "20:30:00",
    time_description: "19:30-20:30",
    order: 21,
    name: "二级指挥室、主城区处警单位、市局机关晚间常态点名",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 22,
    start: "20:30:00",
    end: "21:00:00",
    time_description: "20:30-21:00",
    order: 22,
    name: "机房晚间巡检，将一天检查签字情况拍照发大队微信工作群",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 23,
    start: "22:30:00",
    end: "23:00:00",
    time_description: "22:30-23:00",
    order: 23,
    name: "全市执行24小时勤务武装巡逻点名",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 24,
    start: "23:00:00",
    end: "00:00:00",
    time_description: "23:00-休息",
    order: 24,
    name: "指挥大厅桌面整理",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 25,
    start: "23:00:00",
    end: "00:00:00",
    time_description: "23:00-休息",
    order: 25,
    name: "指挥大厅座椅整理",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 26,
    start: "23:00:00",
    end: "00:00:00",
    time_description: "23:00-休息",
    order: 26,
    name: "指挥大屏软关机",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 0
  }, {
    id: 27,
    start: "08:10:00",
    end: "09:00:00",
    time_description: "次日8:10- 9:00",
    order: 27,
    name: "指挥大厅垃圾袋更换",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 1
  }, {
    id: 28,
    start: "08:10:00",
    end: "09:00:00",
    time_description: "次日8:10- 9:00",
    order: 28,
    name: "指挥大厅交接班会话筒测试，摆放到位",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 1
  }, {
    id: 29,
    start: "08:10:00",
    end: "09:00:00",
    time_description: "次日8:10- 9:00",
    order: 29,
    name: "大队人员动态栏维护",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 1
  }, {
    id: 30,
    start: "08:10:00",
    end: "09:00:00",
    time_description: "次日8:10- 9:00",
    order: 30,
    name: "全市执行24小时勤务武装巡逻点名轨迹检查",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 1
  }, {
    id: 31,
    start: "08:10:00",
    end: "09:00:00",
    time_description: "次日8:10- 9:00",
    order: 31,
    name: "指挥大屏交班确认内容上屏",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 1
  }, {
    id: 32,
    start: "09:00:00",
    end: "00:00:00",
    time_description: "次日9:00-交班会",
    order: 32,
    name: "编辑每日勤务检查日报，提交审核后通过短信平台发送",
    jb:1,dp:0,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 1
  }, {
    id: 33,
    start: "09:00:00",
    end: "00:00:00",
    time_description: "次日9:00-交班会",
    order: 33,
    name: "交班会指挥大屏每日移交内容操作送",
    jb:0,dp:1,qw:0,dd:0,log:{jb:false,dp:false,qw:false,dd:false},
    tom: 1
  }]


  let posts = [];
  if ((jbxtInfo[0].openid == cur_user.data[0].openid) && jobsInfo[job_id-1].jb === 1 ){
    posts.push(1);
  }
  if ((jbxtInfo[1].openid == cur_user.data[0].openid) && jobsInfo[job_id-1].dp === 1 ){
    posts.push(2);
  }
  if ((jbxtInfo[2].openid == cur_user.data[0].openid) && jobsInfo[job_id-1].qw === 1 ){
    posts.push(3);
  }
  if ((jbxtInfo[3].openid == cur_user.data[0].openid) && jobsInfo[job_id-1].dd === 1 ){
    posts.push(4);
  }
  if (posts.length !== 0) {

    for(var i=0,l=posts.length;i<l;i++){

      let sign_log = await db.collection('sign_logs').where({
        date: date,
        job_id: job_id,
        post: posts[i],
      }).count();

      if(sign_log.total !== 0) {
        //update
        console.log('update');
        await db.collection('sign_logs').where({
          date: date,
          job_id: job_id,
          post: posts[i]
        }).update({
          data: {
            img_path:img_path,
            user_id: cur_user.data[0]._id
          },
        })

      } else {
        //add
        console.log('add');
        await db.collection('sign_logs').add({
          data: {
            date: date,
            img_path:img_path,
            job_id: job_id,
            post: posts[i],
            sign_time:new Date(),
            user_id:cur_user.data[0]._id
          }
        })

      }

    }
    return {
      err: 0,
    }
  } else {
    return {
      err: 2,
    }
  }





}
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();
const _ = db.command;

exports.main = async (event, context) => {

    let {OPENID} = cloud.getWXContext();// 这里获取到的 openId 和 appId 是可信的
    let {date} = event;

    const cur_user = await db.collection('users').where({
        openid: OPENID,
    }).get();

    let jbxtInfo = [
        {name: '', openid: ''},//jb
        {name: '', openid: ''},//dp
        {name: '', openid: ''},//qw
        {name: '', openid: ''}//dd
    ];


    const user_date_dutys = await db.collection('dutys').where({
        date: date
    }).get();

    let dutys = user_date_dutys.data;

    if (dutys !== []) {

        for(var i=0,l=dutys.length;i<l;i++){

            let user = await db.collection('users').doc(dutys[i].user_id).get();

            let index = dutys[i].post - 1;
            console.log(user);
            jbxtInfo[index].name = user.data.name;
            jbxtInfo[index].openid = user.data.openid

        }
    }

    //有返回 adminUserInfo(date)
    if (cur_user === []) {

        return {
            is_reg: false,
            jbxtInfo: jbxtInfo,
            adminUserInfo: {
                openid: OPENID,
            },
        }
    }


    return {
        is_reg: true,
        jbxtInfo: jbxtInfo,
        adminUserInfo: {
            openid: OPENID,
            name: cur_user.data[0].name,
            can_sign: cur_user.data[0].can_sign
        },
    }

}
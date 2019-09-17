const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init()

const db = cloud.database()
exports.main = async(event, context) => {
  let {OPENID} = cloud.getWXContext();// 这里获取到的 openId 和 appId 是可信的
  let {
    date,post
  } = event;
  let the_post = post.post;
  const cur_user = await db.collection('users').where({
    openid: OPENID,
  }).get();

  function get_post(post) {
    if (post === 'jb') {
      return 1
    }
    if (post === 'dp') {
      return 2
    }
    if (post === 'qw') {
      return 3
    }
    if (post === 'dd') {
      return 4
    }
  }
  if (the_post !== []) {

    for(var i=0,l=the_post.length;i<l;i++){
      let post_number = get_post(the_post[i]);
      console.log(post_number);
      let duty = await db.collection('dutys').where({
        date: date,
        post: post_number,
      }).count();
      console.log(duty);
      if(duty.total !== 0) {
        //update
        console.log('update');
       await db.collection('dutys').where({
         date: date,
         post: post_number,
        }).update({
              data: {
                user_id: cur_user.data[0]._id
              },
            })
      } else {
        //insert
        console.log('insert');
        await db.collection('dutys').add({
          data: {
            date: date,
            post: post_number,
            user_id: cur_user.data[0]._id
          }
        })
      }

    }
  }

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
      jbxtInfo[index].name = user.data.name;
      jbxtInfo[index].openid = user.data.openid

    }
  }

  return jbxtInfo;
}
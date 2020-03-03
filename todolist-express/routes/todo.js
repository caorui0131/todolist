var express = require('express');
var router = express.Router();
//引用controller函数
const{
  getTodolists
}=require('../controller/todolist')
const{SuccessModel,ErrorModel}=require("../model/resModel")

const mysql=require('mysql')
const {MYSQL_CONF}=require('../conf/db')
const con=mysql.createConnection(MYSQL_CONF)

// 查询所有列表（无登录时）
router.get("/alllist",function(req, res, next){
  con.query(`select * from todolists;`,function(err,result){
    res.json(result)
  })
})

// const id=req.query.id
/* GET home page. */
router.get('/list', function(req, res, next) {
  // res.render('index', { title: 'Express' });

  // const id=req.query.id||''
  // res.json({
  //   data:[1,2,3]
  // })

  // const listdata=getTodolists(id)
  // return new SuccessModel(listdata)

  console.log(req.query.id)
  getTodolists(req.query.id,function(err,result){
    res.json(
      result
  )
  })//id是url的参数
  // console.log("1:",result)
    // return result.then(data => {
});

// 添加list值到数据库
router.post('/list', function(req, res, next) {
  var iptVal=req.body.iptVal;
  // console.log("cookie",req.cookies);
  var username=req.cookies.name;
  // console.log(username);
  // res.json()
  con.query(`insert into todolists (title,author) values ('${iptVal}','${username}');`)
});

// 删除id对应list值
router.post('/dellist', function(req, res, next) {
  var id=req.body.id;
  var cookie=req.cookies
  console.log("cookie",cookie);
  console.log(id);
  var username=req.cookies.name;
  con.query(`delete from todolists where id=${id} and author='${username}';`)
});

// 存储勾选状态为1
router.post('/checked', function(req, res, next) {
  var id=req.body.id;
  console.log(id);
  con.query(`update todolists set checked=1 where id=${id};`)
});
// 存储勾选状态为0
router.post('/list4', function(req, res, next) {
  var id=req.body.id;
  console.log(id);
  con.query(`update todolists set checked=0 where id=${id};`)
});
// =原alllist
// router.get("/list3",function(req, res, next){
//   con.query(`select * from todolists;`,function(err,result){
//     res.json(result)
//   })
// })
// 修改编辑list
router.post("/editlist",function(req, res, next){
  var id=req.body.id;
  console.log("req.body:",req.body)
  console.log("id:",id);
  var iptVal=req.body.iptVal;
  console.log("iptVal:",iptVal);
  var username=req.cookies.name;
  con.query(`update todolists set title='${iptVal}' where id='${id}' and author='${username}';`)
})
// 根据登录的username查询对应的list
router.get("/loginlist",function(req, res, next){
  // var username=req.query.username
  var username=req.cookies.name;
  console.log("req.query:",req.query)
  console.log("username:",username)
  con.query(`select id,title,checked,author from todolists 
  where author='${username}';`,function(err,result){
    // console.log(result)
    res.json(result)
  })
})
// 检查登录信息
router.post("/login",function(req, res, next){
  var username=req.body.username
  var password=req.body.password
  console.log("username:",username)
  con.query(`select username,password from user where username='${username}'and password='${password}';`,function(err,result){
    console.log("result:",result)
    if(result&&result.length>0){
      // res.setHeader('Set-Cookie',`name=${username};path=/;httpOnly;`)
      // response.addHeader("Set-Cookie", `name=${username}; Path=/; HttpOnly`);
      // res.cookie('name',username,{path:'/',expires: new Date(Date.now()+900000),httpOnly:true})
      console.log('setHeader')
      res.json(result[0])
      console.log('result[0]:',result[0])
    }else{
      res.json(null);
    }
    
  })
})
// select title,checked,username,`password`,realname from todolists,user where todolists.author=user.username
module.exports = router;

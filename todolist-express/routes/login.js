var express = require('express');
var router = express.Router();

const mysql=require('mysql')
const {MYSQL_CONF}=require('../conf/db')
const con=mysql.createConnection(MYSQL_CONF)

// 检查登录信息
router.post("/login",function(req, res, next){
    try{
        var username=req.body.username
        var password=req.body.password
        console.log("username:",username)
    }catch(err){
        res.json({code:500});
    }
    var username=req.body.username
    var password=req.body.password
    console.log("username:",username)
    con.query(`select username,password from user where username='${username}'and password='${password}';`,function(err,result){
      console.log("result:",result)
      if(result&&result.length>0){
        // res.setHeader('Set-Cookie',`name=${username};path=/;httpOnly;`)
        // response.addHeader("Set-Cookie", `name=${username}; Path=/; HttpOnly`);
        // 同时设2个cookie，取前端能改的name2展示前端页面（改了也无所谓因为 取不到后端的值），取前端改不了的cookie的username查询用户列表
        res.cookie('name',username,{path:'/',expires: new Date(Date.now()+900000),httpOnly:true})
        res.cookie('name2',username,{path:'/',expires: new Date(Date.now()+900000)})
        console.log('setHeader')
        res.json(result[0])
        console.log('result[0]:',result[0])
      }else{
        res.json(null);
      }
      
    })
})

router.post("/logout",function(req, res, next){
    res.cookie('name','',{path:'/',expires: new Date(Date.now()-1000),httpOnly:true})
    res.cookie('name2','',{path:'/',expires: new Date(Date.now()-1000)})
    res.json("logout 成功")
})

module.exports = router;
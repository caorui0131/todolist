const mysql=require('mysql')
const {MYSQL_CONF}=require('../conf/db')

// 创建链接对象
const con=mysql.createConnection(MYSQL_CONF)

//  开始链接
con.connect()

// 统一执行sql的函数，并返回
function exec(sql,callback){
    // const promise=new Promise((resolve,reject)=>{
        // con.query(sql, (err, result) => {//执行查询
        //     // if (err) {
        //     //     console.error(err)
        //     //     return
        //     // }
        //     // console.log(result)
        //     if (err) {
        //         reject(err)
        //         return
        //     }
        //     resolve(result)
        // })
    // })
    // return promise
    con.query(sql,callback)
}

// 不关闭链接
//不关闭数据库链接，才可重复访问数据库；con是单例链接，只用创建1次，保存在内存中不用再断开连接，即可重复引用


module.exports={
    exec,
    escape: mysql.escape
}
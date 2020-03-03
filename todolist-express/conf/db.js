// 获取环境变量
const env=process.env.NODE_ENV

// 配置
let MYSQL_CONF
if (env==='dev') {
    MYSQL_CONF={
        host:"localhost",
        user:"root",
        password:"Cr18811657411",
        port:"3306",
        database:'todolist'
        }
}
if(env==='production'){
    MYSQL_CONF={
        host:"localhost",
        user:"root",
        password:"Cr18811657411",
        port:"3306",
        database:'todolist'
        }
}
module.exports={
    MYSQL_CONF
}
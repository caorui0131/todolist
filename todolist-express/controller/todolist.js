const {exec}=require('../db/mysql')

const getTodolists=(id,callback)=>{
    //先返回假数据
    // return[
        // {
        //     id:1,
        //     title:"标题A",
        //     createTime:1577174238163,
        //     author:"zhangsan"
        // }
        
    // ]

    // const sql=`select * from todolists;`
    const sql=`select * from todolists where id='${id}';` 
    console.log("3:",sql)
    
    exec(sql,callback)
    //把返回的数组变成对象的形式

}

module.exports={
    getTodolists
}
// 建数据模型(SuccessModel ErrorModel)

// 新建基类
class BaseModel{
    // 想要data是对象，message是字符串，做data是字符串message是没传的兼容性
    constructor(data,message){
        if(typeof data==="string"){
            this.message=data
            data=null
            message=null
        }
        if(data){
            this.data=data
        }
        if(message){
            this.message=message
        }
    }
}
// SuccessModel继承BaseModel
class SuccessModel extends  BaseModel{
    constructor(data,message){
        // 父类的构造函数
        super(data,message)
        this.errno=0
    }
}
class ErrorModel extends BaseModel{
    constructor(data,message){
        super(data,message)
        this.errno=-1
    }
}
module.exports={
    SuccessModel,
    ErrorModel
}

const mongoose = require('mongoose');
const Schema = mongoose.Schema

//链接数据库
mongoose.connect('mongodb://127.0.0.1/zyqa');

//获取数据库链接
const conn = mongoose.connection;

//监听数据库链接事件
conn.on('connected',()=>{console.log('数据库链接成功')})

//创建数据模型
//数据模型是表示一个事物的对象（类）
//在计算机中通常会使用模型来代表一类事物
//模型中包含与该类事物相关的数据和功能
//数据会变成模型中的属性
//功能会变成模型中的方法（函数）
//第一个参数表示模型的数据所在的集合
//第二个参数表示模型的数据都有哪些属性，及这些属性的数据类型

exports.toData = function(m){
    m = m.toObject()
    m.id = m._id.toString()
    delete m._id
    return m
}
//通过数据库返回的models中的model并不是纯数据
            //通过map方法将每一个model都转换成纯数据，并处理内部的_id,
            //将之转换成字符串
exports.toDatas = function(models){
    return models.map(m=>exports.toData(m))
}
const userSchema = Schema({
    account:String,
    password:String,
    photo:String,
    createTime:Date,
    ip:String,
})

const keywordSchema = Schema({
    text:String,
    createUser:{
        type:Schema.Types.ObjectId,
        ref:'createUser'
    },
    createTime:Date,
    ip:String
})
const questionSchema = Schema({
    text:String,
    keyword:String,
    createUser:{
        type:Schema.Types.ObjectId,
        ref:'createUser'
    },

    createTime:Date,
    ip:String

})


exports.Question = mongoose.model('questions',questionSchema)
exports.Question = mongoose.model('keywords',keywordSchema)
exports.Question = mongoose.model('users',userSchema)

const express = require('express')
const db = require('../../db')
const tools = require('../../tools')

const router = express.Router()

router.get('/user/register',(req,res)=>{
    res.render('user/register')
})
router.post('/api/user/register',(req,res)=>{
    db.User.find({account:req.body.account})
    .count(function(err,count){
       if(count>0){
           res.json({code:'fail',message:'此账号已被注册'})
       }else{
          req.body.createTime = new Date()
          req.body.ip = tools.formatIP(req.ip)
    
    //使用数据模型类创建一个用户对象，并且填充数据
    var user = new db.User(req.body)
    
    //调用save方法将数据保存到数据库中
    //数据模型表示一类事物，它可以包含数据，还包含响应的数据操作方法
    user.save(function(err,model,count){
        if(err){
            res.json({code:'error',message:'服务端错误，请稍后再试'})
        }else{
            res.json({code:'success',message:'注册成功！'})
        }
    })
       }
    })

    
})
module.exports = router
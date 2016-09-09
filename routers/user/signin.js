const express = require('express');
const db = require('../../db.js')

const router = express.Router();
router.get('/user/signin',(req,res)=>{
    res.render('user/signin')
});
router.post('/api/user/signin',(req,res)=>{
//  console.log(req.body)
//在数据库中查找用户账号是否存在
//如果存在，检查密码是否正确
//如果用户不存在或密码错误，则返回错误提示
//如果存在且密码正确，则登陆成功
var filter = {
    account:req.body.account,
    password:req.body.password,
}

  db.User.find(filter,{
      account:1,photo:1,createEime:1,ip:1
  }).exec(function(err,models){
      if(err){
          //把一个对象序列化为json字符串返回给浏览器
          res.json({code:'error',message:'服务端错误，请稍后再试'})
      }else{
          if(models.length>0) {
              //设置cookie，还支持更多参数，允许设置cookie的范围，cookie的过期时间
              //设置的cookie会通过响应头中的Set-Cookie头发送到浏览器，浏览器再发起请求头，
              //会自动在请求头中的Cookie中的携带没有过期的cookie
              //因为cookie会自动往返于浏览器和服务器之间
              //所以经常用来保存用户登陆令牌
              //也因为这个原因，cookie只能保存小量数据，以免消耗太多的网路带宽
              res.cookie('account',req.body.account)
              res.cookie('user',db.toData(models[0]))
             res.json({code:'success',message:'登陆成功！'})
          }else{
              res.json({code:'fail',message:'账号或密码错误！'})
          }
      }
  })
})



module.exports = router
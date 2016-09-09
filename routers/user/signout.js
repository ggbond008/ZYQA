const express = require('express');
const router = express.Router();

router.get('/user/signout',(req,res)=>{
    //退出时清楚cookie
    res.clearCookie('account')
    //浏览器重定向到的统一资源定位符 (URL)
    res.redirect('/')
})

module.exports = router
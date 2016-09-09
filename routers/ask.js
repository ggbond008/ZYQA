const express = require('express');
const db = require('../db');
const tools = require('../tools');
const router = express.Router();

//tools.signin拦截请求，检查用户是否登陆
router.get('/ask', tools.signin, (req, res) => {
    db.Keyword.find().exec((err, models) => {
        if (err) {
            res.render('error', err)
        } else {
            res.render('ask', { keywords: db.toDatas(models) })
        }
    })




})

router.post('/api/keyword/add', tools.signin, (req, res) => {
    db.Keyword.find({ text: req.body.text })
        .count((err, count) => {
            if (err) {
                res.json({ code: 'error', message: '服务端错误，请稍后再试！' })
            } else {
                if (count > 0) {
                    res.json({ code: 'exist', message: '关键词已存在' })
                } else {
                    
                    req.body.createUser = req.cookies.user.id
                    req.body.createTime = new Date()
                    req.body.ip = tools.formatIP(req.ip)

                    var keyword = new db.Keyword(req.body)
                    keyword.save(function (err, model, count) {
                        if (err) {
                            res.json({ code: 'error', message: '服务端错误，请稍后再试' })
                        } else {
                            res.json({ code: 'success', message: '添加成功' })
                        }
                    })



                }
            }
        })




})

router.post('/api/ask/add',tools.signin,(req,res)=>{
    req.body.createUser = req.cookies.user.id
    req.body.createTime = new Date()
    req.body.ip = tools.formatIP(req.ip)

    var question = new db.Question(req.body)
    question.save((err,model)=>{
        if(err){
            res.json({code:'error',message:'服务端错误，请稍后再试'})
        }else{
            res.json({code:'success',message:'添加成功'})
        }
    })
})



module.exports = router
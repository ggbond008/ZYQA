const express = require('express');
const db = require('../db.js')
const router = express.Router();
router.get('/',(req,res)=>{
    db.Question.find().sort({createTime:-1}).populate({
        path:'createUser',
        select:'-password'
    }).exec((err,models)=>{
        if(err){
             res.render('error',err)
        }else{

            console.log(db.toDatas(models))
             res.render('index',{
                 account:req.cookies.account,
                 questions :db.toDatas(models)
                })
        }
    })
})
module.exports = router;
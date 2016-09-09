const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const template = require('./template.js');
const app = express();

//处理视图引擎
app.engine('.html',template.__express)
app.set('view engine','html')

//处理静态资源请求
app.use(express.static('www'));

//提取请求体中urlencoded格式的数据到req.body中
app.use(bodyParser.urlencoded({extended:true}))

//提取请求头中的cookie头，将cookie数据放到req.cookies中
app.use(cookieParser())

//处理页面请求
app.use(require('./routers/index'))
app.use(require('./routers/user/signin'))
app.use(require('./routers/user/register'))
app.use(require('./routers/user/signout'))
app.use(require('./routers/ask'))




//监听端口---------------------------------------------------
app.listen(3000,()=>{console.log('正在运行...')})

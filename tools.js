exports.formatIP = function (ip) {
    if (ip.startsWith('::1')) {
        return '127.0.0.1'
    }
    if (ip.startsWith('::ffff:')) {
        return ip.substr(7)
    }
    return ip
}
exports.signin = function(req,res,next){
    if(req.cookies.account){
        next()
    }else{
        // req.xhr用来判断是否时ajax请求
        //ajax请求不会刷新页面，所以无法重定向到登陆页面
        //所以返回JSON提示信息
        if(req.xhr){
            res.json({code:'not signin',message:'登陆超时，请重新登陆！'})
        }else{
            res.redirect('/user/signin')
        }
    }

}
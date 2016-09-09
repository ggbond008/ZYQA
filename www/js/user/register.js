$('form').submit(function(ev){
    ev.preventDefault();
    var data = $(this).serialize();
    $.ajax({
        url:'/api/user/register',
        data:data,
        type:'POST',
        dataType:'JSON'
    }).done(function(res){
        alert(res.message)
        if(res.code=='success'){
            location.href = '/'
        }
    }).fail(function(){
        alter('网络链接失败，请稍后再试')
    })

})
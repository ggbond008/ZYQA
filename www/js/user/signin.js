$('form').submit(function(ev){
 ev.preventDefault()
 //serialize提取表单数据，并转换成urlencoded格式
 //name1=value1&name2=value2...
 var data = $(this).serialize()
    //  console.log(data)
    $.ajax({
        url:'/api/user/signin',
        data:data,
        type:'POST',
        dataType:'JSON',

    })
    //表示请求成功
    .done(function(res){
      alert(res.message)
      if(res.code=='success'){
          location.href = '/'
      }
    })
    //表示请求失败，通常是无法链接到服务器
    .fail(function(){
        alert('网络链接失败，请稍后再试')
    })
})
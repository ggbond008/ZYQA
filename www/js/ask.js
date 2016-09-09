function addKeyword(){
   var keyword = prompt('请填写要添加的关键词：','')
   keyword = keyword.trim()
   
   if(keyword){
       $.ajax({
           url:'/api/keyword/add',
           data:{text:keyword},
           type:'POST',
           dataType:'json',

       }).done(function(res){
           alert(res.message)
           if(res.code == 'success'){
               $('<li>'+ keyword +'</li>').appendTo('ul')
           }
       }).fail(function(){
           alert('链接失败，请稍后再试')
       })
   }
}

$('li').click(function(){
    $(this).addClass('selected')
    .siblings().removeClass('selected')
    
})
$('form').submit(function(ev){
    ev.preventDefault()

  var keyword = $('li.selected').first().text()
      if(keyword){
         var text = $('textarea').val().trim()//trim()去掉前后空格
         if(text){ 
           $.ajax({
               url:'/api/ask/add',
               data:{keyword,text},
               type:'POST',
               dataType:'json'
           }).done(function(res){
              
               alert(res.message)
               if(res.code == 'success'){
                   location.href = '/'
               }
           }).fail(function(jqXHR){
               alert('网络链接失败，请稍后再试')
                console.log(arguments)
                console.log(jqXHR.getAllResponseHeaders())
                console.log(jqXHR.getResponseHeader('Content-Type'))
                console.log(jqXHR.responseText)
           })
         }else{
             alert('请填写问题')
         }
      }else{
         alert('请选择一个关键词')
      }
})
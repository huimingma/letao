$(function(){
   $.ajax({
       url:'/employee/checkRootLogin',
       type:'get',
       dataType:'json',
       success:function(info){
        // console.log(info);
        if(info.error===400){
            // 未登录 返回登录页面
            location.href='login.html';
        }
        if(info.success){
            console.log('当前用户已经登录过了');
        }
       }
   })

})
// 判断是否登录过
$(function(){
    $.ajax({
        url:'/employee/checkRootLogin',
        type:'get',
        dataType:'json',
        success:function(info){
            // console.log(info);
            if(info.success){
                console.log('用户已经登录过了');
            }
            if(info.error==400){
                location.href='login.html';
            }
        }
    })
})
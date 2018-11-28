// 进度条功能
$(document).ajaxStart(function(){
    NProgress.start();
});

$(document).ajaxStop(function(){
    // 模拟真实环境

   setTimeout(function(){
       NProgress.done();
   },500);
});

$(function(){
    // 1、二级菜单的切换
    $('.mange').click(function(){
        $(this).next().stop().slideToggle(); 
    })
    // 2、左侧侧边栏切换
    $('.icon-left').click(function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_right .top').toggleClass('hidemenu');
        $('.lt_right ').toggleClass('hidemenu');
    })

    // 模态框的选中与取消
    $('.icon-right').click(function(){
        $('#myModal').modal('show');
    })

    // 选中确定按钮，发送ajax请求，退出
    $('.back').click(function(){
        $.ajax({
            url:'/employee/employeeLogout',
            type:'get',
            dataType:'json',
            success:function(info){
                console.log('成功退出了');
                location.href='login.html';
            }
        })
    })
})
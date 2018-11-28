// NProgress.start(); //开启进度条

// setTimeout(function(){
//     NProgress.done(); //关闭进度条
// },2000);

/**
 * 需求：
 * 第一天ajax发送的时候，开启进度条
 * 等待所有的ajax都完成后，关闭进度条
 * 
 * ajax全局事件
 * 
 * .ajaxComplete() 每个ajax完成时调用（不管是成功还是失败）
 * .ajaxSuccess()  每个ajax只要成功完成就会调用
 * .ajaxError()    每个ajax只要失败就会调用
 * .ajaxSend()     在每个ajax 发送前调用
 * 
 * .ajaxStart()    在第一个ajax请求开始时调用
 * .ajaxStop()     在所有的ajax请求都完成时调用
 */

 $(document).ajaxStart(function(){
    //  开启进度条
    NProgress.start();
 })

 $(document).ajaxStop(function(){
    //  模拟网络延迟,真实开发中一般会有300~500毫秒的延迟
     setTimeout(function () { 
         NProgress.done();
      },1000)
    // NProgress.done();
 });


 $(function(){
    //  1、左侧的二级菜单的切换
    $('.category').click(function(){
        $(this).next().stop().slideToggle();
    })

    // 2、左侧侧边栏切换
    $('.icon_left').click(function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_main').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
    })

    // 3、退出功能
    //   1、点击右侧按钮，显示模态框
    $('.icon_right').click(function(){
        $('#logoutModal').modal('show');
    })

        // 2、点击退出模态框的退出按钮，完成退出功能
    $('#logoutBtn').click(function(){

        // 发送ajax请求，让后台销毁当前用户的登录状态
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
                if(info.success){
                    // 退出成功了，跳转登录页
                    location.href="login.html";
                }
            }
        })

    })

 })
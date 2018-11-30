// 加载进度条  不需要放在函数里面
$(document).ajaxStart(function () {
    NProgress.start();
});

$(document).ajaxStop(function () {
    setTimeout(function () {
        NProgress.done();
    }, 500);
});
// console.log(123);


$(function () {
    // 左边侧边栏的切换
    $('.icon_left').click(function () {
        $('.left_aside').toggleClass('hidemenu');
        $('.right_aside .right_head').toggleClass('hidemenu');
        $('.container-fluid').toggleClass('hidemenu');
    })

    //二级菜单的切换
    $('.category').click(function () {
        $('.category .child').stop().slideToggle();
    })

    // 点击模态框确认按钮，退出模态框
    $('.icon_right').click(function () {
        $('#myModal').modal('show');
    })
    //发送ajax请求，销毁账号
    $('.confirm').click(function () {
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    // 登出成功 回到登录页面
                    location.href = 'login.html';
                }
            }
        })
    })

})
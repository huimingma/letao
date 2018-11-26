$(function () {
    // 1、初始化表单校验
    // 用户名不能为空  长度2~6
    // 用户密码不能为空  长度6~12

    $('#form').bootstrapValidator({
        // 指定校验字段
        fields: {
            // 校验用户名
            username: {
                // 不能为空
                notEmpty: {
                    message: '用户名不能为空哦！'
                },
                // 长度校验
                stringLength: {
                    min: 2,
                    max: 6,
                    message: "用户名必须在2~6位之间"
                }
            },
            password: {
                // 不能为空
                notEmpty: {
                    message: '密码不能为空哦！'
                },
                // 长度校验
                stringLength: {
                    min: 6,
                    max: 12,
                    message: '密码必须在6~12位之间'
                }
            }

        },

        // 指定校验时的图标显示，默认是bootstrap的风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
    })

    // 2、表单校验成功时，会自动提交表单，需要阻止表单的默认提交，然后利用ajax进行提交
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();
        // return false;  也可以阻止表单的自动提交，但是用在这里没有语义化 一般不会使用的
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $('#form').serialize(),
            dataType: 'json',
            success:function(info){
                console.log(info);
                if(info.error === 1000){
                    alert('用户名不存在');
                    return;
                }
                if(info.error === 1001){
                    alert('密码错误');
                    return;
                }if(info.success){
                    // 登录成功
                    location.href= 'index.html';
                }

            }
        })
    });

    // 3、重置功能
    $('[type="reset")').click(function(){
    $('#form').data('bootstrapValidator').resetForm();
        
    })
})




   


$(function () {
    /*
     1、校验用户名，密码
        用户名 不能为空   长度 2~ 6
        密码不能为空      长度 6~12
    */


    $('#form').bootstrapValidator({
        // 设置图标样式，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        // 设置校验规则
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: "用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: "用户名的长度在2~6位之间"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度在6~12位之间'
                    }
                }
            }
        }
    })

    /**
     * 2、表单校验成功，注册表单校验成功事件，阻止默认提交，使用ajax提交
     */

    $('#form').on("success.form.bv", function (e) {
        e.preventDefault();
        // 使用ajax提交
        $.ajax({
            url: "/employee/employeeLogin",
            data: $('#form').serialize(),
            dataType: 'json',
            type: 'post',
            success: function (info) {
                // console.log(info);
                if (info.error === 1000) {
                    alert('用户名不存在');
                    return;
                }
                if (info.error === 1001) {
                    alert("密码错误");
                    return;
                }
                if (info.success) {
                    location.href = "index.html";
                }
            }
        })
    })

    /**
     * 3、重置功能 ，reset本身就可以重置内容，但是不能重置状态，需要额外的去重置状态
     * 
     */
    $("[type='reset']").click(function () {
        // $('#form').data('bootstrapValidator').resetForm();
        // $('#form').bootstrapValidator({});

        // $("#form").bootstrapValidator(options);
        $("#form").bootstrapValidator();
        //  $("#form").bootstrapValidator({resetFormData:true});
        // $("#form").data('bootstrapValidator').resetForm();

    })

})
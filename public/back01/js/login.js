$(function () {
  //1、进行表单验证
  $('#form').bootstrapValidator({
    //指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 指定校验字段
    fields: {
      // 校验用户名
      username: {
        validators: {
          notEmpty: {
            message: '用户名不能为空哦！'
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须在2~6位之间',
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '请输入密码'
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须在6~12位之间'
          },
          callback:{
            message:'密码错误'
          }
        }
      }
    }
  });

  //2、校验成功后，会触发表单成功事件
  // 我们需要注册表单校验成功事件，在成功事件中，阻止默认的提交，通过ajax提交

  $('#form').on('success.form.bv', function (e) {
    // 阻止默认的提交
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: '/employee/employeeLogin',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.error === 1000) {
          $('#form').data('bootstrapValidator').updateStatus('username','INVALID','callback');
          return;
        }
        if (info.error === 1001) {
          $('#form').data('bootstrapValidator').updateStatus('password',"INVALID",'callback');
          return;

        }
        if (info.success) {
          console.log(123);
          location.href = 'index.html';
        }
      }
    })
  });

  //3、重置功能
  $("[type='reset']").click(function () {
    $('#form').data('bootstrapValidator').resetForm();
  })
});
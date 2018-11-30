$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                // 如果模版里面用的是list这里要重新定义一下对象
                // var htmlStr=template('firstTmp',{
                //     list:info.rows,
                //     page:info.page,
                //     size:info.size,
                // });
                var htmlStr = template('firstTmp', info);
                $('tbody').html(htmlStr);

                // 拿到数据，进行分页初始化
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 给页码添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染
                        render();
                    }

                })
            }
        })
    }

    //2、点击添加按钮，显示模态框
    $('.confirm').click(function () {
        console.log(123);
        // 显示模态框
        $('#addModal').modal('show');
    });

    //3、进行表单校验
    $('form').bootstrapValidator({
        // 配置校验图标：
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        // 校验字段
        fields:{
            //对应input框的name值
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类名",
                    }
                }
            }
        }
    });

    // 注册表单验证成功事件 阻止表单的默认提交 ，通过ajax提交
    $('#form').on('success.form.bv',function(e){
        e.preventDefault();

        // 通过ajax提交
        $.ajax({
            url:'/category/addTopCategory',
            type:'post',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                // console.log(info);
                if(info.success){
                    // 关闭模态框
                    $('#addModal').modal('hide');
                    // 渲染第一页
                    currentPage=1;
                    // 重新渲染一下
                    render();

                    // 重置一下表单
                    // 不加参数，只重置状态，不重置内容
                    $('#form').data('bootstrapValidator').resetForm(true);
                }
            }
        }) 
    })
})
$(function () {

    var currentPage = 1;
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);

                var htmlStr = template('firstTmp', info);
                $('tbody').html(htmlStr);

                // 数据回来进行分页
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),

                    // 给页码添加点击事件、
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


    // 点击添加按钮，显示模态框
    $('.addCategory').click(function () {
        $('#addModal').modal('show');
    });

    // 进行表单校验
    $('#form').bootstrapValidator({
        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        // 校验字段
        fields: { // input框中需要配置 name
            categoryName: {
                validators: {
                    notEmpty: {
                        message: "请输入一级分类名称"
                    }
                }
            }
        }
    });


    // 注册表单校验事件
    $('#form').on("success.form.bv", function( e ) {
        e.preventDefault(); 
        // console.log(22);
        $.ajax({
            url: "/category/addTopCategory",
            data: $('#form').serialize(),
            dataType: "json",
            type:'post',
            success: function (info) {
                console.log(info);
                if (info.success) {
                    // 关闭模态框
                    $('#addModal').modal('hide');
                    // 重新渲染第一页
                    currentPage = 1;
                    render();

                    // 重置表单内容和状态
                    $('#form').data('bootstrapValidator').resetForm(true);
                }
            }
        })
    })

   
})
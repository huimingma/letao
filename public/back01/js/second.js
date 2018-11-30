$(function () {

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            type: 'get',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('secondTpl', info);
                $('tbody').html(htmlStr);

                // 初始化分页插件
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),
                    // 添加页面点击事件
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        // 重新渲染
                        render();
                    }

                })
            }
        })
    }

    //2、 点击添加分类按钮，显示模态框
    $('.addCategory').click(function () {
        $('#addModal').modal('show');


        // 发送ajax请求，获取一级分类的全部信息
        // 通过写死page和pageSize，模拟获取全部一级分类的接口
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 10
            },
            type: 'get',
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('dropdownTpl', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    });

    // 3、给下拉列表的 a 添加点击事件（事件委托）
    $('.dropdown-menu').on('click', 'a', function () {
        // 获取文本值
        var txt = $(this).text();
        // 设置给按钮
        $('#dropdownText').text(txt);

        // 获取id
        var id = $(this).data('id');
        // 设置给隐藏域
        $('[name="categoryId"]').val(id);

        // 调用updateStatus更新隐藏域，校验状态成VALID
        $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');

    });

    // 4、配置文件上传插件，让插件发送异步文件上传请求
    $('#fileupload').fileupload({
        dataType: 'json',
        // done表示文件上传完成的回调函数
        done: function (e, data) {
            console.log(data.result); //后台返回的对象

            // 后台返回的数据
            var picObj = data.result;
            // 获取图片地址，设置给img src
            var picUrl = picObj.picAddr;
            $('#imgBox img').attr('src', picUrl);

            // 给隐藏域设置图片地址
            $('[name="brandLogo"]').val(picUrl);

            // 调用updateStatus更新 隐藏域 校验状态成 VALID
            $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    });
    

    // 5、添加表单校验功能
    $('#form').bootstrapValidator({
        //重置排除项，都校验，不排除
        excluded: [],

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },
        // 指定校验字段
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },
            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入二级分类名称',
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请上传图片",
                    }
                }
            }
        }
    })
})
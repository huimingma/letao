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

                var htmlStr = template('secondTmp', info);
                $('tbody').html(htmlStr);

                // 初始化分页插件
                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),

                    // 给页码注册点击事件
                    onPageClicked: function (a, b, c, page) {
                        // console.log(page);
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
    $('.confirm').click(function () {
        $('#addModal').modal('show');


        // 发送请求，模拟获取一级分类的所有数据，通过写死page和pageSize
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: 1,
                pageSize: 10,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('dropdownTpl', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    });


    // 给下拉列表a添加点击事件（通过事件委托）
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
        // $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
    });

    //图片上传
    $('#fileupload').fileupload({
        dataType: 'json',
        // done表示文件上传完成的回调函数
        done: function (e, data) {
            console.log(data.result);

            // 后台返回的数据
            var picObj = data.result;
            // 获取图片地址，设置给img 的src
            var picUrl = picObj.picAddr;
            $('#imgBox img').attr('src', picUrl);
            // 给隐藏域设置图片地址
            $('[name="brandLogo"]').val(picUrl);

            // 调用updateStatus更新隐藏域，校验状态成VALID
            // $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
        }
    })




    //  添加表单校验功能
    $('#form').bootstrapValidator({
        // 重置排除项, 都校验, 不排除
        excluded: [],

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        // 指定校验字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: "请选择一级分类"
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: "请输入二级分类名称"
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: "请上传图片"
                    }
                }
            }
        }
    })

})
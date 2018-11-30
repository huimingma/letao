$(function () {
    var currentPage = 1;
    var pageSize = 5;

    // 专门用于存储提交的图片的对象
    var picArr = [];
    render();

    function render() {
        $.ajax({
            url: '/product/queryProductDetailList',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('productTmp', info);
                $('tbody').html(htmlStr);

                $('#paginator').bootstrapPaginator({
                    // 主版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),

                    onPageClicked: function (a, b, c, page) {
                        console.log(page);
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }

    // 此步骤出错
    // //2、给所有的按钮添加点击事件（事件委托） 
    // $('tbody').on('click','.btn',function(){
    //     $('#userModal').modal('show');

    //     // currentId=$(this).parent().attr('id');

    //     // 点击模态框确认按钮，发送ajax请求
    //     $('#confirmBtn').click(function(){
    //         console.log(123);
    //         $.ajax({
    //             url:'/product/addProduct',
    //             type:'post',
    //             typeType:'json',
    //             data:$('#form').serialize(),
    //             success:function(info){
    //                 console.log(info);
    //             }
    //         })
    //     })
    // })

    //3、点击添加按钮，显示模态框
    $('.addProduct').click(function () {
        $('#addProductModal').modal('show');

        // 发送ajax请求，获取所有二级分类的数据
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            dataType: 'json',
            data: {
                page: 1,
                pageSize: 10,
            },
            success: function (info) {
                // console.log(info);
                var htmlStr = template('dropdownTmp', info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    });


    // 4、给下拉列表a添加点击事件（事件委托）
    $('.dropdown-menu').on('click', 'a', function () {
        // 获取文本，赋值给按钮
        var txt = $(this).text();
        $('#dropdownText').text(txt);

        // 获取id，赋值给隐藏域
        var id = $(this).data('id');
        $('[name="brandId"]').val(id);

        // 将隐藏域的状态改成VALID
        // $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
    });

    // 5.配置文件上传
    $('#fileupload').fileupload({
        // 返回回来的数据类型
        dataType: 'json',
        // 文件上传完成时的回调函数
        done: function (e, data) {
            // console.log(data.result);
            var picObj = data.result;

            // 将上传的图片添加到数组的最前面
            picArr.unshift(picObj);

            // 图片地址
            var picUrl = picObj.picAddr;
            // console.log(picUrl);

            $('#imgBox').prepend('<img src="' + picUrl + '" style="width: 100px;">');

            // 如果长度超过3需要将最后的一个移除
            if (picArr.length > 3) {
                // 删除数组最后一项
                picArr.pop();
                // 删除最后一张
                $('#imgBox img:last-of-type').remove();
            }

            // 如果文件上传满了3张，picStatus校验状态，更为VALID
            if (picArr.length == 3) {
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");

            }
        }
    });

    // 6. 添加表单校验
    $('#form').bootstrapValidator({
        // 重置排除项, 都校验, 不排除
        excluded: [],

        // 配置校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok', // 校验成功
            invalid: 'glyphicon glyphicon-remove', // 校验失败
            validating: 'glyphicon glyphicon-refresh' // 校验中
        },

        // 配置校验字段
        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: "请选择二级分类"
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: "请输入商品名称"
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: "请输入商品描述"
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: "请输入商品库存"
                    },
                    //正则校验
                    // \d  0-9
                    // ?   0次或1次
                    // +   1次或多次
                    // *   0次或多次
                    // {n,m}  出现n次到m次
                    // {n}  出现n次
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '商品库存格式, 必须是非零开头的数字'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: "请输入商品尺码"
                    },
                    //正则校验
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '尺码格式, 必须是 xx-xx格式, xx为两位数字, 例如 36-44'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: "请输入商品原价"
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: "请输入商品现价"
                    }
                }
            },
            picStatus: {
                validators: {
                    notEmpty: {
                        message: "请上传3张图片"
                    }
                }
            }
        }
    });

    // 7、注册一个表单验证成功事件，阻止表格默认提交
    $('#form').on('success.form.bv', function (e) {
        e.preventDefault();

        var paramStr = $('#form').serialize();

        //  注意拼接上图片的数据
        paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
        paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
        paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;

        $.ajax({
            url: "/product/addProduct",
            type: 'post',
            data: paramStr,
            dataType: 'json',
            success: function (info) {
                // console.log(info);

                // 关闭模态框
                if (info.success) {
                    $('#addProductModal').modal('hide');

                    currentPage = 1;
                    render();

                    // 重置内容和状态
                    $('#form').data("bootstrapValidator").resetForm(true);

                    // 按钮文本和图片需要手动重置
                    $('#dropdownText').text("请选择二级分类");
                    $('#imgBox img').remove();
                    picArr = [];
                }
            }
        })
    })




})
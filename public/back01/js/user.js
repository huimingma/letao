$(function () {

    var currentId;
    var isDelete;

    // 当前页
    var currentPage = 1;
    // 每条页数
    var pageSize = 5;
    render();

    function render() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            dataType: 'json',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                // 如果前面写的是list,后面要写对象的具体属性
                // var html=template('tmp',{list:info.rows});

                var htmlStr = template('tmp', info);
                $("tbody").html(htmlStr);

                $('#paginator').bootstrapPaginator({
                    // 版本号
                    bootstrapMajorVersion: 3,
                    // 当前页
                    currentPage: info.page,
                    // 总页数
                    totalPages: Math.ceil(info.total / info.size),

                    // 给页码添加点击事件
                    onPageClicked: function (a, b, c, page) {

                        // console.log(page);
                        // 更新当前页
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }


    // 给所的按钮添加点击事件，通过事件委托

    $('tbody').on('click', '.btn', function () {
        $('#userModal').modal('show');

        currentId = $(this).parent().data('id');
        // console.log(currentId);

        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    });

    // 模态框确认按钮确定，发送ajax请求
    $('#confirmBtn').click(function () {
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: currentId,
                isDelete: isDelete,
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                if (info.success) {
                    // 关闭模态框
                    $('#userModal').modal('hide');
                    // 重新渲染
                    render();
                }
            }
        })
    })
})
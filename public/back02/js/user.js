$(function () {
    //发送ajax请求，获取数据，返回前端，渲染出页面
    var currentPage = 1;
    var pageSize = 5;

    var userId; 
    // 用户id
    var isDelete;
    // 获取按钮是否包含btn-danger

    render();

    function render() {
        $.ajax({
            url: '/user/queryUser',
            type: 'get',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            success: function (info) {

                // console.log(info.rows);
                // console.log(info);
                // var html = template('userTmp', {
                //     list: info.rows,
                //     page:info.page,
                //     size:info.size
                // }); //注意：这里放的是对象  模版引擎里面的page和size也要重新定义不然获取不到  

                var html = template('userTmp', info); //注意：这里放的是对象

                $("tbody").html(html);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: info.page,
                    //当前页
                    totalPages: Math.ceil(info.total / info.size),
                    //总页数
                    size: "large",
                    //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (a, b, c, page) {
                        // page 当前点击的页码
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                });
            }
        })
    }

    // 自己写的想通过id获取设置，出错了
        // $('tbody').on('click','button',function () {
        //     // console.log($(this).parent().attr('data-id'));
        //     var tid=$(this).parent().attr('data-id');
        //     console.log(tid);
        //     // 让模态框显示
        //     $('#logoutModal2').modal('show');
        //    ($('#logoutModal2 #logoutBtn')).click(function(){  
        //     var btn=$('tbody button').hasClass('btn-danger');
        //     console.log(btn);
        //     $(this).hasClass('')
        //     //    console.log(123);
        //        console.log($(this));
        //    })
    // })

    //  2、给所有的按钮添加点击事件，通过事件委托
    $('tbody').on('click', ('.btn'), function () {
        // 让操作模态框显示
        $('#addModal').modal('show');

        // 点击确定按钮，发送ajax请求，根据用户id，
        // 根据按钮的类名，决定修改用户的状态  btn-danger

        // 用户id
        userId = $(this).parent().data('id');
        // console.log(userId);
        isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
        console.log(isDelete);
    });

    // 模态框的确认按钮，被点击发送ajax请求
    $('.confirm').click(function(){
        $.ajax({
            url:'/user/updateUser',
            type:'post',
            data:{
                id:userId,
                isDelete:isDelete
            },
            dataType:'json',
            success:function(info){
                // console.log(info);
                if(info.success){
                    // 隐藏模态框
                    $('#addModal').modal('hide');
                    // 重新渲染
                    render();
                }
            }
        })
    })


})
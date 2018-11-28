$(function () {
    //发送ajax请求，获取数据，返回前端，渲染出页面
    var currentPage = 1;
    var pageSize = 5;

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
                console.log(info);
                var html = template('tmp', {
                    list: info.rows
                }); //注意：这里放的是对象
                $("tbody").html(html);

                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:info.page,
                    //当前页
                    totalPages: Math.ceil( info.total / info.size ),
                    //总页数
                    size:"large",
                    //设置控件的大小，mini, small, normal,large
                    onPageClicked: function( a, b, c, page ) {
                        // page 当前点击的页码
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                  });
            }
        })
    }

    $('tbody').on('click','button',function () {

        // console.log($(this).parent().attr('data-id'));
        var tid=$(this).parent().attr('data-id');
        console.log(tid);
        // 让模态框显示
        $('#logoutModal2').modal('show');
       ($('#logoutModal2 #logoutBtn')).click(function(){
           
        var btn=$('tbody button').hasClass('btn-danger');
        console.log(btn);
        $(this).hasClass('')
        //    console.log(123);
           console.log($(this));

       })
    })
})
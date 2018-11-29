$(function(){

    render();
    function render(){
        var page=1;
        var pageSize=5;
        $.ajax({
            url:'/user/queryUser',
            type:'get',
            data:{
                page:page,
                pageSize:pageSize,
            },
            success:function(info){
                // console.log(info);
                var html=template('tmp',{list:info.rows});
                $("tbody").html(html);
            }
        })

    }


})
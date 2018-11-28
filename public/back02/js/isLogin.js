// 判断当前用户是否登录过，如果登录了，跳转，如果没登录，返回login登录页

$.ajax({
   type:'get',
   dataType:'json',
   url:'/employee/checkRootLogin',
   success:function(info){
       if(info.error === 400){
           location.href='login.html';
       }
       if(info.success){
           console.log('当前用户以登录');
       }
   }
})

// $.ajax({
//     type: "get",
//     url: "/employee/checkRootLogin",
//     dataType: "json",
//     success: function( info ) {
//       console.log( info );
//       if ( info.error === 400 ) {
//         // 未登录, 拦截到登录页
//         location.href = "login.html";
//       }
  
//       if ( info.success ) {
//         console.log("当前用户已登录");
//       }
//     }
//   })
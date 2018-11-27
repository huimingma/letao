NProgress.start(); //开启进度条

setTimeout(function(){
    NProgress.done(); //关闭进度条
},2000);

/**
 * 需求：
 * 第一天ajax发送的时候，开启进度条
 * 等待所有的ajax都完成后，关闭进度条
 * 
 * ajax全局事件
 * 
 * .ajaxComplete() 每个ajax完成时调用（不管是成功还是失败）
 * .ajaxSuccess()  每个ajax只要成功完成就会调用
 * .ajaxError()    每个ajax只要失败就会调用
 * .ajaxSend()     在每个ajax 发送前调用
 * 
 * .ajaxStart()    在第一个ajax请求开始时调用
 * .ajaxStop()     在所有的ajax请求都完成时调用
 */

 $(document).ajaxStart(function(){
    //  开启进度条
    NProgress.start();
 })

 $(document).ajaxStop(function(){
    //  模拟网络延迟,真实开发中一般会有300~500毫秒的延迟
     setTimeout(function () { 
         NProgress.done();
      },1000)
 });
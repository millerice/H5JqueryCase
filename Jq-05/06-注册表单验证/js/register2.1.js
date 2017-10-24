
$(function () {
    
    //1.判断用户名
    $("#user_name").blur(function () {
            //1.判空
            var sVal = $(this).val();
            if (sVal == "") {
                //1.提示用户
                $(this).next().html("用户名不能为空");
                //2.控件显示
                $(this).next().show();
                return;
            }
            //2.正则
            var sRegStr = /^\w{6,20}$/;
            if(!(sRegStr.test(sVal))){//不匹配
                 //1.提示用户
                 $(this).next().html("用户名是6到20个英文或数字，还可包含“_”");
                 //2.控件显示
                 $(this).next().show();
            }
        
    })

    $("#user_name").focus(function () {
        $(this).next().hide();
    })

})

$(function () {

        //判断条件
        var bUser = false;
        var bPwd = false;
        var bCpwd = false;
        var bEmail = false;
        var bAllow = true;

    //1.判断用户名
        $("#user_name").blur(function () {
            //1.提示空
            var sNull = "用户名不能为空";
            var sRegStr = /^\w{6,20}$/;
            var sRegInfo = "用户名是6到20个英文或数字，还可包含“_”";
           bUser =  fnJudgeMethod($(this),sNull,sRegStr,sRegInfo);
        })

        $("#user_name").focus(function () {
            $(this).next().hide();
        })
    //2.密码
        $("#pwd").blur(function () {
            //1.提示空
            var sNull = "密码不能为空";
            var sRegStr = /^[\w!@#$%^&*]{6,20}$/;
            var sRegInfo = "密码是6到20位字母、数字，还可包含@!#$%^&*字";
           bPwd =  fnJudgeMethod($(this),sNull,sRegStr,sRegInfo);
        })

        $("#pwd").focus(function () {
            $(this).next().hide();
        })

    //3.确认密码
        $("#cpwd").blur(function () {
            if ($(this).val() == $("#pwd").val()) {//两次一直
                
                bCpwd = true;
            }else{//两次不一样
                $(this).next().html("两次密码不一致");
                //2.控件显示
                $(this).next().show();

                bCpwd = false;
            }
        })

        $("#cpwd").focus(function () {
            $(this).next().hide();
        })

    //4.邮箱email
        $("#email").blur(function () {
            //1.提示空
            var sNull = "邮箱不能为空";
            var sRegStr = /^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$/i;
            var sRegInfo = "邮箱格式不正确";
           bEmail =  fnJudgeMethod($(this),sNull,sRegStr,sRegInfo);
        })

        $("#email").focus(function () {
            $(this).next().hide();
        })

    //5.  按钮是否点击了 选择框
        $("#allow").click(function () {
            
            //1.选中
            if ($(this).is(":checked")) {//选中
                $(this).nextAll("span").hide();

                bAllow = true;

            } else {
                $(this).nextAll("span").html("请勾选");
                $(this).nextAll("span").show();

                bAllow = false;
            }

            //2.没选中
        })


    //6.是否提交数据
    $("form").submit(function () {
        
        if (bUser == true && bPwd == true && bCpwd == true && bEmail == true && bAllow == true) {
            
            return;
        } else {
            return false;   
        }
    })








    //判断的方法
    function fnJudgeMethod(oObj,sNull,sRegStr,sRegInfo) {
         //1.判空
         if (oObj.val() == "") {
             //1.提示用户
             oObj.next().html(sNull);
             //2.控件显示
             oObj.next().show();
             return;
         }
         //2.正则
         if(!(sRegStr.test(oObj.val()))){//不匹配
              //1.提示用户
              oObj.next().html(sRegInfo);
              //2.控件显示
              oObj.next().show();
         }else{

            return true;
         }
    }
    
    

})
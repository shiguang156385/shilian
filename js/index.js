$(".submit-box").on("click", function () {
//            if(!$("#user-name").val()){
//                tips("姓名不能为空",1000)
//            }else
    if(!$("#user-phone").val()) {
        tips("联系方式不能为空",1000);
    }else if(!testPhone($("#user-phone").val())){
        tips("手机号格式不正确",1000)
    } else{
        var name = $('#user-name').val();
        var phone = $('#user-phone').val();
        $.ajax({
            type:"post",
            url:"members.php",
            dataType:"JSON",
            data: { name: name,phone:phone },
            success: function (data) {
                if(data.status == 0)
                {
                    tips("恭喜，领取成功",2000, function () {
                        $('#user-name').val("");
                        $('#user-phone').val("");
                        $(".login-box").find("input").val("");
                    })

                }else if(data.status == 2)
                {
                    tips("手机号不能重复!",1000);
                }
            }
        });
        // tips("恭喜，领取成功",3000, function () {
        //     $(".login-box").find("input").val("");
        // })

    }

})
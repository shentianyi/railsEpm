define(["jquery","base"],function($,Base){
    function change_password(){
        var data = {};
        data.password = $("#old-pwd").val();
        data.new_password = $("#new-pwd").val();
        data.new_password_confirmation = $("#new-pwd-cfm").val();
        if(!data.password || !data.new_password || !data.new_password_confirmation)
        {
            Base.MessageBox(I18n.t('auth.msg.fill_blank'),"top","warning");
        }else{
            $.ajax({
                url:"/subscriptions/change_password",
                data:data,
                type:"POST",
                dataType:"json",
                success:function(data){
                    if(data.result){
                        Base.MessageBox(data.content,"top","success");
                        location.reload();
                    }else{
                        Base.MessageBox(data.content,"top","warning");
                    }
                }
            });
        }
    }

    $("#finish-change").on("click",change_password);
    return {
        init:function(){

        }
    }
})
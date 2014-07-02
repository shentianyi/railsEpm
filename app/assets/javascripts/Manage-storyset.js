var MANAGE = MANAGE || {};
MANAGE.story_set = {};
(function(){
    $(document).ready(function(){
        $("body")
            .on("click","#story-create-btn",function(){
                MANAGE.story_set.create();
            })
    })
})()
MANAGE.story_set.create = function(){
    var title = $.trim($("#storyset-title").val());
    var description = $("#storyset-description").val();
    var users = $("#storyset-users option:selected").map(function(){return $(this).attr("user")}).get();
    if(title.length>0){
        if(users.length>0){
            $.ajax({
                url:'/story_sets',
                data: {
                    story_set:{
                        title: title,
                        description: description
                    },
                    users: users
                },
                dataType: 'json',
                type: 'POST',
                success: function(data){
                    if(data){
                        window.location.href="/story_sets";
                    }
                    else{
                        MessageBox("create fail","top","warning");
                    }
                }
            });
        }
        else{
            MessageBox("请添加至少一位参与者","top","warning");
        }
    }
    else{
        MessageBox("请填写讨论组名称","top","warning");
    }

}
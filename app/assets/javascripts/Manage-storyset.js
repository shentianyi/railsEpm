var MANAGE = MANAGE || {};
MANAGE.story_set = {};
(function(){
    $(document).ready(function(){
        $("bocyd")
            .on("click","#story-create-btn",function(){
                MANAGE.story_set.create();
            })
    })
})()
MANAGE.story_set.create = function(){
    var title = $("#storyset-title").val();
    var description = $("#storyset-description").val();
    var users = $("#storyset-users option:selected").map(function(){return $(this).attr("user")}).get();

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

            }
        }
    });
}
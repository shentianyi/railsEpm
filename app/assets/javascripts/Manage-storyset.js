var MANAGE = MANAGE || {};
MANAGE.story_set = {};
(function(){
    $(document).ready(function(){
        $("body")
            .on("click","#story-create-btn",function(){
                var storyset = {}
                storyset.title = $("#storyset-title").val();
                storyset.description = $("#storyset-description").val();
                storyset.users = $("#storyset-users option:selected").map(function(){return $(this).attr("user")}).get();
                MANAGE.story_set.create(storyset,function(data){

                });
            })
    })
})()
MANAGE.story_set.create = function(storyset,callback){
    $.ajax({
        url:'/story_sets',
        data: {
            story_set:{
                title: storyset.title,
                description: storyset.description
            },
            users: storyset.users
        },
        dataType: 'json',
        type: 'POST',
        success: function(data){
            callback(data);
        }
    });
}
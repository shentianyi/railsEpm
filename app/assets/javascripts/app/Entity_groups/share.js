define(["jquery","base"],function($,Base){
    $("#user-share-show").on("click", function () {
        $("#manage-entity-add").css("left", "-200px");
        $("#user-share-list").css("left", "00px");
        $("#manage-right-content").css("padding-left", "200px");
    });
    $("#close-user-share").on("click", function () {
        $("#user-share-list").css("left", "-200px");
        $("#manage-right-content").css("padding-left", "0px");
    });
    $("body")
        .on("click", ".unshared-user-list h3", function () {
            var id = $(this).attr('id'),
                entity_group_id = $('#entity_group_id').val(),
                name = $(this).text();
            $('.shared-user-list h3').each(function () {
                if ($(this).attr('user') == id) {
                    return;
                }
            });
            $.post('/user_entity_groups', {data: {user_id: id, entity_group_id: entity_group_id}}, function (data) {
                if (data.result) {
                    $(".shared-user-list").append($("<li />").append($("<h3 />").text(name).attr("id", data.object).attr('user', id)));
                    $(".unshared-user-list h3[id='" + id + "']").parent().remove();
                } else {
                    Base.MessageBox(data.content, "top", "warning");
                }
            }, 'JSON');
        })
        .on("click", ".shared-user-list h3", function () {
            var id = $(this).attr('id'),
                user_id = $(this).attr('user'),
                name = $(this).text();
            $('.unshared-user-list h3').each(function () {
                if ($(this).attr('id') == user_id) {
                    return;
                }
            });
            $.ajax({
                url:'/user_entity_groups/'+id  ,
                type:'DELETE',
                dataType:'JSON',
                success:function(data){
                    if(data.result)
                    {     $(".shared-user-list h3[id='" + id + "']").parent().remove();
                        $(".unshared-user-list").append($("<li />").append($("<h3 />").text(name).attr("id", user_id)));

                    }else {
                        Base.MessageBox(data.content, "top", "warning");
                    }
                }
            });
        })
    ;
})
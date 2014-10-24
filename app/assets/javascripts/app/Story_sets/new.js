define(["jquery","base"],function($,Base){
    function create(storyset, callback) {
        if (storyset.title.length > 0) {
            if (storyset.users.length > 0) {
                $.ajax({
                    url: '/story_sets',
                    data: {
                        story_set: {
                            title: storyset.title,
                            description: storyset.description
                        },
                        users: storyset.users
                    },
                    dataType: 'json',
                    type: 'POST',
                    success: function (data) {
                        callback(data);
                    }
                })
            }
            else {
                Base.MessageBox("Please invite people", "top", "warning");
            }
        }
        else {
            Base.MessageBox("Please add discussion name", "top", "warning");
        }
    }

    $("body")
        .on("click", "#story-create-btn", function () {
            var storyset = {}
            storyset.title = $("#storyset-title").val();
            storyset.description = $("#storyset-description").val();
            storyset.users = $("#storyset-users option:selected").map(function () {
                return $(this).attr("user")
            }).get();
            create(storyset, function (data) {
                if (data.result) {
                    window.location.href = "/story_sets";
                }
                else {
                    Base.MessageBox("create fail", "top", "warning");
                }
            });
        })
    ;
    return{
        init:function(){}
    }
})
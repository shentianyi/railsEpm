var MANAGE = MANAGE || {};
MANAGE.story_set = {};
(function () {
    $(document).ready(function () {
        $("body")
            .on("click", "#story-create-btn", function () {
                var storyset = {}
                storyset.title = $("#storyset-title").val();
                storyset.description = $("#storyset-description").val();
                storyset.users = $("#storyset-users option:selected").map(function () {
                    return $(this).attr("user")
                }).get();
                MANAGE.story_set.create(storyset, function (data) {
                    if (data.result) {
                        window.location.href = "/story_sets";
                    }
                    else {
                        MessageBox("create fail", "top", "warning");
                    }
                });
            })
    })
})()

MANAGE.story_set.create = function (storyset, callback) {
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
            });
        } else {
            MessageBox("请添加至少一位参与者", "top", "warning");
        }
    }
    else {
        MessageBox("请填写讨论组名称", "top", "warning");
    }
}
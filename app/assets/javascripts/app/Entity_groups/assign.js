define(["jquery","base"],function($,Base){
    $("#entity-add-show").on("click", function () {
        $("#user-share-list").css("left", "-200px");
        $("#manage-entity-add").css("left", "00px");
        $("#manage-right-content").css("padding-left", "200px");
    });
    $("#close-add-entity").on("click", function () {
        $("#manage-entity-add").css("left", "-200px");
        $("#manage-right-content").css("padding-left", "0px");
    });
    $("body")
        .on("click", "#manage-entity-add ul h3", function () {
            var id = $(this).attr("id"),
                text = $(this).text(),
                validate = true;
            $("#assign-entity-wrap li>h3").each(function () {
                if ($(this).attr("entity_id") == id) {
                    validate = false;
                    return false
                }
            });
            if (validate) {
                $.ajax({
                    url: "/entity_group_items",
                    data: {
                        data: {
                            entity_group_id: $("#entity_group_id").val(),
                            entity_id: id
                        }
                    },
                    dataType: 'json',
                    type: 'post',
                    success: function (data) {
                        if (data.result) {
                            $("#assign-entity-wrap>ul").append($("<li />")
                                .append($("<h3 />").text(text))
                                .append($("<i />").addClass("icon-trash").attr("entity_id", data.object))
                            );
                        }
                        else {
                            Base.MessageBox(data.content, "top", "warning");
                        }
                    }
                });
            }
            else {
                Base.MessageBox(I18n.t('manage.view.already_assigned'), "top", "warning");
            }
        })
    ;
})
/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-25
 * Time: 下午4:04
 * To change this template use File | Settings | File Templates.
 */
var MANAGE = MANAGE || {};
MANAGE.view = {};
MANAGE.view.init = function () {
    $("#entity-add-show").on("click", function () {
        $("#user-share-list").css("left", "-200px");
        $("#manage-entity-add").css("left", "150px");
        $("#manage-right-content").css("padding-left", "200px");
    });

    $("#user-share-show").on("click", function () {
        $("#manage-entity-add").css("left", "-200px");
        $("#user-share-list").css("left", "150px");
        $("#manage-right-content").css("padding-left", "200px");
    });
    $("#close-add-entity").on("click", function () {
        $("#manage-entity-add").css("left", "-200px");
        $("#manage-right-content").css("padding-left", "0px");
    });
    $("#close-user-share").on("click", function () {
        $("#user-share-list").css("left", "-200px");
        $("#manage-right-content").css("padding-left", "0px");
    });

    $("#manage-entity-add,#user-share-list").height($(document).height() - $("header").height() - $("#left-content-title").height() - 1);
    $("body").resize(function () {
        $("#manage-entity-add,#user-share-list").height($(document).height() - $("header").height() - $("#left-content-title").height() - 1);
    });
    $("body").on("click", ".unshared-user-list h3", function () {
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
                MessageBox(data.content, "top", "warning");
            }
        }, 'JSON');
    });

    $("body").on("click", ".shared-user-list h3", function () {
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
                    MessageBox(data.content, "top", "warning");
                }
            }
        });
    });

    $("body").on("click", "#manage-entity-add ul h3", function () {
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
                        MessageBox(data.content, "top", "warning");
                    }
                }
            });
        }
        else {
            MessageBox(I18n.t('manage.view.already_assigned'), "top", "warning");
        }
    });
    $("body").on("click", "#assign-entity-wrap li>i", function () {
        var id = $(this).attr("entity_id"),

            $this = $(this);
        if (confirm(I18n.t('manage.view.unassign_confirm'))) {
            $.ajax({
                url: '/entity_group_items/' + id,
                type: 'DELETE',
                success: function (data) {
                    if (data.result) {
                        $this.parent().remove();
                    } else {
                        MessageBox(data.content, "top", "warning");
                    }
                }
            });
            //$(this).parent().remove();
        }
    });
};
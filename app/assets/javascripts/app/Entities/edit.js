define(["jquery","./share","base"],function($,Share,Base){
    function entity_edit_box_bind() {
        var $target = $("#manage-sort-list .icheckbox_minimal-aero.checked");
        $('#edit-entity-name').val($target.next().find(".entity-manage-name").text());
        $('#edit-entity-code').val($target.next().find(".entity-manage-code").text());
        $('#edit-entity-description').val($target.next().find(".entity-manage-description").text());
        $("#manage-entity-edit-old").attr("effect_on", $target.parent().attr("id"));
    }
    function entity_edit_close () {
        $("#user-edit").css("left", "-250px");
        $("#manage-right-content").css("padding-left", "0px");
        Share.clean_input();
    }
    function edit () {
        var name = $('#edit-entity-name').val(),
            code = $('#edit-entity-code').val(),
            description = $('#edit-entity-description').val(),
            edit_id = $("#manage-entity-edit-old").attr("effect_on"),
            $target = $("#manage-sort-list").find("#" + edit_id);
        if ($.trim(name).length > 0) {
            $.ajax({
                url: '/entities',
                type: 'PUT',
                data: {
                    id: $("#manage-sort-list").find(":checked").parent().parent().attr("id"),
                    entity: {
                        name: name,
                        code: code,
                        description: description
                    }
                },
                dataType: 'json',
                success: function (data) {
                    if (data.result) {
                        var object = data.object;
                        $target.find(".entity-manage-name").text(object.name);
                        $target.find(".entity-manage-code").text(object.code);
                        $target.find(".entity-manage-description").text(object.description);
                    } else {
                        Base.MessageBox(data.content, "top", "wrong");
                    }
                }
            });
            entity_edit_close();
        } else {
            Base.MessageBox(I18n.t('manage.base.fill-all-star'), "top", "warning");
        }
    };


    $("body")
        .on("click", "#manage-entity-edit", function () {
            $("#user-edit").css("left", "0px");
            $("#manage-right-content").css("padding-left", "200px").css("padding-right", "0px");
            $("#manage-entity-add").css("right", "999em");
            $("#left-content-title").css("margin-right", "0px");
            entity_edit_box_bind();
        })
        .on("click","#close-user-edit",function(){
            $("#manage-right-content").css("padding-left","0px");
            $("#user-edit").css("left","-200px");
        })
    ;
    $("#manage-entity-edit-old").on("click", function () {
        edit()
    });
})
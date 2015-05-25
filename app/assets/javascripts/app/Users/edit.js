define(["jquery","base","jquery.icheck"],function($,Base){
    function user_edit_box_bind() {
        var $target = $("#manage-sort-list .icheckbox_minimal-aero.checked"),
            name = $target.next().find(".user-manage-name").text(),
            mail = $target.next().find(".user-manage-mail").text(),
            title = $target.next().find('.user-manage-title').text(),
            tel = $target.next().find('.user-manage-tel').text(),
            phone = $target.next().find('.user-manage-phone').text(),
            department_id = $target.next().find('.user-manage-department').attr("value"),
            entity_id = $target.next().find('.user-manage-entity').attr("value"),
            authority = $target.next().find(".user-manage-authority").attr("value");

        $("#user-edit #edit-user-name").val(name);
        $("#user-edit #edit-user-mail").val(mail);
        $("#user-edit #edit-user-title").val(title);
        $("#user-edit #edit-user-tel").val(tel);
        $("#user-edit #edit-user-phone").val(phone);
        $("#user-edit input[type='radio'][value='" + authority + "']").iCheck("check");
        $("#manage-user-edit-old").attr("effect_on", $target.parent().attr("id"));
        $("#edit-department-for-kpi option[value='" + department_id + "']").prop('selected', true);
        $("#edit-department-for-kpi").trigger('chosen:updated')
        $("#edit-entity-for-kpi option[value='" + entity_id + "']").prop('selected', true);
        $("#edit-entity-for-kpi").trigger('chosen:updated')
    };
    function edit () {
        var edit_name = $("#user-edit #edit-user-name").val(), edit_mail = $("#user-edit #edit-user-mail").val(),
            edit_authority = $("#user-edit input[name='edit-user-role']:checked").attr("value"),
            edit_id = $("#manage-user-edit-old").attr("effect_on"),
            password = $("#user-edit #edit-user-password").val(),
            $target = $("#manage-sort-list").find("#" + edit_id),
            entity_id = $("#edit-entity-for-kpi :selected").attr("value"),
            entity_name = $("#edit-entity-for-kpi :selected").text(),
            department_id = $("#edit-department-for-kpi :selected").attr("value"),
            department_name = $("#edit-department-for-kpi :selected").text(),
            title = $("#user-edit #edit-user-title").val(),
            tel = $("#user-edit #edit-user-tel").val(),
            phone = $("#user-edit #edit-user-phone").val();

        if ($.trim(edit_name).length > 0 && edit_mail.length > 0) {
            if ($("#user-edit>div>input").filter("[red='true']").length == 0) {
                $.ajax({
                    url: '/users',
                    type: 'PUT',
                    data: {
                        id: $("#manage-sort-list").find(":checked").parent().parent().attr("id"),
                        user: {
                            first_name: edit_name,
                            email: edit_mail,
                            title: title,
                            tel:tel,
                            phone:phone,
                            password: password,
                            role_id: edit_authority,
                            entity_id: entity_id,
                            department_id: department_id
                        }
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.result) {
                            var object = data.object;
                            if($("#manage-left-menu li.active").attr("number")==object.role_id){
                                $target.find(".user-manage-name").text(object.first_name);
                                $target.find(".user-manage-mail").text(object.email);
                                $target.find(".user-manage-title").text(object.title);
                                $target.find(".user-manage-tel").text(object.tel);
                                $target.find(".user-manage-phone").text(object.phone);
                                $target.find('.user-manage-entity').attr("value", object.entity_id);
                                $target.find('.user-manage-department').attr("value", object.department_id);
                                $target.find('.user-manage-department').text(department_name);
                                $target.find('.user-manage-entity').text(entity_name);
                                if ($("#manage-sort-list").find(":checked").parent().parent().attr("is_tenant") == "false")
                                    $target.find(".user-manage-authority").text(object.role).attr("value", object.role_id);
                            }
                            else{
                                $target.remove();
                            }
                        } else {
                            Base.MessageBox(I18n.t('manage.base.sth-wrong'), "top", "wrong");
                        }
                    }
                });
                user_edit_close();
            } else {
                Base.MessageBox(I18n.t('manage.base.fill-all-star'), "top", "danger");
            }
        } else {
            Base.MessageBox(I18n.t('manage.base.fill-all-star'), "top", "warning");
        }
    }
    function user_edit_close() {
        $("#user-edit").css("left", "-250px");
        $("#manage-right-content").css("padding-left", "0px");
        $("[general='manage-user-add'] input[type='text']").val("");
        $("[general='manage-user-add'] input[type='password']").val("");
        $("[general='manage-user-add'] select").val('').trigger('chosen:updated');
        $("[general='manage-user-add'] input[type='radio']").iCheck("uncheck");
        $("[general='manage-user-add']>div>input").filter("[red='true']").css("borderColor", "#ddd").attr("red", "false");
        $("#manage-user-add input[type='radio']").first().iCheck("check");
        $("#user-edit input[type='radio']").first().iCheck("check");
    }

    $("body")
        .on("click", "#manage-user-edit", function () {
            $("#user-edit").show();
            $("#user-edit").css("left", "0px");
            $("#manage-right-content").css("padding-left", "200px");
            $("#manage-user-add").css("right", "999em");
            $("#manage-right-content").css("padding-right", "0px");
            $("#left-content-title").css("margin-right", "0px");
            user_edit_box_bind();
            $("#user-edit> div >.div-select>div").css("width", "150px");

            window.setTimeout(function(){
                var table_size=$("#manage-sort-list li").width()-70;
                $("#manage-sort-list table").width(table_size)
                if(".attribute-position"){
                    $("#manage-sort-list .attribute-position").width(table_size+40)
                    $("#manage-sort-list .attribute-position>p").width(table_size-180)
                }
            },1500);
        })
        .on("click", "#close-user-edit[general='close-user']", function () {
            user_edit_close();
        })
    ;
    $("#manage-user-edit-old").on("click", function () {
        edit()
    });
    return {
        refresh:function(){
            user_edit_close()
        }
    }
})
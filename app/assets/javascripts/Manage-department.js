/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-11-8
 * Time: 上午11:48
 * To change this template use File | Settings | File Templates.
 */
MANAGE = MANAGE || {};
MANAGE.department = MANAGE.department || {};
MANAGE.entity.icheck = {};
MANAGE.department.count = 0;
MANAGE.department.count_observe = function () {
    if (MANAGE.department.count == 0) {
        $("#dashboard-content").css("display", "none");
    }
    else {
        $("#dashboard-content").css("display", "block");
    }
};


MANAGE.entity.icheck.init = function () {
    $("#manage-sort-list input[type='checkbox']").on("ifChecked", function () {
        $("#manage-sort-list input[type='checkbox']").filter(function () {
            return $(this).parent().hasClass("checked")
        }).iCheck("uncheck");
    });
    $("#manage-sort-list input[type='checkbox']").on("ifUnchecked", function () {
        if ($("#manage-sort-list .icheckbox_minimal-aero.checked").length == 1 && $("#user-edit").css("left") != "-200px") {
            $("#user-edit").css("left", "-250px");
            $("#manage-right-content").css("padding-left", "0px");
            MANAGE.entity.clean_input();
        }
    })
};

MANAGE.department.init = function () {
    MANAGE.entity.icheck.init();
    $("#add-department").on("click", function () {
        $("#content-right-nav-add-block").css("left", "50px").find("input").focus();
    });
    MANAGE.department.add_department_init();
    MANAGE.department.count = $("#manage-sort-list").children.length;

    $("body").on("click", "#add-user-show",function () {
        $("#manage-user-add").css("right", "261px");
        $("#manage-right-content").css("padding-right", "200px");
        $("#left-content-title").css("margin-right", "201px");
        $("#user-edit").css("left", "-250px");
        $("#manage-right-content").css("padding-left", "0px");

        $("#manage-user-add.create-user> div >.div-select>div").css("width", "150px")
    }).on("click", "#manage-entity-edit", function () {
            $("#user-edit").css("left", "0px");
            $("#manage-right-content").css("padding-left", "200px");
            $("#manage-user-add").css("right", "999em");
            $("#manage-right-content").css("padding-right", "0px");
            $("#left-content-title").css("margin-right", "0px");
            MANAGE.entity.entity_edit_box_bind();
        });

    $("#manage-entity-edit-old").on("click", function () {
        MANAGE.entity.edit()
    });

};

MANAGE.entity.entity_edit_box_bind = function () {
    var $target = $("#manage-sort-list .icheckbox_minimal-aero.checked");
    $('#edit-entity-name').val($target.next().find(".entity-manage-name").text());
    $('#edit-entity-code').val($target.next().find(".entity-manage-code").text());
    $('#edit-entity-description').val($target.next().find(".entity-manage-description").text());
    $("#manage-entity-edit-old").attr("effect_on", $target.parent().attr("id"));
};

MANAGE.entity.entity_edit_close = function () {
    $("#user-edit").css("left", "-250px");
    $("#manage-right-content").css("padding-left", "0px");
    MANAGE.entity.clean_input();
};

MANAGE.entity.clean_input = function () {
    $('.clear-input').val('');
};
MANAGE.department.add_department_init = function () {
    $("#content-right-nav-add-block input").on("click",function (event) {
        stop_propagation(event);
    }).on("blur",function () {
            $(this).parent().css("left", "-999em");
        }).on("keyup", function (event) {
            var e = adapt_event(event).event,
                target = $(e.target);
            if (e.keyCode == 13) {
                var validate = false;
                var name = $("#content-right-nav-add-block input").val();
                if ($.trim(name).length == 0) {
                    MessageBox("It can't be empty", "top", "warning");
                    ;
                }
                else {
                    $("#manage-sort-list li").each(function () {
                        if ($("table", this).find("tr").eq(0).find("td").text() != name) {
                            validate = true;
                        }
                        else {
                            validate = false;
                            return false
                        }
                    });
                    if (validate) {
                        $.post('/entities', {
                            data: {
                                name: name
                            }
                        }, function (data) {
                            if (data.result) {
                                $("#manage-sort-list").prepend($("<li />").attr("id", data.object)
                                    .append($("<p />").addClass("sort-handle").text(":"))
                                    .append($("<input type='checkbox'/>"))
                                    .append($("<table />").addClass("group")
                                        .append($("<tr />")
                                            .append($("<td />").text(name).attr("title", name))
                                        )
                                        .append($("<tr />")
                                            .append($("<td />").text(I18n.t('manage.department.desc.name')))
                                        )
                                    )
                                );
                                $("#content-right-nav-add-block input").val("").blur();
                                MANAGE.department.count++;
                                MANAGE.department.count_observe();
                                $("#manage-sort-list input[type='checkbox']").iCheck({
                                    checkboxClass: 'icheckbox_minimal-aero'
                                });
                                $("#manage-sort-list input[type='checkbox']").on("ifChanged", function () {
                                    if (!$(this).parent().hasClass("checked")) {
                                        MANAGE.totalChecked += 1;
                                        total_check_listener();
                                    }
                                    else {
                                        MANAGE.totalChecked -= 1;
                                        total_check_listener();
                                    }
                                });
                                MANAGE.sort_init();
                                MANAGE.resize_sort_table();
                                $("#manage-sort-list li").on("resize", function () {
                                    MANAGE.resize_sort_table()
                                });
                            }
                            else {
                                MessageBox(data.content, "top", "warning");
                            }
                        });
                    }
                    else {
                        MessageBox("Same name exist yet", "top", "warning");
                    }
                }
            }
            else if (e.keyCode == 27) {
                target.blur();
            }
        });
};

MANAGE.entity.edit = function () {
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
                    MessageBox(data.content, "top", "wrong");
                }
            }
        });
        MANAGE.entity.entity_edit_close();
    } else {
        MessageBox("Please fill all the blanket taking *", "top", "warning");
    }
};


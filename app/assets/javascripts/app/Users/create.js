define(["jquery","base","../../manage/manage_right_list","chosen"],function($,Base,Rightlist){
    function user_add_close() {
        $("#manage-user-add").css("right", "999em");
        $("#manage-right-content").css("padding-right", "0px");
        $("#left-content-title").css("margin-right", "0px");
        user_add_clear();
    }
    function user_add_clear() {
        $("[general='manage-user-add'] input[type='text']").val("");
        $("[general='manage-user-add'] input[type='password']").val("");
        $("[general='manage-user-add'] select").val('').trigger('chosen:updated');
        $("[general='manage-user-add'] input[type='radio']").iCheck("uncheck");
        $("[general='manage-user-add']>div>input").filter("[red='true']").css("borderColor", "#ddd").attr("red", "false");
        $("#manage-user-add input[type='radio']").first().iCheck("check");
        $("#user-edit input[type='radio']").first().iCheck("check");
    }
    function add_new () {
        var name = $("#new-user-name").val();
        var group = $("#department-for-kpi :selected").text();
        var entity_id = $("#entity-for-kpi :selected").attr("value");
        var department_id = $("#department-for-kpi :selected").attr("value");
        var department_name = $("#department-for-kpi :selected").text();
        var entity_name = $("#entity-for-kpi :selected").text();
        var mail = $("#new-user-mail").val();
        var title = $('#new-user-title').val();
        var tel = $('#new-user-tel').val();
        var phone = $('#new-user-phone').val();
        var password = $("#new-user-password").val();
        var password_confirm = $("#new-user-password-confirm").val();
        var role = $("input[name='user-role']:checked").attr("value");
        var authority = $("input[name='user-role']:checked").data("name");
        if ($.trim(name).length > 0 && mail.length > 0 && password.length > 0 && password_confirm.length > 0) {
            $.ajax({
                url: '/users',
                data: {
                    user: {
                        first_name: name,
                        email: mail,
                        title: title,
                        tel:tel,
                        phone:phone,
                        password: password,
                        password_confirmation: password_confirm,
                        entity_id: entity_id,
                        department_id: department_id,
                        role_id: role
                    }
                },
                type: 'POST',
                dataType: 'json',
                success: function (data) {
                    if (data.result) {
                        if ($("#manage-left-menu li.active").attr("number") == role) {
                            var object = data.object;
                            $("#assign-kpi-user").append("<option value="+object.id+">"+object.email+"</option>");
                            $("#manage-sort-list").prepend($("<li />").attr("id", object.id)
                                .append($("<p />").addClass("sort-handle").text(":"))
                                .append($("<input type='checkbox'/>"))
                                .append($("<table />").addClass("group")
                                    .append($("<tr />")
                                        .append($("<td />").text(object.first_name).addClass("user-manage-name"))
                                        .append($("<td />").text(object.title).addClass("user-manage-title"))
                                        .append($("<td />").text(object.tel).addClass("user-manage-tel").attr("title",object.tel))
                                        .append($("<td />").text(object.phone).addClass("user-manage-phone").attr("title",object.phone))
                                        .append($("<td />").text(department_name).addClass("user-manage-department").attr("value", object.department_id).attr("title",department_name))
                                        .append($("<td />").text(entity_name).addClass("user-manage-entity").attr("value", object.entity_id).attr("title",entity_name))
                                        .append($("<td />").text(object.role).addClass("user-manage-authority").attr("value", object.role_id)))
                                    .append($("<tr />")
                                        .append($("<td />").text(object.email).addClass("user-manage-mail"))
                                        .append($("<td />").text(I18n.t('manage.user.new.title')))
                                        .append($("<td />").text(I18n.t('manage.user.new.tel')))
                                        //.append($("<td />").text(I18n.t('manage.user.new.department')))
                                        .append($("<td />").text(I18n.t('manage.user.new.phone')))
                                        .append($("<td />").text(I18n.t('manage.user.new.entity')))
                                        .append($("<td />").text(I18n.t('manage.user.new.departments')))
                                        .append($("<td />").text(I18n.t('manage.user.new.authority'))))
                                ));
                            Rightlist.refresh();
                            icheck_init();
                            $("#assign-kpi-user").append($("<option />").attr("value", object.id).text(object.email));
                            $("#assign-kpi-user").val('').trigger('chosen:updated');
                        }
                        user_add_close();
                    }
                    else {
                        var errmsg = "";
                        if (data.content.hasOwnProperty("email")) {
                            errmsg = errmsg + "邮箱：" + data.content.email[0] + ";";
                        }
                        if (data.content.hasOwnProperty("password")) {
                            errmsg = errmsg + "  密码：" + data.content.password[0] + ";";
                        }
                        if (data.content.hasOwnProperty("password_confirmation")) {
                            errmsg = errmsg + "  密码确认：" + data.content.password_confirmation[0] + ";";
                        }
                        if(errmsg.length < 1)
                        {
                            errmsg = errmsg + data.content;
                        }
                        Base.MessageBox(errmsg, "top", "warning")
                    }
                }
            });
        }
        else {
            Base.MessageBox(I18n.t('manage.base.fill-all-star'), "top", "warning");
        }
    }
    function icheck_init() {
        $("#manage-sort-list input[type='checkbox']").on("ifChecked", function () {
            $("#manage-sort-list input[type='checkbox']").filter(function () {
                return $(this).parent().hasClass("checked")
            }).iCheck("uncheck");
        });
        $("#manage-sort-list input[type='checkbox']").on("ifUnchecked", function () {
            if ($("#manage-sort-list .icheckbox_minimal-aero.checked").length == 1 && $("#user-edit").css("left") != "-200px") {
                $("#user-edit").css("left", "-250px");
                $("#manage-right-content").css("padding-left", "0px");
                user_add_clear();
            }
        })
    }
    function add_box_height(){
        $("#manage-user-add").height($("#manage_three_column").height()).css({top:$("header").height()+1});
    }
    $("body")
        .on("click", "#add-user-show",function () {
            $("#manage-user-add").css("right", "261px");
            $("#manage-right-content").css("padding-right", "200px");
            $("#left-content-title").css("margin-right", "201px");
            $("#user-edit").css("left", "-250px");
            $("#manage-right-content").css("padding-left", "0px");
            $("#manage-user-add.create-user> div >.div-select>div").css("width", "150px")
        })
        .on("click", "#close-add-user[general='close-user']", function () {
            user_add_close();
        })
    ;
    $("#manage-user-add-new").on("click", function () {
        add_new();
    });
    $("#new-user-password-confirm").blur(function () {
        if ($(this).val() != $("#new-user-password").val()) {
            $(this).css("borderColor", "#fa4545").attr("red", true);
        } else {
            $(this).css("borderColor", "#ddd").attr("red", false);
        }
    });
    $("[general='user-mail']").blur(function () {
        if (!Base.isEmail($(this).val())) {
            $(this).css("borderColor", "#fa4545").attr("red", true);
        } else {
            $(this).css("borderColor", "#ddd").attr("red", false);
        }
    });
    icheck_init();
    user_add_clear();
    add_box_height();
    $("body").on("resize",function(){
        add_box_height();
    });
    return {
        refresh:function(){
            user_add_close();
            icheck_init();
        }
    }
})
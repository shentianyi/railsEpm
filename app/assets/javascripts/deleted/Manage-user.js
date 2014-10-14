/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-23
 * Time: 下午8:10
 * To change this template use File | Settings | File Templates.
 */
//var MANAGE = MANAGE || {};
//MANAGE.user = {};
//MANAGE.user.icheck = {};
//////////////////////////////////////////////////////////////////////////  User init
//////////////////////////////////////////////////////////////////////////////////////////////////
//MANAGE.user.init = function () {
//    MANAGE.user.user_add_box_bind();
//    MANAGE.user.user_add_clear();
//    MANAGE.user.icheck.init();
//    MANAGE.user.assign.init();
//    $("#manage-left-menu").on("click", "li", function() {
//        MANAGE.user.user_add_close();
//        MANAGE.user.user_edit_close();
//        var li = $(this);
//        var id = li.attr('number');
//        if(id) {
//            $("#manage-left-menu>li").removeClass('active');
//            li.addClass('active');
//            $.get('/users/list/' + id, function(data) {
//                $("#manage-edit-target").text(li.attr('title'));
//                $('#user-item-container').html(data);
//                window.history.pushState(id, null, "/users/c/" + id);
//                MANAGE.widget_init();
//                MANAGE.user.icheck.init();
//                MANAGE.user.init_assign_user();
//            });
//        }
//    });
//    $(".single-select").chosen({ allow_single_deselect: true });

//    $("body")
//        .on("click", "#add-user-show",function () {
//            $("#manage-user-add").css("right", "261px");
//            $("#manage-right-content").css("padding-right", "200px");
//            $("#left-content-title").css("margin-right", "201px");
//            $("#user-edit").css("left", "-250px");
//            $("#manage-right-content").css("padding-left", "0px");
//
//            $("#manage-user-add.create-user> div >.div-select>div").css("width", "150px")
//            })
//        .on("click", "#manage-user-edit", function () {
//            $("#user-edit").show();
//            $("#user-edit").css("left", "0px");
//            $("#manage-right-content").css("padding-left", "200px");
//            $("#manage-user-add").css("right", "999em");
//            $("#manage-right-content").css("padding-right", "0px");
//            $("#left-content-title").css("margin-right", "0px");
//            MANAGE.user.user_edit_box_bind();
//            $("#user-edit> div >.div-select>div").css("width", "150px");
//
//            window.setTimeout(function(){
//                var table_size=$("#manage-sort-list li").width()-70;
//                $("#manage-sort-list table").width(table_size)
//                if(".attribute-position"){
//                    $("#manage-sort-list .attribute-position").width(table_size+40)
//                    $("#manage-sort-list .attribute-position>p").width(table_size-180)
//                }
//            },1500);
//
//        });
//    $("#manage-user-edit-old").on("click", function () {
//        MANAGE.user.edit()
//    });


//    $("#department-for-kpi").val('').trigger('chosen:updated');
//    $("#manage-user-add").height($(document).height() - $("header").height());
//    $(window).resize(function () {
//        $("#manage-user-add").height($(document).height() - $("header").height());
//    });

};
//////////////////////////////////////////////////////////////////////////         list 那一块
//////////////////////////////////////////////////////////////////////////////////////////////////
//MANAGE.user.icheck.init = function () {
//    $("#manage-sort-list input[type='checkbox']").on("ifChecked", function () {
//        $("#manage-sort-list input[type='checkbox']").filter(function () {
//            return $(this).parent().hasClass("checked")
//        }).iCheck("uncheck");
//    });
//    $("#manage-sort-list input[type='checkbox']").on("ifUnchecked", function () {
//        if ($("#manage-sort-list .icheckbox_minimal-aero.checked").length == 1 && $("#user-edit").css("left") != "-200px") {
//            $("#user-edit").css("left", "-250px");
//            $("#manage-right-content").css("padding-left", "0px");
//            MANAGE.user.user_add_clear();
//        }
//    })
//};
//////////////////////////////////////////////////////////////////////////         User 添加那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
//MANAGE.user.user_add_box_bind = function () {
//    $("body").on("click", "#close-add-user[general='close-user']", function () {
//        MANAGE.user.user_add_close();
//    });
//    $("body").on("click", "#close-user-edit[general='close-user']", function () {
//        MANAGE.user.user_edit_close();
//    });
//    $("#manage-user-add-new").on("click", function () {
//        MANAGE.user.add_new();
//    });
//    $("#new-user-password-confirm").blur(function () {
//        if ($(this).val() != $("#new-user-password").val()) {
//            $(this).css("borderColor", "#fa4545").attr("red", true);
//        } else {
//            $(this).css("borderColor", "#ddd").attr("red", false);
//        }
//    });
//    $("[general='user-mail']").blur(function () {
//        if (!isEmail($(this).val())) {
//            $(this).css("borderColor", "#fa4545").attr("red", true);
//        } else {
//            $(this).css("borderColor", "#ddd").attr("red", false);
//        }
//    });
//};
//MANAGE.user.user_add_close = function () {
//    $("#manage-user-add").css("right", "999em");
//    $("#manage-right-content").css("padding-right", "0px");
//    $("#left-content-title").css("margin-right", "0px");
//    MANAGE.user.user_add_clear();
//};
//MANAGE.user.user_edit_close = function () {
//    $("#user-edit").css("left", "-250px");
//    $("#manage-right-content").css("padding-left", "0px");
//    MANAGE.user.user_add_clear();
//};
//MANAGE.user.user_add_clear = function () {
//    $("[general='manage-user-add'] input[type='text']").val("");
//    $("[general='manage-user-add'] input[type='password']").val("");
//    $("[general='manage-user-add'] select").val('').trigger('chosen:updated');
//    $("[general='manage-user-add'] input[type='radio']").iCheck("uncheck");
//    $("[general='manage-user-add']>div>input").filter("[red='true']").css("borderColor", "#ddd").attr("red", "false");
//    $("#manage-user-add input[type='radio']").first().iCheck("check");
//    $("#user-edit input[type='radio']").first().iCheck("check");
//};
//
//MANAGE.user.add_new = function () {
//    var name = $("#new-user-name").val();
//    var group = $("#department-for-kpi :selected").text();
//    var entity_id = $("#entity-for-kpi :selected").attr("value");
//    var department_id = $("#department-for-kpi :selected").attr("value");
//    var department_name = $("#department-for-kpi :selected").text();
//    var entity_name = $("#entity-for-kpi :selected").text();
//    var mail = $("#new-user-mail").val();
//    var title = $('#new-user-title').val();
//    var tel = $('#new-user-tel').val();
//    var phone = $('#new-user-phone').val();
//    var password = $("#new-user-password").val();
//    var password_confirm = $("#new-user-password-confirm").val();
//    var role = $("input[name='user-role']:checked").attr("value");
//    var authority = $("input[name='user-role']:checked").data("name");
//    if ($.trim(name).length > 0 && mail.length > 0 && password.length > 0 && password_confirm.length > 0) {
//        $.ajax({
//            url: '/users',
//            data: {
//                user: {
//                    first_name: name,
//                    email: mail,
//                    title: title,
//                    tel:tel,
//                    phone:phone,
//                    password: password,
//                    password_confirmation: password_confirm,
//                    entity_id: entity_id,
//                    department_id: department_id,
//                    role_id: role
//                }
//            },
//            type: 'POST',
//            dataType: 'json',
//            success: function (data) {
//                if (data.result) {
//
//                    if ($("#manage-left-menu li.active").attr("number") == role) {
//                        var object = data.object;
//                        //add user to the assign table
//                        $("#assign-kpi-user").append("<option value="+object.id+">"+object.email+"</option>");
//                        //
//                        $("#manage-sort-list").prepend($("<li />").attr("id", object.id)
//                            .append($("<p />").addClass("sort-handle").text(":"))
//                            .append($("<input type='checkbox'/>"))
//                            .append($("<table />").addClass("group")
//                                .append($("<tr />")
//                                    .append($("<td />").text(object.first_name).addClass("user-manage-name"))
//                                    .append($("<td />").text(object.title).addClass("user-manage-title"))
//                                    .append($("<td />").text(object.tel).addClass("user-manage-tel").attr("title",object.tel))
//                                    .append($("<td />").text(object.phone).addClass("user-manage-phone").attr("title",object.phone))
//                                    .append($("<td />").text(department_name).addClass("user-manage-department").attr("value", object.department_id).attr("title",department_name))
//                                    .append($("<td />").text(entity_name).addClass("user-manage-entity").attr("value", object.entity_id).attr("title",entity_name))
//                                    .append($("<td />").text(object.role).addClass("user-manage-authority").attr("value", object.role_id)))
//                                .append($("<tr />")
//                                    .append($("<td />").text(object.email).addClass("user-manage-mail"))
//                                    .append($("<td />").text(I18n.t('manage.user.new.title')))
//                                    .append($("<td />").text(I18n.t('manage.user.new.tel')))
//                                    //.append($("<td />").text(I18n.t('manage.user.new.department')))
//                                    .append($("<td />").text(I18n.t('manage.user.new.phone')))
//                                    .append($("<td />").text(I18n.t('manage.user.new.entity')))
//                                    .append($("<td />").text(I18n.t('manage.user.new.departments')))
//                                    .append($("<td />").text(I18n.t('manage.user.new.authority'))))
//                            ));
//                        $("#manage-sort-list input[type='checkbox']").iCheck({
//                            checkboxClass: 'icheckbox_minimal-aero'
//                        });
//                        $("#manage-sort-list input[type='checkbox']").on("ifChanged", function () {
//                            if (!$(this).parent().hasClass("checked")) {
//                                MANAGE.totalChecked += 1;
//                                total_check_listener();
//                            } else {
//                                MANAGE.totalChecked -= 1;
//                                total_check_listener();
//                            }
//                        });
//                        $("#manage-sort-list li").on("resize", function () {
//                            MANAGE.resize_sort_table()
//                        });
//                        MANAGE.judge_kpi_count();
//                        MANAGE.sort_init();
//                        MANAGE.resize_sort_table();
//                        MANAGE.user.icheck.init();
//                        $("#assign-kpi-user").append($("<oprion />").attr("value", object.id).text(object.email));
//                        $("#assign-kpi-user").val('').trigger('chosen:updated');
//                    }
//                    MANAGE.user.user_add_close();
//                }
//                else {
//                    var errmsg = "";
//                    if (data.content.hasOwnProperty("email")) {
//                        errmsg = errmsg + "邮箱：" + data.content.email[0] + ";";
//                    }
//                    if (data.content.hasOwnProperty("password")) {
//                        errmsg = errmsg + "  密码：" + data.content.password[0] + ";";
//                    }
//                    if (data.content.hasOwnProperty("password_confirmation")) {
//                        errmsg = errmsg + "  密码确认：" + data.content.password_confirmation[0] + ";";
//                    }
//                    if(errmsg.length < 1)
//                    {
//                        errmsg = errmsg + data.content;
//                    }
//                    MessageBox(errmsg, "top", "warning")
//                }
//            }
//        });
//    } else {
//        MessageBox(I18n.t('manage.base.fill-all-star'), "top", "warning");
//    }
//};
//////////////////////////////////////////////////////////////////////////         User 编辑那一块的
///////////////////////////////////////////////////////////////////////////////////////////////////
//MANAGE.user.user_edit_box_bind = function () {
//    var $target = $("#manage-sort-list .icheckbox_minimal-aero.checked"),
//        name = $target.next().find(".user-manage-name").text(),
//        mail = $target.next().find(".user-manage-mail").text(),
//        title = $target.next().find('.user-manage-title').text(),
//        tel = $target.next().find('.user-manage-tel').text(),
//        phone = $target.next().find('.user-manage-phone').text(),
//        department_id = $target.next().find('.user-manage-department').attr("value"),
//        entity_id = $target.next().find('.user-manage-entity').attr("value"),
//        authority = $target.next().find(".user-manage-authority").attr("value");
//
//    $("#user-edit #edit-user-name").val(name);
//    $("#user-edit #edit-user-mail").val(mail);
//    $("#user-edit #edit-user-title").val(title);
//    $("#user-edit #edit-user-tel").val(tel);
//    $("#user-edit #edit-user-phone").val(phone);
//    $("#user-edit input[type='radio'][value='" + authority + "']").iCheck("check");
//    $("#manage-user-edit-old").attr("effect_on", $target.parent().attr("id"));
//    $("#edit-department-for-kpi option[value='" + department_id + "']").prop('selected', true);
//    $("#edit-department-for-kpi").trigger('chosen:updated')
//    $("#edit-entity-for-kpi option[value='" + entity_id + "']").prop('selected', true);
//    $("#edit-entity-for-kpi").trigger('chosen:updated')
//};
//MANAGE.user.edit = function () {
//    var edit_name = $("#user-edit #edit-user-name").val(), edit_mail = $("#user-edit #edit-user-mail").val(),
//        edit_authority = $("#user-edit input[name='edit-user-role']:checked").attr("value"),
//        edit_id = $("#manage-user-edit-old").attr("effect_on"),
//        password = $("#user-edit #edit-user-password").val(),
//        $target = $("#manage-sort-list").find("#" + edit_id),
//        entity_id = $("#edit-entity-for-kpi :selected").attr("value"),
//        entity_name = $("#edit-entity-for-kpi :selected").text(),
//        department_id = $("#edit-department-for-kpi :selected").attr("value"),
//        department_name = $("#edit-department-for-kpi :selected").text(),
//        title = $("#user-edit #edit-user-title").val(),
//        tel = $("#user-edit #edit-user-tel").val(),
//        phone = $("#user-edit #edit-user-phone").val();
//
//    if ($.trim(edit_name).length > 0 && edit_mail.length > 0) {
//        if ($("#user-edit>div>input").filter("[red='true']").length == 0) {
//            $.ajax({
//                url: '/users',
//                type: 'PUT',
//                data: {
//                    id: $("#manage-sort-list").find(":checked").parent().parent().attr("id"),
//                    user: {
//                        first_name: edit_name,
//                        email: edit_mail,
//                        title: title,
//                        tel:tel,
//                        phone:phone,
//                        password: password,
//                        role_id: edit_authority,
//                        entity_id: entity_id,
//                        department_id: department_id
//                    }
//                },
//                dataType: 'json',
//                success: function (data) {
//                    if (data.result) {
//                        var object = data.object;
//                        if($("#manage-left-menu li.active").attr("number")==object.role_id){
//                            $target.find(".user-manage-name").text(object.first_name);
//                            $target.find(".user-manage-mail").text(object.email);
//                            $target.find(".user-manage-title").text(object.title);
//                            $target.find(".user-manage-tel").text(object.tel);
//                            $target.find(".user-manage-phone").text(object.phone);
//                            $target.find('.user-manage-entity').attr("value", object.entity_id);
//                            $target.find('.user-manage-department').attr("value", object.department_id);
//                            $target.find('.user-manage-department').text(department_name);
//                            $target.find('.user-manage-entity').text(entity_name);
//
//                            if ($("#manage-sort-list").find(":checked").parent().parent().attr("is_tenant") == "false")
//                                $target.find(".user-manage-authority").text(object.role).attr("value", object.role_id);
//                        }
//                        else{
//                            $target.remove();
//                        }
//
//                    } else {
//                        MessageBox(I18n.t('manage.base.sth-wrong'), "top", "wrong");
//                    }
//                }
//            });
//            MANAGE.user.user_edit_close();
//        } else {
//            MessageBox(I18n.t('manage.base.fill-all-star'), "top", "danger");
//        }
//    } else {
//        MessageBox(I18n.t('manage.base.fill-all-star'), "top", "warning");
//    }
//};
//////////////////////////////////////////////////////////////////////////         User assign kpi
///////////////////////////////////////////////////////////////////////////////////////////////////
//MANAGE.user.assign = {};
//MANAGE.user.kpis = function (id) {
//    $.ajax({
//        url: '/kpis/user/' + id,
//        dataType: 'html',
//        success: function (kpis) {
//            $('#assign-kpi-inner').html(kpis);
//        }
//    });
//}
//MANAGE.user.assign.init = function () {
//    //assign kpi初始化
//    $("#manage-user-delivery").on("click", MANAGE.user.assign.initial)
//
//    $("body").on("change", "#assign-kpi-user", function () {
//        var id = $(this).find(":selected").attr("value")
//        MANAGE.user.kpis(id);
//    });
//
//
//    //左边的KPI列出来
//    $("body").on("change", "#kpi-category", function (event) {
//        var id = $(adapt_event(event).target).attr("value");
//        $.ajax({
//            url: '/kpis/categoried/' + id,
//            dataType: 'json',
//            success: function (data) {
//                $("#assign-kpi-list").empty();
//                for (var i = 0; i < data.length; i++) {
//                    $("#assign-kpi-list").append($("<li />")
//                        .append($("<h3 />").attr("kpi_id", data[i].id).text(data[i].name)).append($("<p />").attr("title", data[i].description).text(data[i].description)));
//                }
//            }
//        });
//    });
//
//    // assign by category
//    $("#assign-kpi-category-btn").on('click', function () {
//        var category = $("#kpi-category :selected").attr('value');
//        var user = $("#assign-kpi-user :selected").attr("value");
//        if(category==null || category == ""){
//            MessageBox(I18n.t('manage.user.desc.no_kpi_category_selected'), "top", "warning");
//            return;
//        }
//        if(user==null || user == ""){
//            MessageBox(I18n.t('manage.user.desc.no_user_selected'), "top", "warning");
//            return;
//        }
//            $.post('/kpis/assign', {kpi: category, user: user}, function (msg) {
//                if (msg.result) {
//                    MANAGE.user.kpis(user);
//                } else {
//                    MessageBox(msg.content, "top", "warning");
//                }
//            }, 'json');
//    });
//    // assign by kpi
//    $("body").on("click", "#assign-kpi-list>li>h3", function () {
//        var id = $(this).attr("kpi_id"), h3 = $(this).text(), p = $(this).next().text(), validate = true;
//        if ($("#assign-kpi-user :selected").text().length > 0) {
//            $("#assign-kpi-inner>.left>li").each(function () {
//                if ($(this).attr("kpi_id") == id) {
//                    validate = false;
//                    return false
//                }
//            });
//        }
//        else {
//                MessageBox("请选择用户", "top", "warning");
//            return;
//        }
//        if (validate) {
//            var user_id = $("#assign-kpi-user :selected").attr("value");
//            $.ajax({
//                url: '/kpis/assign',
//                dataType: 'json',
//                data: {
//                    kpi: id,
//                    user: user_id,
//                    by_cate: false
//                },
//                type: 'post',
//                success: function (msg) {
//                    if (msg.result) {
//                        var data = msg.content;
//                        $("#assign-kpi-inner>.left").append($("<li />").attr("id", data[0].id).attr("kpi_id", data[1].id)
//                            .append($("<table />").append($("<tr />")
//                                    .append($("<td />").text(data[1].name))
//                                    .append($("<td />").append($("<input type='text'/>").val(data[1].target_max).attr("kpi_id", data[0].id)))
//                                    .append($("<td />").append($("<input type='text'/>").val(data[1].target_min).attr("kpi_id", data[0].id)))
//                                )
//                                .append($("<tr />")
//                                    .append($("<td />").text(data[1].description))
//                                    .append($("<td />").text("Target Max"))
//                                    .append($("<td />").text("Target Min"))
//                                )
//                            )
//                            .append($("<i />").addClass("icon-trash")));
//                    } else {
//                        MessageBox(msg.content, "top", "warning");
//                    }
//                }
//            });
//        }
//        else {
//            MessageBox(I18n.t('fix.kpi_assign_fail'), "top", "warning");
//        }
//    });
//
//    //左边KPI删除
//    $("body").on("click", "#assign-kpi-inner>ul>li>i", function () {
//        if (confirm("Unassign this KPI ?")) {
//            var $target = $(this).parent();
//            $.ajax({
//                url: '/user_kpi_items/' + $target.attr("id"),
//                dataType: 'json',
//                type: 'DELETE',
//                success: function (data) {
//                    if (data.result) {
//                        //also remove from assign user list
//                        $target.remove();
//                    }
//                }
//            });
////              $target.remove();
//        }
//    });
//    //左边input的js
//    $("body").on("keyup", "#assign-kpi-inner>ul>li input[type='text']", function (event) {
//        clearNoNumZero(adapt_event(event).target);
//    });
//    $("body").on("keyup", "#assign-kpi-inner>ul>li input[type='text']", function (event) {
//        var e = adapt_event(event).event;
//        if (e.keyCode == 13) {
//            $(this).blur();
//        }
//    });
//    $("body").on("blur", "#assign-kpi-inner>ul>li input[type='text']", MANAGE.user.assign.input);
//    $("body").on("click", "#assign-kpi-cancel", MANAGE.user.assign.close);
//};
//MANAGE.user.assign.initial = function () {
//    $("#assign-kpi-wrap").css("display", "block");
//    $("#kpi-category+div").css("width", "180px");
//    $("#assign-kpi-user+div").css("width", "180px");
//    $.ajax({
//        url: '/kpi_categories/list',
//        dataType: 'json',
//        success: function (data) {
//            for (var i = 0; i < data.length; i++) {
//                $("#kpi-category").append($("<option />").attr("value", data[i].id).text(data[i].name))
//            }
//            $("#kpi-category").prepend($("<option />").attr("value", ""));
//            $("#kpi-category").val('').trigger('chosen:updated');
//        }
//    });
//};
//MANAGE.user.assign.close = function () {
//    $("#assign-kpi-list").empty();
//    $("#assign-kpi-inner").empty();
//    $("#assign-kpi-user").val('').trigger('chosen:updated');
//    $("#kpi-category option").remove();
//    $("#kpi-category").val('').trigger('chosen:updated');
//    $("#assign-kpi-wrap").css("display", "none");
//};
//MANAGE.user.assign.input = function (event) {
//    var target = adapt_event(event).target;
//    var id = $(target).attr("kpi_id");
//    var target_max = $("#" + id).find(".target_max").val();
//    var target_min = $("#" + id).find(".target_min").val();
//    $.ajax({
//        url: "/user_kpi_items",
//        type: 'PUT',
//        data: {
//            id: id,
//            user_kpi_item: {
//                target_max: target_max,
//                target_min: target_min
//            }
//
//        },
//        success: function (data) {
//            if (!data.result)
//                MessageBox(data.content, "top", "warning");
//        }
//    });
//};

///////////////
//MANAGE.user.init_assign_user = function() {
//    $("#assign-kpi-user option").remove();
//    var target = $("#assign-kpi-user");
//    target.append("<option></option>");
//    //'<option value="<%= user.id %>"><%= user.email %></option>';
//    var users = $("#manage-sort-list>li");
//    users.each(function () {
//        var user_id = $(this).attr("id");
//        var email = $(this).attr("email");
//
//        target.append("<option value="+user_id+">"+email+"</option>");
//    });
//}

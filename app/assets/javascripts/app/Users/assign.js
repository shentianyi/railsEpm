define(["jquery","base"],function($,Base){
    function initial () {
        $("#assign-kpi-wrap").css("display", "block");
        $("#kpi-category+div").css("width", "180px");
        $("#assign-kpi-user+div").css("width", "180px");
        $.ajax({
            url: '/kpi_categories/list',
            dataType: 'json',
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    $("#kpi-category").append($("<option />").attr("value", data[i].id).text(data[i].name))
                }
                $("#kpi-category").prepend($("<option />").attr("value", ""));
                $("#kpi-category").val('').trigger('chosen:updated');
            }
        });
    }
    function close () {
        $("#assign-kpi-list").empty();
        $("#assign-kpi-inner").empty();
        $("#assign-kpi-user").val('').trigger('chosen:updated');
        $("#kpi-category option").remove();
        $("#kpi-category").val('').trigger('chosen:updated');
        $("#assign-kpi-wrap").css("display", "none");
    }
    function input (event) {
        var target = Base.adapt_event(event).target;
        var id = $(target).attr("kpi_id");
        var target_max = $("#" + id).find(".target_max").val();
        var target_min = $("#" + id).find(".target_min").val();
        $.ajax({
            url: "/user_kpi_items",
            type: 'PUT',
            data: {
                id: id,
                user_kpi_item: {
                    target_max: target_max,
                    target_min: target_min
                }

            },
            success: function (data) {
                if (!data.result)
                    Base.MessageBox(data.content, "top", "warning");
            }
        });
    }
    function kpis (id) {
        $.ajax({
            url: '/kpis/user/' + id,
            dataType: 'html',
            success: function (kpis) {
                $('#assign-kpi-inner').html(kpis);
            }
        });
    }

    //assign kpi初始化
    $("#manage-user-delivery").on("click",initial)
    $("body")
        .on("change", "#assign-kpi-user", function () {
            var id = $(this).find(":selected").attr("value")
            kpis(id);
        })
        //左边的KPI列出
        .on("change", "#kpi-category", function (event) {
            var id = $(Base.adapt_event(event).target).attr("value");
            $.ajax({
                url: '/kpis/categoried/' + id,
                dataType: 'json',
                success: function (data) {
                    $("#assign-kpi-list").empty();
                    for (var i = 0; i < data.length; i++) {
                        $("#assign-kpi-list").append($("<li />")
                            .append($("<h3 />").attr("kpi_id", data[i].id).text(data[i].name))
                            .append($("<p />").attr("title", data[i].description).text(data[i].description)));
                    }
                }
            });
        })
        // assign by kpi
        .on("click", "#assign-kpi-list>li>h3", function () {
            var id = $(this).attr("kpi_id"), h3 = $(this).text(), p = $(this).next().text(), validate = true;
            if ($("#assign-kpi-user :selected").text().length > 0) {
                $("#assign-kpi-inner>.left>li").each(function () {
                    if ($(this).attr("kpi_id") == id) {
                        validate = false;
                        return false
                    }
                });
            }
            else {
                Base.MessageBox("请选择用户", "top", "warning");
                return;
            }
            if (validate) {
                var user_id = $("#assign-kpi-user :selected").attr("value");
                $.ajax({
                    url: '/kpis/assign',
                    dataType: 'json',
                    data: {
                        kpi: id,
                        user: user_id,
                        by_cate: false
                    },
                    type: 'post',
                    success: function (msg) {
                        if (msg.result) {
                            var data = msg.content;
                            $("#assign-kpi-inner>.left").append($("<li />").attr("id", data[0].id).attr("kpi_id", data[1].id)
                                .append($("<table />").append($("<tr />")
                                        .append($("<td />").text(data[1].name))
                                        .append($("<td />").append($("<input type='text'/>").val(data[1].target_max).attr("kpi_id", data[0].id)))
                                        .append($("<td />").append($("<input type='text'/>").val(data[1].target_min).attr("kpi_id", data[0].id)))
                                    )
                                    .append($("<tr />")
                                        .append($("<td />").text(data[1].description))
                                        .append($("<td />").text("Target Max"))
                                        .append($("<td />").text("Target Min"))
                                    )
                                )
                                .append($("<i />").addClass("icon-trash")));
                        } else {
                            Base.MessageBox(msg.content, "top", "warning");
                        }
                    }
                });
            }
            else {
                Base.MessageBox(I18n.t('fix.kpi_assign_fail'), "top", "warning");
            }
        })
        //左边KPI删除
        .on("click", "#assign-kpi-inner>ul>li>i", function () {
            if (confirm("Unassign this KPI ?")) {
                var $target = $(this).parent();
                $.ajax({
                    url: '/user_kpi_items/' + $target.attr("id"),
                    dataType: 'json',
                    type: 'DELETE',
                    success: function (data) {
                        if (data.result) {
                            //also remove from assign user list
                            $target.remove();
                        }
                    }
                });
                //$target.remove();
            }
        })
        .on("keyup", "#assign-kpi-inner>ul>li input[type='text']", function (event) {
            Base.clearNoNumZero(Base.adapt_event(event).target);
        })
        .on("keyup", "#assign-kpi-inner>ul>li input[type='text']", function (event) {
            var e = Base.adapt_event(event).event;
            if (e.keyCode == 13) {
                $(this).blur();
            }
        })
        .on("blur", "#assign-kpi-inner>ul>li input[type='text']", input)
        .on("click", "#assign-kpi-cancel", close)
    ;
    // assign by category
    $("#assign-kpi-category-btn").on('click', function () {
        var category = $("#kpi-category :selected").attr('value');
        var user = $("#assign-kpi-user :selected").attr("value");
        if(category==null || category == ""){
            Base.MessageBox(I18n.t('manage.user.desc.no_kpi_category_selected'), "top", "warning");
            return;
        }
        if(user==null || user == ""){
            Base.MessageBox(I18n.t('manage.user.desc.no_user_selected'), "top", "warning");
            return;
        }
        $.post('/kpis/assign', {kpi: category, user: user}, function (msg) {
            if (msg.result) {
                Base.MANAGE.user.kpis(user);
            } else {
                Base.MessageBox(msg.content, "top", "warning");
            }
        }, 'json');
    })

    return{
        refresh:function(){

        }
    }
})
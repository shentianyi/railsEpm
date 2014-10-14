define(["jquery","base","icheck","./isCalcuCheck"],function($,Base,iCheck,isCalcuCheck){
    function cancel () {
        $("#kpi-library>div").slideUp("3000");
        $("#kpi-library").css("display", "none");
        $("#kpi-library-inner-left").empty();
        $("#library-chosen-kpi").empty();
    }
    function add_post(category, kpis) {
        $.ajax({
            url : "/kpis/import",
            type : "POST",
            dataType : "json",
            data : {
                category : category,
                kpis : kpis
            },
            async : false,
            success : function(data) {
                if(data.result) {
                    $("#manage-left-menu").append($("<li />").attr("title", data.content).attr("number", data.object)
                        .append($("<i />").addClass("icon-trash icon-item"))
                        .append($("<a href='/kpis/c/" + data.object + "'/>").text(data.content)));
                } else {
                    Base.MessageBox(data.content, "top", "warning");
                }
            }
        });
    }

    $("#kpi-library-btn").on("click", function() {
        $("#kpi-library").css("display", "block");
        $("#kpi-library>div").slideDown("3000");
        $.ajax({
            url : "/kpi_categories/template",
            dataType : "json",
            success : function(data) {
                for(var i = 0; i < data.length; i++) {
                    var category = data[i];
                    $("#kpi-library-inner-left")
                        .append($("<div />").addClass("accordion-header").attr("title", category.name).attr("id", category.id).text(category.name))
                        .append($("<ul />").addClass("accordion-body"));
                }
            }
        });
    });
    $("body")
        .on("click", "#kpi-library-inner-left>.accordion-header", function() {
            if(!$(this).hasClass("accordion-in")) {
                $("#kpi-library-inner-left>.accordion-header.accordion-in + .accordion-body").slideUp("2000");
                $("#kpi-library-inner-left>.accordion-header.accordion-in").removeClass("accordion-in");
                $(this).next().slideDown("1000");
                $(this).addClass("accordion-in");
                var category_id = $(this).attr("id");
                var header = $(this);
                $.ajax({
                    url : "/kpis/template/" + category_id,
                    dataType : "json",
                    success : function(data) {
                        for(var i = 0; i < data.length; i++) {
                            header.next(".accordion-body")
                                .append($("<li />")
                                    .append($("<input type='checkbox'/>").attr("id", data[i].id).attr("belong", data[i].admin_kpi_category_template_id))
                                    .append($("<h3 />").attr("title", data[i].name).text(data[i].name))
                                    .append($("<p />").attr("title", data[i].description).text(data[i].description)));
                            if(data[i].is_calculated) {
                                header
                                    .next(".accordion-body").find("#" + data[i].id).parent()
                                    .append($("<i />").addClass("icon-lightbulb").attr("title", data[i].formula_string))
                            }
                        }
                        iCheck.init();
                    }
                });
            }
            else {
                $(this).next().slideUp("1000");
                $(this).removeClass("accordion-in");
            }
        })
        .on("ifChecked", "#kpi-library-inner-left .accordion-body input[type='checkbox']", function() {
            var h = $(this).parent().nextAll("h3").text();
            var id = $(this).attr("id");
            var belong = $(this).attr("belong");
            var p = $(this).parent().nextAll("p").text();
            $("#library-chosen-kpi")
                .append($("<li />").attr("id", id).attr("belong", belong)
                    .append($("<h3 />").text(h).attr("title", h))
                    .append($("<p />").text(p).attr("title", p)))
        })
        .on("ifUnchecked", "#kpi-library-inner-left .accordion-body input[type='checkbox']", function() {
            var id = $(this).attr("id");
            $("#library-chosen-kpi").find("#" + id).remove();
        })
        .on("click", "#library-chosen-kpi li", function() {
            var id = $(this).attr("id");
            $("#kpi-library-inner-left .accordion-body").find("#" + id).iCheck("uncheck");
        })
        .on("click", "#library-cancel", function() {
            cancel();
        })
        .on("click", "#library-add", function() {
            var length = $("#library-chosen-kpi").children().length;
            var belong_init = $("#library-chosen-kpi li").eq(0).attr("belong");
            var kpi_group = [$("#library-chosen-kpi li").eq(0).attr("id")];
            if(belong_init != undefined) {
                for(var i = 1; i <= length; i++) {
                    if($("#library-chosen-kpi li").eq(i).attr("belong") == belong_init) {
                        kpi_group.push($("#library-chosen-kpi li").eq(i).attr("id"));
                    } else if($("#library-chosen-kpi li").eq(i).attr("belong") == undefined) {
                        add_post(belong_init, kpi_group);
                    } else {
                        add_post(belong_init, kpi_group);
                        belong_init = $("#library-chosen-kpi li").eq(i).attr("belong");
                        kpi_group = [];
                        kpi_group.push($("#library-chosen-kpi li").eq(i).attr("id"));
                    }
                }
                Base.MessageBox("KPI Library Add Success", "top", "success");
                cancel();
            } else {
                Base.MessageBox("Nothing have been chosen", "top", "warning");
            }
            isCalcuCheck();
        })
    ;

})
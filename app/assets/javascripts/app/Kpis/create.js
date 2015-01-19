define(["jquery","icheck","base","../../manage/manage_share_control","./kpi_for_calculate","../../manage/manage_right_list","./isCalcuCheck","chosen","jquery.tipsy"],function($,iCheck,Base,MANAGE,MANAGE_kpi,Rightlist,isCalcuCheck){
    function kpi_add_clear () {
        $("#add-new-kpi-block input").val("");
        $("#add-new-kpi-block select").val("").trigger('chosen:updated');
        $("#add-new-kpi-block textarea").val("");
        $("#add-new-kpi-block textarea").val("");
        $("#add-new-kpi-block").find("select").empty().trigger('chosen:updated');
        if($("#is-calcu-check").prop("checked")) {
            $("#is-calcu-check").iCheck("uncheck")
        }
        var count=$("#auto-form-label ul").children().length;
        if(count>1){
            for(var i=0;i<count-1;i++){
                $("#auto-form-label ul").children().eq(0).remove();
            }
        }
        $("#add-new-kpi-block").css("left","-999em").css("right","auto");
        $("#add-new-kpi-block>div").css("left","-999em").css("right","auto");
    }

    function add_new_kpi () {
        var option = {
            entity : $("#new-kpi-category :selected").attr("value"),
            name : $("#new-kpi-name").val(),
            desc : $("#new-kpi-desc").val().length > 0 ? $("#new-kpi-desc").val() : $("#new-kpi-name").val(),
            frequency : $("#add-interval :selected").attr("value"),
            interval : $("#add-interval :selected").text(),
            direction : $("#add-trend :selected").text() == false ? $("#add-trend :eq(1)").attr("value") : $("#add-trend :selected").attr("value"),
            trend : $("#add-trend :selected").text() == false ? $("#add-trend :eq(1)").text() : $("#add-trend :selected").text(),
            target_max : $("#new-kpi-target").val(),
            target_min : $("#new-kpi-target-low").val(),
            unit : $("#add-unit :selected").attr("value"),
            section : $("#add-unit :selected").attr("sym"),
            is_calculated : $("#is-calcu-check").prop("checked"),
            formula : $("#takeCal").attr("cal"),
            formula_string : $("#calcuType-input").val()
        }
        option.attributes=[];
        var count=$("#auto-form-label ul").children().length;
        if(count>1){
            var text;
            for(var i=0;i<count-1;i++){
                text= $.trim($("#auto-form-label ul").children().eq(i).find("span").text());
                option.attributes.push(text);
            }
        }
        if(option.is_calculated) {
            if($.trim(option.name).length > 0 && option.interval != false && option.target_max.length > 0 && option.target_min.length > 0 && option.unit != false && option.formula_string.length > 0) {
                post_kpi(option);
            } else {
                Base.MessageBox(I18n.t('manage.base.fill-all-star'), "top", "warning");
            }
        } else {
            if($.trim(option.name).length > 0 && option.interval != false && option.target_max.length > 0 && option.target_min.length > 0 && option.unit != false) {
                post_kpi(option);
            } else {
                Base.MessageBox(I18n.t('manage.base.fill-all-star'), "top", "warning");
            }
        }
    };
    function post_kpi(option) {
        $.post('/kpis', {
            kpi : {
                kpi_category_id : option.entity,
                name : option.name,
                description : option.desc,
                frequency : option.frequency,
                direction : option.direction,
                target_max : option.target_max,
                target_min : option.target_min,
                unit : option.unit,
                is_calculated : option.is_calculated,
                formula : option.formula,
                formula_string : option.formula_string,
                kpi_properties:option.attributes
            }
        }, function(data) {
            if(data.result) {
                kpi_add_clear();
                var object = data.object
                var id = object.id;
                var formula_string = object.is_calculated ? object.formula_string : "";//I18n.t('manage.kpi.not_calculate_type');
                var attrs = object.properties;
                if(option.entity == $("#manage-left-menu .active").attr("number")) {
                    $("#manage-sort-list").prepend($("<li />").attr("id", id).append($("<p />").addClass("sort-handle").text(":")).append($("<input type='checkbox'/>").attr("is_calculated", object.is_calculated)).append($("<table />").addClass("category").append($("<tr />").append($("<td />").text(object.name).attr("title", object.name)).append($("<td />").text(object.interval)).append($("<td />").text(object.trend)).append($("<td />").addClass("manage-kpi-target").append($("<div />").append($("<span />").addClass("can-change").text(object.target_max).attr("title", object.target_max)).append($("<span />").text(object.section)).append($("<input type='text'/>").attr("effect_on", id)))).append($("<td />").addClass("manage-kpi-target").append($("<div />").append($("<span />").addClass("can-change").text(object.target_min).attr("title", object.target_min)).append($("<span />").text(object.section)).append($("<input type='text'/>").attr("effect_on", id)))).append($("<td />").text(option.is_calculated ? I18n.t('manage.kpi.calculate_type') : I18n.t('manage.kpi.not_calculate_type')).attr("title", formula_string))).append($("<tr />").append($("<td />").text(object.desc).attr("title", object.desc)).append($("<td />").text(I18n.t('manage.kpi.frequency'))).append($("<td />").text(I18n.t('manage.kpi.trend'))).append($("<td />").text(I18n.t('manage.kpi.target'))).append($("<td />").text(I18n.t('manage.kpi.target_min'))).append($("<td />").text(I18n.t('manage.kpi.is_calculate_type'))))));
                    $("#manage-sort-list li").each(function() {
                        $(this).find("table tr:first-of-type td:last-of-type").tipsy({
                            gravity : 'se'
                        });
                    });
                    //append attrs
                    $("#manage-sort-list li#"+id).append($("<div/>").addClass("attribute-position").append($("<a/>").addClass("btn btn-success edit-kpi-attribute").attr("work_at",id).text(I18n.t('manage.kpi.dimensions-edit'))).append($("<p/>").attr("kpi_id",id)));
                    for(var i = 0;i<attrs.length;i++){
                        $("p[kpi_id="+id+"]").append($("<span/>").attr("id",attrs[i].id).text(attrs[i].name));
                    }
                    $("#manage-kpi-add").css("right", "999em");
                    $("#manage-right-content").css("padding-right", "0px");
                    $("#left-content-title").css("margin-right", "0px");
                    Rightlist.refresh();
                } else {
                    $("#manage-kpi-add").css("right", "999em");
                    $("#manage-right-content").css("padding-right", "0px");
                    $("#left-content-title").css("margin-right", "0px");
                    MANAGE.MessageBox("Add success", "top", "success");
                }
                if(!object.is_calculated) {
                    $("#is-calcu-relate").append($("<option />").attr("value", id).text(object.name));
                    $("#is-calcu-relate").val('').trigger('chosen:updated');
                }
            } else {
                MANAGE.MessageBox(data.content, "top", "warning");
            }
        })
    }
    function calculate_input (object) {
        var post_value = $(object).val();
        var reg;
        for(var i = 0; i < MANAGE_kpi.kpi_for_calculate.length; i++) {
            reg = "/\\[" + MANAGE_kpi.kpi_for_calculate[i].value + "]/g";
            post_value = post_value.replace(eval(reg), "[" + MANAGE_kpi.kpi_for_calculate[i].id + "]");
        }
        $("#takeCal").attr("cal", post_value);
    };


    $("body")
        .on("click", "#kpi-add-show", function() {
            $("#add-new-kpi-block").css("left","0px").css("right","0px");
            $("#add-new-kpi-block>div").css("left","50%").css("right","0px");
            $.get("/kpis/condition", function(data) {
                $.each(data, function(key, data) {
                    var select = $("select[name='" + key + "']");
                    for(var i = 0; i < data.length; i++) {
                        select.append($("<option />").attr("value", (data[i].value == null ? data[i].id : data[i].value)).text((data[i].desc == null ? data[i].name : data[i].desc)));
                    }
                    select.prepend($("<option />").attr("value", ""));
                    select.val('').trigger('chosen:updated');
                });
            }, 'json');
            $("#new-kpi-category").append($("<option />").text(""));
            for(var i=0;i<$("#manage-left-menu>li").length;i++){
                var $target=$("#manage-left-menu>li").eq(i);
                if($target.attr("number") != undefined) {
                    $("#new-kpi-category")
                        .append($("<option />")
                            .attr("value", $target.attr("number"))
                            .text($target.attr("title")))
                }
            }
            $("#new-kpi-category").val('').trigger('chosen:updated');
        })
        .on("click","#remove-new-kpi-block",function(){
            kpi_add_clear();
        })
        .on("click","#cancel-new-kpi-block",function(){
            kpi_add_clear();
        })
        .on("keyup", "#new-kpi-target,#new-kpi-target-low", function(event) {
            var e = Base.adapt_event(event).event;
            Base.clearNoNumZero(e.target);
        })
        .on("click", "#calculate-type-box>label", function(event) {
            var obj = Base.adapt_event(event).target;
            var sign = $(obj).attr("sign");
            var oldVal = $("#calcuType-input").val();
            var oldValId = $("#takeCal").attr("cal");
            var newVal = oldVal + sign;
            var newValId = oldValId + sign;
            $("#calcuType-input").val(newVal);
            $("#takeCal").attr("cal", newValId);
            $("#calcuType-input")[0].selectionStart = $("#calcuType-input").val().length;
            $("#calcuType-input").focus();
        })
        .on("keyup", "#calcuType-input", function(event) {
            var object = Base.adapt_event(event).target;
            calculate_input(object)
        })
    ;
    $("#is_calcu_relate_chosen .chosen-results").on("click", "li", function() {
        var order = parseInt($(this).attr("data-option-array-index"));
        var val = "[" + $(this).text() + "]";
        var valId = "[" + $("#is-calcu-relate option")[order].getAttribute("value") + "]";
        var oldVal = $("#calcuType-input").val();
        var oldValId = $("#takeCal").attr("cal");
        var newVal = oldVal + val;
        var newValId = oldValId + valId;
        $("#calcuType-input").val(newVal);
        $("#takeCal").attr("cal", newValId);
        $("#calcuType-input")[0].selectionStart = $("#calcuType-input").val().length;
        $("#calcuType-input").focus();
    });
    $("#calcuType-input").focus(function() {
        var item;
        MANAGE_kpi.kpi_for_calculate = [];
        $("#is-calcu-relate").find("option:not([value=''])").each(function() {
            item = {}
            item.value = $(this).text();
            item.id = $(this).attr("value");
            MANAGE_kpi.kpi_for_calculate.push(item);
        });
    });
    $("#manage-kpi-add-new").on("click", function() {
        add_new_kpi();
    });

    kpi_add_clear();
    isCalcuCheck();
})
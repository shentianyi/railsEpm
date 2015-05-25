define(["jquery","../../manage/manage_left_menu","../../manage/manage_right_list","base","./isCalcuCheck","./create","./library","./attribute","../../manage/manage_three_column","jquery.tipsy"],
    function($,Leftmenu,Rightlist,Base,isCalcuCheck){
    var option_add={
            name:I18n.t('manage.kpi.category'),
            href:"/kpis/",
            postHref:'/kpi_categories'
        },
        option_edit={
            url:"/kpi_categories"
        },
        option_delete={
            url:"/kpi_categories/",
            local:"/kpis",
            name:"category"
        },
        option_right_edit={
            target : "manage-kpi-target",
            url : '/kpis',
            complete : function(option) {
                $.ajax({
                    url : this.url,
                    type : 'PUT',
                    data : {
                        kpi : {
                            id : option.id,
                            target_max : option.target_max,
                            target_min : option.target_min
                        }
                    },
                    success : function(data) {
                        $("#"+option.id+" .manage-kpi-target").eq(0).find(".can-change")
                            .text(option.target_max).attr("title", option.target_max);
                        $("#"+option.id+" .manage-kpi-target").eq(1).find(".can-change")
                            .text(option.target_min).attr("title", option.target_min);
                        $("#"+option.id+" .manage-kpi-target").each(function(){
                            $(this).find("input").css("left",'-999em');
                        });
                    }
                });
                $("#manage-sort-list").find(".can-change").tipsy({gravity: 'se'})
            },
            edit_check : function(object) {
                Base.clearNoNumZero(object);
            }
        },
        option_right_remove={
             url : '/kpis/'
        },
        option_right_drag={
             url : '/kpis',
             drag_complete_post : function(id, belong,callback) {
                var option = {
                    id : id,
                    belong : belong
                }
                $.ajax({
                    url : this.url,
                    type : 'PUT',
                    data : {
                        kpi : {
                            id : option.id,
                            kpi_category_id : option.belong
                        }
                    },
                    success : function(data) {
                        callback(option.id);
                    }
                });
             }
        }

    return {
        init:function( ){
            Leftmenu.init(option_add,option_edit,option_delete,"kpis");
            Rightlist.init(option_right_edit,option_right_remove,option_right_drag,"kpis");

            $("#manage-left-menu").on("click", "li", function() {
                var li = $(this);
                var id = li.attr('number');
                if(id) {
                    $("#manage-left-menu>li").removeClass('active');
                    li.addClass('active');
                    $.get('/kpis/list/' + id, function(data) {
                        $("#manage-edit-target").text(li.attr('title'));
                        $('#kpi-item-container').html(data);
                        window.history.pushState(id, null, "/kpis/c/" + id);
                        Rightlist.refresh();
                        isCalcuCheck();
                    });
                }
            });
            $("body")
                .on("keydown", "#manage-sort-list>li>table input[type='text']", function() {
                    var $this = $(this), number = $this.getCursorPosition();
                    $this.data('cursor-position', number);
                })
                .on('keyup', "#manage-sort-list>li>table input[type='text']", function(event) {
                    var keyCode = Base.adapt_event(event).event.keyCode >= 39 ? (Base.adapt_event(event).event.keyCode == 40 ? 40 : 39) : Base.adapt_event(event).event.keyCode;
                    if(keyCode == 8) {
                        var number = parseInt($(this).data('cursor-position')) - 1;
                    } else {
                        var number = keyCode - 38 == 0 ? 0 : (keyCode - 40 == 0 ? $(Base.adapt_event(event).target).val().length : parseInt($(this).data('cursor-position')) + (keyCode - 38));
                    }
                    Base.setCaretToPos($(this).get(0), number);

                })
            ;
        }
    }
})
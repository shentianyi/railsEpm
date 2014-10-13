define(["jquery","../../manage/manage_left_menu","../../manage/manage_right_list","icheck","base","../../manage/manage_share","../../manage/manage_three_column","jquery.tipsy"],
    function($,Leftmenu,Rightlist,icheck,Base){
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
             drag_complete_post : function(id, belong) {
                var option = {
                    id : id,
                    belong : belong
                    //target : $("#" + id).find(".can-change").text()
                }
                $.ajax({
                    url : this.url,
                    type : 'PUT',
                    data : {
                        kpi : {
                            id : option.id,
                            kpi_category_id : option.belong
                            //target : option.target
                        }
                    },
                    success : function(data) {
                        MANAGE.item_drag.prototype.drag_complete(option.id);
                    }
                });
               //this.drag_complete(id);
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
//                        MANAGE.widget_init();
//                        MANAGE.kpi.isCalcuCheck();
                    });
                }
            });
        }
    }
})
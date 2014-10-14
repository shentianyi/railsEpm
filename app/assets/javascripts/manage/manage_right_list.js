define(["jquery","./manage_right_list_drag","./manage_right_list_edit","./manage_right_list_remove","base","icheck","./manage_share_control","jquery.sortable","jquery.tipsy","jquery.baresize"],function($,Drag,Edit,Remove,Base,iCheck,MANAGE){
    function edit_init(target,url,complete_callback,edit_check_callback,type){
        var edit=new Edit(target,url,complete_callback,edit_check_callback);
        $("body")
            .on("click","#manage-item-edit",function(){
                edit.edit_show();
            })
        ;
        if($("#manage-item-edit").length>0){
            $("body").on("keydown","#manage-sort-list li table input[type='text']",function(event){
                var e = Base.adapt_event(event).event;
                if(e.keyCode==13 ){
                    if($(e.target).val().length==0){
                        Base.MessageBox("Give it a Value , please",'top',"warning");
                    }
                    else{
                        var id=$(e.target).attr("effect_on");
                        var option={
                            id:id,
                            belong:$("#manage-left-menu li.active").attr("number"),
                            target_max:$("#"+id+" .manage-kpi-target").eq(0).find("input").val()?$("#"+id+" .manage-kpi-target").eq(0).find("input").val():$("#"+id+" .manage-kpi-target").eq(0).find(".can-change").text(),
                            target_min:$("#"+id+" .manage-kpi-target").eq(1).find("input").val()?$("#"+id+" .manage-kpi-target").eq(1).find("input").val():$("#"+id+" .manage-kpi-target").eq(1).find(".can-change").text(),
                            edit_input:$(e.target)
                        }
                        edit.complete(option);
                    }
                }
                else if(e.keyCode==27){
                    var id=$(e.target).attr("effect_on");
                    $("#manage-sort-list>#"+id).find(".manage-kpi-target input").css("left","-999em");
                }
            }).on("keyup","#manage-sort-list li table input[type='text']",function(event){
                    var e = Base.adapt_event(event).event;
                    if(edit.edit_check){
                        edit.edit_check(e.target);
                    }
                });
        }
    }
    function remove_init(url,type){
        var remove=new Remove(url);
        $("body")
            .on("click","#manage-item-remove",function(){
                if(confirm(I18n.t('manage.base.delete_confirm'))) {
                    $("#manage-sort-list :checked").each(function() {
                        var id = $(this).parent().parent().attr("id");
                        remove.remove_complete(id);
                        if(type === "users" && $("#user-edit").css("left") != "0px") {
                            $("#user-edit").css("left", "-250px");
                            $("#manage-right-content").css("padding-left", "0px");
//                            MANAGE.user.user_add_clear();
                        }
                        if(type === 'kpis' && $(this).attr("is_calculated")=="false"){
                            $("#is-calcu-relate").find("[value='"+id+"']").remove();
                            $("#is-calcu-relate").val('').trigger('chosen:updated');
                        }
                    });
                }
            })
    }
    function drag_init(url,drag_complete_post,type){
        var drag=new Drag(url,drag_complete_post)
        $('#manage-sort-list').sortable({
            handle: '.sort-handle'
        });
        $.event.props.push("dataTransfer");
        $("#manage-sort-list")
            .on("dragstart","li",function(event){
                var e=Base.adapt_event(event).event;
                e.dataTransfer.setData("id", $(this).attr("id"));
            })
        ;
        $("#manage-left-menu")
            .on("dragover","li[number]:not('.active')",function(event){
                this.style.color="rgba(0,0,0,0.4)";
                this.style.backgroundColor="rgba(242,196,84,0.7)";
                event.preventDefault();
            })
            .on("dragleave","li[number]:not('.active')",function(){
                this.style.color="rgba(0, 0, 0, 0.2)";
                this.style.backgroundColor=null;
            })
            .on("drop","li[number]:not('.active')",function(event){
                this.style.color="rgba(0, 0, 0, 0.2)";
                this.style.backgroundColor=null;
                var e=Base.adapt_event(event).event;
                var id = e.dataTransfer.getData("id");
                var belong = $(this).attr("number");
                drag.drag_complete_post(id,belong,drag.drag_complete);
                Base.adapt_event(event).event.preventDefault();
                Base.stop_propagation(event);
            })
        ;
        $("#manage-sort-list li table input[type='text']").on("focus",function(){
            $('#manage-sort-list').sortable("disable");
        }).on("blur",function(){
                $('#manage-sort-list').sortable("enable");
            });
    }
    function initial(){
        $("#manage-total-check")
            .on("ifChecked",function(){
                $("#right-list-top-control>a").css("display","inline-block")
            })
            .on("ifUnchecked",function(){
                $("#right-list-top-control>a").css("display","none")
            })
            .on("ifClicked",function(){
                if(!$(this).parent().hasClass("checked")){
                    $("#manage-sort-list input[type='checkbox']").not(":checked").iCheck("check");
                }
                else{
                    $("#manage-sort-list input[type='checkbox']").filter(":checked").iCheck("uncheck")

                }
            })
        ;
        $("#manage-sort-list input[type='checkbox']").on("ifChanged",function(){
            if(!$(this).parent().hasClass("checked")){
                MANAGE.totalChecked+=1;
                MANAGE.total_check_listener();
            }
            else{
                MANAGE.totalChecked-=1;
                MANAGE.total_check_listener();
            }
        });
        MANAGE.judge_kpi_count();
        MANAGE.left_count_observable();
        resize_sort_table();
        $("#manage-sort-list li").on("resize",function(){
            resize_sort_table();
        });
        $("#manage-sort-list li").each(function() {
            $(this).find("table tr td").tipsy({
                gravity : 'se'
            });
        });
    }
    function resize_sort_table(){
        var table_size=$("#manage-sort-list li").width()-70;
        $("#manage-sort-list table").width(table_size)
        if(".attribute-position"){
            $("#manage-sort-list .attribute-position").width(table_size+40)
            $("#manage-sort-list .attribute-position>p").width(table_size-180)
        }
    }
    return {
        init:function(option_right_edit,option_right_remove,option_right_drag,type){
            remove_init(option_right_remove.url,type);
            edit_init(option_right_edit.target,option_right_edit.url,option_right_edit.complete,option_right_edit.edit_check,type);
            drag_init(option_right_drag.url,option_right_drag.drag_complete_post,type);
            initial();
            if($("#user-edit").length>0){
                var right_content_height=$("#manage-left-content").height(),
                    list_height=$("#manage-right-content .manage-right-list").height()+58,
                    height=right_content_height>list_height?right_content_height:list_height;
                $("#user-edit").height(height);
                $("body").on("resize",function(){
                    $("#user-edit").height(height);
                })
            }
        },
        refresh:function(){
            iCheck.init();
            initial();
        }
    }
})
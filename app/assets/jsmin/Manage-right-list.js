function category_item_remove(){this.url="/kpis/"}function group_item_remove(){this.url="/users/"}function department_item_remove(){this.url="../entities/"}function manage_item_remove(){confirm(I18n.t("manage.base.delete_confirm"))&&$("#manage-sort-list :checked").each(function(){var id=$(this).parent().parent().attr("id");MANAGE[MANAGE.type].item_remove.remove_complete(id),"group"==MANAGE.type&&"0px"!=$("#user-edit").css("left")&&($("#user-edit").css("left","-250px"),$("#manage-right-content").css("padding-left","0px"),MANAGE.user.user_add_clear()),"category"==MANAGE.type&&"false"==$(this).attr("is_calculated")&&($("#is-calcu-relate").find("[value='"+id+"']").remove(),$("#is-calcu-relate").val("").trigger("chosen:updated"))})}function category_item_edit(){this.edit_target="manage-kpi-target",this.url="/kpis",this.complete=function(option){$.ajax({url:this.url,type:"PUT",data:{kpi:{id:option.id,target_max:option.target_max,target_min:option.target_min}},success:function(){$("#"+option.id+" .manage-kpi-target").eq(0).find(".can-change").text(option.target_max).attr("title",option.target_max),$("#"+option.id+" .manage-kpi-target").eq(1).find(".can-change").text(option.target_min).attr("title",option.target_min),$("#"+option.id+" .manage-kpi-target").each(function(){$(this).find("input").css("left","-999em")})}}),$("#manage-sort-list").find(".can-change").tipsy({gravity:"se"})},this.edit_check=function(object){clearNoNumZero(object)}}function manage_item_edit(){MANAGE[MANAGE.type].item_edit.edit_show()}function category_item_drag(){this.url="/kpis",this.drag_complete_post=function(id,belong){var option={id:id,belong:belong};$.ajax({url:this.url,type:"PUT",data:{kpi:{id:option.id,kpi_category_id:option.belong}},success:function(){MANAGE.item_drag.prototype.drag_complete(option.id)}})}}function group_item_drag(){this.url="/users",this.drag_complete_post=function(id,belong){console.log(id,belong);var option={id:id,belong:belong};$.ajax({url:this.url,type:"PUT",data:{id:option.id,user:{role_id:option.belong}},success:function(){MANAGE.item_drag.prototype.drag_complete(option.id)}})}}MANAGE=MANAGE||{},MANAGE.category=MANAGE.category||{},MANAGE.group=MANAGE.group||{},MANAGE.entity=MANAGE.entity||{},MANAGE.department=MANAGE.department||{},MANAGE.item_remove=function(){},MANAGE.item_edit=function(){},MANAGE.item_drag=function(){},MANAGE.totalChecked=0,MANAGE.item_remove.prototype={constructor:MANAGE.item_remove,remove_complete:function(id){$.ajax({url:this.url+id,type:"DELETE",success:function(data){data.result?($("#manage-sort-list").find("#"+id).remove(),MANAGE.totalChecked-=1,total_check_listener(),MANAGE.judge_kpi_count()):MessageBox(data.content,"top","warning")}})}},category_item_remove.prototype=MANAGE.item_remove.prototype,category_item_remove.prototype.constructor=category_item_remove,MANAGE.category.item_remove=new category_item_remove,group_item_remove.prototype=MANAGE.item_remove.prototype,group_item_remove.prototype.constructor=group_item_remove,MANAGE.group.item_remove=new group_item_remove,department_item_remove.prototype=MANAGE.item_remove.prototype,department_item_remove.prototype.constructor=department_item_remove,MANAGE.department.item_remove=new department_item_remove,MANAGE.item_edit.prototype={constructor:MANAGE.item_edit,edit_show:function(){var text,target=this.edit_target;MANAGE.edit_array=[],$("#manage-sort-list :checked").each(function(){var i,length=$(this).parent().next().find("."+target).length;for(i=0;length>i;i++)text=$(this).parent().next().find("."+target).eq(i).find(".can-change").text(),$(this).parent().next().find("input[type='text']").eq(i).css("left","0px").val(text)})}},MANAGE.edit_array=[],category_item_edit.prototype=MANAGE.item_edit.prototype,category_item_edit.prototype.constructor=category_item_edit,MANAGE.category.item_edit=new category_item_edit,MANAGE.item_drag.prototype={constructor:MANAGE.item_drag,drag_complete:function(id){$("#manage-sort-list").find("#"+id).find("input[type='checkbox']").prop("checked")&&(MANAGE.totalChecked-=1,total_check_listener(),MANAGE.judge_kpi_count()),$("#manage-sort-list").find("#"+id).remove(),$("#manage-sort-list").find(".sortable-placeholder").remove()}},category_item_drag.prototype=MANAGE.item_drag.prototype,category_item_drag.prototype.constructor=category_item_drag,MANAGE.category.item_drag=new category_item_drag,group_item_drag.prototype=MANAGE.item_drag.prototype,group_item_drag.prototype.constructor=group_item_drag,MANAGE.group.item_drag=new group_item_drag;
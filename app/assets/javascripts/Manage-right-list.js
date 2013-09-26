/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-9
 * Time: 下午5:33
 * To change this template use File | Settings | File Templates.
 */
MANAGE=MANAGE || {};
MANAGE.category=MANAGE.category || {};
MANAGE.group=MANAGE.group || {};
MANAGE.entity=MANAGE.entity || {};
MANAGE.item_remove=function(){};
MANAGE.item_edit=function(){};
MANAGE.item_drag=function(){};
MANAGE.totalChecked=0;

///////////////////////////////////////////////////////////////////////////////////////////////////////   item remove
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.item_remove.prototype={
    constructor:MANAGE.item_remove,
    remove_complete:function(id){
//        $("#manage-sort-list").find("#"+id).remove();
        $.ajax({
            url : this.url + id,
            type : 'DELETE',
            success : function(data) {
                if(data.result) {
                    $("#manage-sort-list").find("#"+id).remove();
                    MANAGE.totalChecked-=1;
                    total_check_listener();
                    MANAGE.judge_kpi_count();
                } else {
                    MessageBox(data.content,"top","warning");
                }
            }
        });
    }
}
function category_item_remove(){
    this.url='/kpis/';
}
category_item_remove.prototype=MANAGE.item_remove.prototype;
category_item_remove.prototype.constructor=category_item_remove;
MANAGE.category.item_remove=new category_item_remove();

function group_item_remove(){
    this.url='/users/';
}
group_item_remove.prototype=MANAGE.item_remove.prototype;
group_item_remove.prototype.constructor=group_item_remove;

MANAGE.group.item_remove=new group_item_remove();

function manage_item_remove(){
    if(confirm(I18n.t('view.manage.base.delete_confirm'))){
        $("#manage-sort-list :checked").each(function(){
            var id=$(this).parent().parent().attr("id");
            MANAGE[MANAGE.type].item_remove.remove_complete(id);
//            MANAGE.totalChecked-=1;
//            total_check_listener();
            if(MANAGE.type=="group" && $("#user-edit").css("left")!="-50px"){
                $("#user-edit").css("left","-50px");
                $("#manage-right-content").css("left","150px");
                MANAGE.user.user_add_clear();
            }
        });
//        MANAGE.judge_kpi_count();
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////   item edit
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.item_edit.prototype={
    constructor:MANAGE.item_edit,
    edit_show:function(){
        var text;
        var target=this.edit_target;
        $("#manage-sort-list :checked").each(function(){
            text=$(this).parent().next().find("."+target+">.can-change").text();
            $(this).parent().next().find("input[type='text']").css("display","block").val(text);
        });
    }
}
function category_item_edit(){
    this.edit_target="manage-kpi-target";
    this.url='/kpis';
    this.complete=function(option){
        $.ajax({
            url : this.url,
            type : 'PUT',
            data : {
                kpi : {
                    id : option.id,
                    target : option.target
                }
            },
            success : function(data) {
                option.edit_input.prevAll(".can-change").text(option.target).attr("title",option.target);
                option.edit_input.css("display","none");
            }
        });
//        option.edit_input.prevAll(".can-change").text( option.target );
//        option.edit_input.css("display","none");
    },
    this.edit_check=function(object){
         clearNoNumZero(object);
    } ;
}
category_item_edit.prototype=MANAGE.item_edit.prototype;
category_item_edit.prototype.constructor=category_item_edit;

MANAGE.category.item_edit=new category_item_edit();



function manage_item_edit(){
    MANAGE[MANAGE.type].item_edit.edit_show();
}
///////////////////////////////////////////////////////////////////////////////////////////////////////   item drag
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.item_drag.prototype={
    constructor:MANAGE.item_drag,
    drag_complete:function(id){
        if($("#manage-sort-list").find("#"+id).find("input[type='checkbox']").prop("checked")){
            MANAGE.totalChecked-=1;
            total_check_listener();
            MANAGE.judge_kpi_count();
        }
        $("#manage-sort-list").find("#"+id).remove();
        $("#manage-sort-list").find(".sortable-placeholder").remove();
    }

}
function category_item_drag(){
    this.url='/kpis';
    this.drag_complete_post=function(id,belong){
        var option={
            id:id,
            belong:belong,
            target:$("#"+id).find(".can-change").text()
        }
        $.ajax({
            url : this.url,
            type : 'PUT',
            data : {
                kpi : {
                    id : option.id,
                    kpi_category_id : option.belong,
                    target : option.target
                }
            },
            success : function(data) {
                MANAGE.item_drag.prototype.drag_complete(option.id);
            }
        });
//        this.drag_complete(id);
    }
}
category_item_drag.prototype=MANAGE.item_drag.prototype;
category_item_drag.prototype.constructor=category_item_drag;

MANAGE.category.item_drag=new category_item_drag();




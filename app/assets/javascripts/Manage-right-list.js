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

function manage_item_remove(){
    if(confirm("Confirm to delete")){
        $("#manage-sort-list :checked").each(function(){
            var id=$(this).parent().parent().attr("id");
            MANAGE[MANAGE.type].item_remove.remove_complete(id);
            MANAGE.totalChecked-=1;
            total_check_listener();
        })
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
                option.edit_input.prevAll(".can-change").text( option.target );
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
    $("#manage-sort-list table").find("input[type='text']").on("keydown",function(event){
        var e = adapt_event(event).event;
        if(e.keyCode==13){
            var option={
                id:$(e.target).attr("effect_on"),
                belong:$("#manage-left-menu li.active").attr("number"),
                target:$(e.target).val(),
                edit_input:$(e.target)
            }
            MANAGE[MANAGE.type].item_edit.complete(option)
        }
        else if(e.keyCode==27){
            $(e.target).css("display","none");
        }
    }).on("keyup",function(event){
            var e = adapt_event(event).event;
            if(MANAGE[MANAGE.type].item_edit.edit_check){
                MANAGE[MANAGE.type].item_edit.edit_check(e.target);
            }
    });
}
///////////////////////////////////////////////////////////////////////////////////////////////////////   item drag
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.item_drag.prototype={
    constructor:MANAGE.item_drag,
    drag_complete:function(id){
        if($("#manage-sort-list").find("#"+id).find("input[type='checkbox']").prop("checked")){
            MANAGE.totalChecked-=1;
            total_check_listener();
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
                this.drag_complete(option.id);
            }
        });
//        this.drag_complete(id);
    }
}
category_item_drag.prototype=MANAGE.item_drag.prototype;
category_item_drag.prototype.constructor=category_item_drag;

MANAGE.category.item_drag=new category_item_drag();




/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-9
 * Time: 下午5:33
 * To change this template use File | Settings | File Templates.
 */
MANAAGE=MANAGE || {};
MANAGE.category=MANAGE.category || {};
MANAGE.group=MANAGE.group || {};
MANAGE.entity=MANAGE.entity || {};
MANAGE.item_remove=function(){};
MANAGE.item_edit=function(){};
MANAGE.totalChecked=0;


///////////////////////////////////////////////////////////////////////////////////////////////////////   item remove
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
MANAGE.item_remove.prototype={
    constructor:MANAGE.item_remove,
    remove_complete:function(id){
        $("#manage-sort-list").find("#"+id).remove();
//        $.ajax({
//            url : this.url + id,
//            type : 'DELETE',
//            success : function(data) {
//                if(data.result) {
//                    $("#manage-sort-list").find("#"+id).remove();
//                } else {
//                    MessageBox(data.content,"top","warning");
//                }
//            }
//        });
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
    },
    edit_complete:function(option){
//        $.ajax({
//            url : this.url,
//            type : 'PUT',
//            data : {
//                kpi : {
//                    id : option.id,
//                    kpi_category_id : option.belong,
//                    target : option.target
//                }
//            },
//            success : function(data) {
//                return true
//            }
//        });
        return true
    }
}
function category_item_edit(){
    this.edit_target="manage-kpi-target";
    this.url='/kpis';
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
                belong:$("#manage-left-menu li.active").find("a").text(),
                target:$(e.target).val()
            }
            if( MANAGE[MANAGE.type].item_edit.edit_complete(option) ){
                $(e.target).prevAll(".can-change").text( option.target );
                $(e.target).css("display","none");
            }
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
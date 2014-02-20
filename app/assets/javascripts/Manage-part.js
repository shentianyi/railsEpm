/**
 * Created with JetBrains RubyMine.
 * User: wayne
 * Date: 14-2-19
 * Time: 上午9:56
 * To change this template use File | Settings | File Templates.
 */
var TREE=TREE||{};
(function(){
    $("body")
        //点击部门
        .on("click","#tree .entity_root>a,#tree .im-entities>a",function(){
            TREE.part_show(this);
            var $this=$(this);
            $this.toggleClass("open");
            if($this.hasClass("open")){
                $this.next().css("display","block");
                $this.nextAll("ul").children("li").filter(function(index){
                    if($(this).hasClass("im-entities")){
                         return false;
                    }
                    else{
                        return true;
                    }
                }).css("display","block");
                $("[chosen=one]").click();
                $this.attr("chosen","one");
            }
            else{
                $this.next().css("display","none");
                $this.nextAll("ul").children("li").filter(function(index){
                    if($(this).hasClass("im-entities")){
                        return false;
                    }
                    else{
                        return true;
                    }
                }).css("display","none");
                $this.attr("chosen","");
                TREE.destroyUserBlock();
            }
        })
        .on("dblclick","#part-info .basic dd",function(){
            var value=$(this).text();
            $(this).empty().append($("<input type='text' />").val(value));
            $(this).find("input").focus();
        })
        .on("blur","#part-info .basic dd input",function(){
            var value=$(this).val(),
                post_name=$(this).parent().attr("post");
            $(this).parent().empty().text(value);
        })
        .on("keyup","#part-info .basic dd input",function(event){
            var e=adapt_event(event).event;
            if(e.keyCode==13){
                $(this).blur();
            }
        })
        //点击观察点
        .on("click","#tree .entity_root>ul li p",function(){
            var id=$(this).parent().attr("entities");
            if(confirm("删除该观察点？")){

            }
        })
        //点击添加部门
        .on("click","#tree .add-block .add-block-part",function(event){
            var $this=$(this),
                x=$this.offset().left,
                y=$this.offset().top;;
            TREE.getUserBlock(x,y);
            $("#user-block").find("input").focus();
        })
        .on("click","#user-block .add",function(){

        })
        .on("click","#user-block .cancel",function(){
            TREE.destroyUserBlock();
        })
        .on("keyup","#user-block input",function(event){
            var e=adapt_event(event).event;
            if(e.keyCode==13){
               $("#user-block .add").click();
            }
            else if(e.keyCode==27){
                $("#user-block .cancel").click();
            }
        })
        //添加观察点
        .on("click","#tree .add-block .add-block-entity",function(){
            TREE.getEntity();
        })
        .on("click","#add-entity .icon-remove",function(){
            TREE.destroyEntity();
        })
    ;
    $(document).ready(function(){
        var roots = $("#hidden-entity li");
        for(var i = 0;i<roots.length;i++){
            getEntities(roots.eq(i).attr("entity"));
            getChild(roots.eq(i).attr("entity"));
        }
        TREE.part_show(".entity_root>a");
        TREE.getInfoHeight();
    });
    $(window).resize(function(){
        TREE.getInfoHeight();
    })
})();
function getEntities(id){
    $.ajax({
        url:'/departments/sub_entities',
        type:'GET',
        data:{id:id},
        dataType:'json',
        success:function(data){
            //append a new entity to the entity group
            if(data.result){
                var childs = data.content.subents;
                var id = data.content.id;

                if($("li[entity_group="+id+"]").has("ul").length < 1){
                    $("li[entity_group="+id+"]").append("<ul />");
                }
                for(var i = 0;i<childs.length;i++){
                    $('<li style="display:none" entities="'+childs[i].id+'"><p>'+childs[i].name+'</li>').appendTo($("li[entity_group="+id+"] ul"));
                }
            }
        }
    });
}

function getChild(id){
    $.ajax({
        url:'/departments/sub_departments',
        type:'GET',
        data:{id:id},
        dataType:'json',
        success:function(data){
            if(data.result){
                var childs = data.content.subdeps;
                var id = data.content.id;
                if($("li[entity_group="+id+"]").has("ul").length < 1){
                    $("li[entity_group="+id+"]").append("<ul />");
                }
                for(var i = 0;i<childs.length;i++){
                    $('<li class="im-entities" entity_group="'+childs[i].id+'"><a><i class="icon-laptop"></i> '+
                        childs[i].name+'</a>'+
                        '<div class="add-block"><label class="add-block-part"><i class="icon-plus-sign"></i> 添加部门</label>'+
                        '<label class="add-block-entity"><i class="icon-plus-sign"></i> 添加观察点</label>'+
                        '</div>'+
                        '</li>').appendTo($("li[entity_group="+id+"] ul")).ready(function(){getChild(childs[i].id);getEntities(childs[i].id)});
                }

            }
        }
    });
}
//TREE.hover=function(){
//    $("#tree .entity_root>ul").hover(
//        function(){$(this).prev().css("display","block")},
//        function(){$(this).prev().css("display","none")}
//    );
//    $("#tree .entity_root>a").hover(
//        function(){
//            $(this).next().css("display","block")
//        },
//        function(){$(this).next().css("display","none")}
//    );
//    $("#tree .add-block").hover(
//        function(){$(this).css("display","block")},
//        function(){$(this).css("display","none")}
//    );
//}
TREE.part_show=function(object){
//    $("#part-info section").filter(function(index){return index!==0?true:false}).css("display","block");
    var option={},
        id=$(object).attr("entity_group");
    var name=$(object).text();
//    $.get("",{},function(data){
//        if(data.result){
//
//        }
//        else{
//            MessageBox(data.content,"top","warning");
//        }
//    })
    $("#part-info .basic .name").text(name);
}
TREE.part_hide=function(){
//    $("#part-info section").filter(function(index){return index!==0?true:false}).css("display","none");
}
TREE.getInfoHeight=function(){
    var height=$(document).height()-$("header").height();
    $("#part-info").height(height);
    $("#add-entity").height(height);
}

TREE.getUserBlock=function(x,y){
    $("#user-block").css("left",x-70+"px").css("top",y+"px");
}
TREE.destroyUserBlock=function(){
    $("#user-block").css("left","-999em")
        .find("input").val("");
}

TREE.getEntity=function(){
    $("#add-entity").css("left","0px");
}
TREE.destroyEntity=function(){
    $("#add-entity").css("left","-20%");
}




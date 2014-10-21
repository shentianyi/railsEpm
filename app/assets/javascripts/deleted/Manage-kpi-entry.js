var MANAGE = MANAGE || {};
MANAGE.entry = {};
MANAGE.entry.init = function(){
//    $("div.text").hide();
//    $("body")
//        .on("click",".show-entry-detail",function(){
//            var id = $(this).attr("id");
//            var $target = $("li#"+id).find(".box");
//            var interval=$("#entry-left-menu li.active").attr("interval"),
//                date=$("#entry-date-picker").val(),entry_at,d=standardParse(date).date;
//            if(interval=="200"){
//                entry_at=new Date(d.setDate(d.getDate()- d.getDay()+1)).toISOString();
//            }
//            else if(interval=="400"){
//                entry_at=new Date(d.setMonth(Math.floor(d.getMonth()/3)*3)).toISOString();
//            }
//            else{
//                entry_at=standardParse(date).date.toISOString()
//            }
//            $.ajax({
//                url:"/kpi_entries/details",
//                type:'POST',
//                data:{user_kpi_item_id:id,parsed_entry_at:entry_at},
//                dataType:'html',
//                success : function(data){
//                    $target.html(data);
//                    $target.slideDown("slow");
//                    $target.addClass("down");
//                }
//            });
//        })
//        .on("click",".box .icon-remove",function(event){
//            stop_propagation(event);
//            var $target = $(this);
//            var id = $(this).attr("target");
//            $.ajax({
//                url:"/kpi_entries/"+id,
//                data:{id:id},
//                dataType:"json",
//                type:"DELETE",
//                success:function(data){
//                    if(data.result){
//                        $target.parent().parent().remove();
//                        $("input[user_kpi_item_id="+data.content.item_id+"]").val(data.content.value);
//                        MessageBox(I18n.t('entry.desc.del-success'),top,"success");
//                    }
//                    else{
//                        MessageBox(data.content,top,"warning");
//                    }
//                }
//            });
//        })
//        .on("click",function(){
//           $("#entry-sort-list").find(".box").slideUp("slow");
//        })
//    ;
}

//MANAGE.entry.show_detail = function(){
//    $(this).parent("li").child("div.text").slideToggle("slow");
//}
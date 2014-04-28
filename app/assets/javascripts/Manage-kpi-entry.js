var MANAGE = MANAGE || {};
MANAGE.entry = {};
MANAGE.entry.init = function(){
    $("div.text").hide();
    $("body")
        .on("click",".show-entry-detail",function(){
            var id = $(this).attr("id");
            var $target = $("li#"+id).find(".box");
            //if($target.hasClass("down")){
            //    $target.removeClass("down");
            //    return;
            //}

            var interval=$("#entry-left-menu li.active").attr("interval"),
                date=$("#entry-date-picker").val(),entry_at,d=standardParse(date).date;
            if(interval=="200"){
                entry_at=new Date(d.setDate(d.getDate()- d.getDay()+1)).toISOString();
            }
            else if(interval=="400"){
                entry_at=new Date(d.setMonth(Math.floor(d.getMonth()/3)*3)).toISOString();
            }
            else{
                entry_at=standardParse(date).date.toISOString()
            }
        

            $.ajax({
                url:"/kpi_entries/details",
                type:'POST',
                data:{user_kpi_item_id:id,parsed_entry_at:entry_at},
                dataType:'html',
                success : function(data){
                    $target.html(data);
                    $target.slideDown("slow");
                    $target.addClass("down");
                }
            });
        })
        .on("click",".box .icon-remove",function(event){
           stop_propagation(event);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////  在这里写detail 点击删除的事件
        })
        .on("click",function(){
           $("#entry-sort-list").find(".box").slideUp("slow");
        })
    ;
}

MANAGE.entry.show_detail = function(){
    $(this).parent("li").child("div.text").slideToggle("slow");
}
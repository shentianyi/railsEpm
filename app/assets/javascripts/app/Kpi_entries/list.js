define(["jquery","base","./share","sparkline"],function($,Base,Share,Sparkline){
    function show_detail(){
        $(this).parent("li").child("div.text").slideToggle();
    }

    $("div.text").hide();
    $("body")
        .on("keyup",".entry-actual",function(event){
            var object=Base.adapt_event(event).target;
            Base.clearNoNumZero(object);
        })
        .on("keydown",".entry-actual",function(event){
            var e=Base.adapt_event(event).event;
            if(e.keyCode==13){
                $(e.target).blur();
            }
        })
        .on("blur",".entry-actual",function(event){
            var e=Base.adapt_event(event).event,
                interval=$("#entry-left-menu li.active").attr("interval"),
                date=$("#entry-date-picker").val(),entry_at,d=Base.standardParse(date).date;
            if(interval=="200"){
                entry_at=new Date(d.setDate(d.getDate()- d.getDay()+1)).toISOString();
            }
            else if(interval=="400"){
                entry_at=new Date(d.setMonth(Math.floor(d.getMonth()/3)*3)).toISOString();
            }
            else{
                entry_at=Base.standardParse(date).date.toISOString()
            }
            var kpi_id=$(e.target).attr("user_kpi_item_id"),value=$(e.target).val();
            $.ajax({
                url:"/kpi_entries",
                type:'POST',
                data:{
                    user_kpi_item_id:kpi_id,
                    entry_at:entry_at,
                    value:value,
                    kpi_id:$(e.target).attr("kpi_id")
                },
                success:function(data){
                    if(data.result){
                        var length=Share.recent_array[kpi_id].length,
                            $target=$("#"+kpi_id).find(".kpi-entry-trend");
                        Share.recent_array[kpi_id][length-1]=value;
                        Sparkline.bar($target,Share.recent_array[kpi_id])
                    }
                    else{
                        Base.MessageBox(data.content,"top","warning");
                    }
                }
            });
        })
        .on("click",".show-entry-detail",function(){
            var id = $(this).attr("id");
            var $target = $("li#"+id).find(".box");
            var interval=$("#entry-left-menu li.active").attr("interval"),
                date=$("#entry-date-picker").val(),entry_at,d=Base.standardParse(date).date;
            if(interval=="200"){
                entry_at=new Date(d.setDate(d.getDate()- d.getDay()+1)).toISOString();
            }
            else if(interval=="400"){
                entry_at=new Date(d.setMonth(Math.floor(d.getMonth()/3)*3)).toISOString();
            }
            else{
                entry_at=Base.standardParse(date).date.toISOString()
            }
            $.ajax({
                url:"/kpi_entries/details",
                type:'POST',
                data:{user_kpi_item_id:id,parsed_entry_at:entry_at},
                dataType:'html',
                success : function(data){
                    $target.html(data);
                    $target.slideDown();
                    $target.addClass("down");
                }
            });
        })
        .on("click",".box .icon-remove",function(event){
            Base.stop_propagation(event);
            var $target = $(this);
            var id = $(this).attr("target");
            $.ajax({
                url:"/kpi_entries/"+id,
                data:{id:id},
                dataType:"json",
                type:"DELETE",
                success:function(data){
                    if(data.result){
                        $target.parent().parent().remove();
                        $("input[user_kpi_item_id="+data.content.item_id+"]").val(data.content.value);
                        Base.MessageBox(I18n.t('entry.desc.del-success'),top,"success");
                    }
                    else{
                        Base.MessageBox(data.content,top,"warning");
                    }
                }
            });
        })
        .on("click",function(){
            $("#entry-sort-list").find(".box").slideUp();
        })
    ;
})
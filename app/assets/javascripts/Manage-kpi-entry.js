var MANAGE = MANAGE || {};
MANAGE.entry = {};
MANAGE.entry.init = function(){
    $("div.text").hide();
    $("a.show-entry-detail").click(function(){
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
        var id = $(this).attr("id");

        $.ajax({
            url:"/kpi_entries/details",
            type:'POST',
            data:{user_kpi_item_id:id,parsed_entry_at:entry_at},
            dataType:"json",
            success:function(result){
                //var target = $("li#"+id).children("div.box").children(".text");
                //target.innerHTML = data;
                //target.html(result);
                //target.slideToggle("slow");
                $("li#"+id).children("div.box").children(".text").slideToggle("slow");
            }
        });
    });
}

MANAGE.entry.show_detail = function(){
    $(this).parent("li").child("div.text").slideToggle("slow");
}
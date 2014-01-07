/**
 * Created with JetBrains WebStorm.
 * User: wayne
 * Date: 13-9-16
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
var ENTRY=ENTRY || {};
ENTRY.datepicker={};





ENTRY.init=function(){
   $("#entry-date-picker").val(new Date().toWayneString()[$("#entry-left-menu li.active").attr("show_section")]);
   ENTRY.datepicker.init();
   ENTRY.datepicker.extra_convert($("#entry-left-menu li.active").attr("interval"));
   ENTRY.resize_sort_table();
   $("#entry-sort-list li").on("resize",function(){
        ENTRY.resize_sort_table()
   });
   $("body").on("keyup",".entry-actual",function(event){
       var object=adapt_event(event).target;
       clearNoNumZero(object);
   }).on("keydown",".entry-actual",function(event){
       var e=adapt_event(event).event;
       if(e.keyCode==13){
           $(e.target).blur();
       }
   }).on("blur",".entry-actual",function(event){
           var e=adapt_event(event).event,
               actual= $(e.target).val(),
               interval=$("#entry-left-menu li.active").attr("interval"),
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
           var kpi_id=$(e.target).attr("user_kpi_item_id"),value=$(e.target).val();
               $.ajax({
                  url:"/kpi_entries/entry",
                  type:'POST',
                  data:{
                      user_kpi_item_id:kpi_id,
                      entry_at:entry_at,
                      value:value,
                      kpi_id:$(e.target).attr("kpi_id")
                  },
                  success:function(data){
                      if(data.result){
                          var length=ENTRY.recent_array[kpi_id].length,colorMap=[],i;
                          ENTRY.recent_array[kpi_id][length-1]=value;
                          $target=$("#"+kpi_id).find(".kpi-entry-trend");
                          for(i=0;i<length;i++){
                              colorMap.push("#5FA9DA");
                          }
                          colorMap[length-1]="#F5A133";
                          $target.sparkline(ENTRY.recent_array[kpi_id], { type: 'bar',chartRangeMin:0,colorMap:colorMap,barWidth:"6px"});
                      }
                      else{
                          MessageBox(data.content,"top","warning");
                      }
                  }
               });
   });
   //上传kpi
   $("body")
       .on("click","#upload-kpi-btn",function(){
           $("#upload-kpi").css("left","0px").css("right","0px");
       })
       .on("click","#upload-kpi-close",function(){
           var $upload=$("#upload-kpi");
           $upload.css("left","-999em").css("right","auto");
           $upload.find(".upload-file p").remove();
       })
       .on("click","#upload-kpi-finish",function(){
           $("#upload-kpi-close").click();
       })
}

ENTRY.datepicker.init=function(){
    var interval=$("#entry-left-menu li.active").attr("interval");
    if(interval=="90"){
        $("#entry-date-picker").datetimepicker().on("changeDate", function () {
            ENTRY.datepicker.post();
        });
    }
    else{
        $("#entry-date-picker").datepicker().on("changeDate", function () {
            if (interval == "200") {
                var week = $(".datepicker").find(".active").prevAll(".cw").text();
                $("#entry-date-extra").text("Week: " + week).css("left","127px");
            }
            else if (interval == "400") {
                var quarter = new Date($(this).val()).monthToQuarter();
                $("#entry-date-extra").text("Quarter: " + quarter);
            }
            ENTRY.datepicker.post();
        });
    }
    new DATE_PICKER[interval]("#entry-date-picker").datePicker();
    var entry=new ENTRY.datepicker[interval]();
    $("#entry-minus").on("click",function(){
        if($("#entry-date-picker").val().length>0){
            var target=$("#entry-date-picker").val();
            $("#entry-date-picker").val(entry.minus(target));
            if(interval!="90"){
                $("#entry-date-picker").datepicker("update",entry.minus(target));
            }
            ENTRY.datepicker.extra_convert(interval);
            ENTRY.datepicker.post()
        }
    });

    $("#entry-plus").on("click",function(){
        if($("#entry-date-picker").val().length>0){
            var target=$("#entry-date-picker").val();
            $("#entry-date-picker").val(entry.plus(target));
            if(interval!="90"){
                $("#entry-date-picker").datepicker("update",entry.plus(target));
            }
            ENTRY.datepicker.extra_convert(interval);
            ENTRY.datepicker.post();
        }
    });
}
ENTRY.datepicker.extra_convert=function(interval){
    var target=$("#entry-date-picker").val();
    if(interval=="200"){
        var week=standardParse(target).date.toWeekNumber();
        $("#entry-date-extra").text("Week: " + week);
    }
    else if(interval=="400"){
        var quarter=standardParse(target).date.monthToQuarter();
        $("#entry-date-extra").text("Quarter: " + quarter);
    }
};
ENTRY.datepicker["90"]=function(){;
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setHours(d.getHours()-1)).toWayneString().hour;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setHours(d.getHours()+1)).toWayneString().hour;
        return new_d
    }
}
ENTRY.datepicker["100"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setDate(d.getDate()-1)).toWayneString().day;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setDate(d.getDate()+1)).toWayneString().day;
        return new_d
    }
}
ENTRY.datepicker["200"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setDate(d.getDate()-7)).toWayneString().day;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setDate(d.getDate()+7)).toWayneString().day;
        return new_d
    }
}
ENTRY.datepicker["300"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setMonth(d.getMonth()-1)).toWayneString().month;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setMonth(d.getMonth()+1)).toWayneString().month;
        return new_d
    }
}
ENTRY.datepicker["400"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setMonth(d.getMonth()-3)).toWayneString().month;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setMonth(d.getMonth()+3)).toWayneString().month;
        return new_d
    }
}
ENTRY.datepicker["500"]=function(){
    this.minus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setFullYear(d.getFullYear()-1)).toWayneString().year;
        return new_d
    };
    this.plus=function(target){
        var d=standardParse(target).date;
        var new_d=new Date(d.setFullYear(d.getFullYear()+1)).toWayneString().year;
        return new_d
    }
}
ENTRY.datepicker.post=function(){
    var interval=$("#entry-left-menu li.active").attr("interval");
    var date_original=$("#entry-date-picker").val();
    var post_date=HIGH_CHART.postPrepare(date_original,interval);

    $.ajax({
        url:'../kpi_entries/refresh_entry',
        type:'post',
        data:{
            f:$('#kpi-type-hidden').val(),
            date:post_date.toISOString()
        },
        dataType:"html",
        success:function(data){
            $("#entry-sort-list").html(data);
            ENTRY.resize_sort_table();
            $("#entry-sort-list li").on("resize",function(){
                ENTRY.resize_sort_table()
            });
            $("#entry-sort-list td").tipsy({gravity: 'se'});
            ENTRY.trend(post_date);
        }
    });

}
ENTRY.trend=function(post_date){
    var i,kpi_count=$("#entry-sort-list").children().length,kpi_id,ids=[];
    for(i=0;i<kpi_count;i++){
        kpi_id=$("#entry-sort-list").children().eq(i).attr("id");
        ids.push(kpi_id);
    }
    if(kpi_count>0){
        $.get(
            "../kpi_entries/recents",
            {
                ids:ids,
                time:Date.parse(post_date)
            },
            function(data){
                for(var j=0;j<data.length;j++){
                    ENTRY.trend_form(data[j].id,data[j].values)
                }
            }
        )
    }
}
ENTRY.trend_form=function(id,values){
    var colorMap=[], i,length=values.length+1,complete_value=[],
        current_value=$("#"+id).find(".entry-actual").val().length>0?$("#"+id).find(".entry-actual").val():0;
    $target=$("#"+id).find(".kpi-entry-trend");
    for(i=0;i<length;i++){
        colorMap.push("#5FA9DA");
    }
    colorMap[length-1]="#F5A133";
    complete_value=deepCopy(complete_value,values);
    complete_value.push(current_value);
    $target.sparkline(complete_value, { type: 'bar',chartRangeMin:0,colorMap:colorMap,barWidth:"6px"});
    ENTRY.recent_array[id]=complete_value;
};
ENTRY.resize_sort_table=function(){
    var table_size=$("#entry-sort-list li").width()*0.97;
    $("#entry-sort-list table").width(table_size)
}
ENTRY.recent_entry={
    "90":function(date){
        var new_date=new Date(date.setHours(date.getHours()-1));
        return new_date;
    },
    "100":function(date){
        var new_date=new Date(date.setDate(date.getDate()-1));
        return new_date;
    },
    "200":function(date){
        var new_date=new Date(date.setDate(date.getDate()-7));
        return new_date;
    },
    "300":function(date){
        var new_date=new Date(date.setMonth(date.getMonth()-1));
        return new_date;
    },
    "400":function(date){
        var new_date=new Date(date.setMonth(date.getMonth()-3));
        return new_date;
    },
    "500":function(date){
        var new_date=new Date(date.setFullYear(date.getFullYear()-1));
        return new_date;
    }
}
ENTRY.recent_array={};
var HIGH_CHART=HIGH_CHART || {};
HIGH_CHART.postPrepare=function(begin_time,interval){
    var template=standardParse(begin_time).template;
    switch(interval){
        case "90":
            return new Date(template[0],template[1],template[2],template[3]);
            break;
        case "100":
            return new Date(template[0],template[1],template[2]);
            break;
        case "200":
            if(standardParse(begin_time).date.getDay()==0){
                return new Date(template[0],template[1],+template[2]-6);
            }
            else{
                return new Date(template[0],template[1],+template[2]-standardParse(begin_time).date.getDay()+1);
            }
            break;
        case "300":
            return new Date(template[0],template[1]);
            break;
        case "400":
            return new Date(template[0],Math.floor(+template[1]/3)*3);
            break;
        case "500":
            return new Date(template[0],0);
            break;
    }

}
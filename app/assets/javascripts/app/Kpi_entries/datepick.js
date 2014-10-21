define(["jquery","base","./layout","./share","sparkline","jquery.tipsy"],function($,Base,Layout,Share,Sparkline){
    function extra_convert(interval){
        var target=$("#entry-date-picker").val();
        if(interval=="200"){
            var week=Base.standardParse(target).date.toWeekNumber();
            $("#entry-date-extra").text("Week: " + week);
        }
        else if(interval=="400"){
            var quarter=Base.standardParse(target).date.monthToQuarter();
            $("#entry-date-extra").text("Quarter: " + quarter);
        }
    }
    function postPrepare(begin_time,interval){
        var template=Base.standardParse(begin_time).template;
        switch(interval){
            case "90":
                return new Date(template[0],template[1],template[2],template[3]);
                break;
            case "100":
                return new Date(template[0],template[1],template[2]);
                break;
            case "200":
                if(Base.standardParse(begin_time).date.getDay()==0){
                    return new Date(template[0],template[1],+template[2]-6);
                }
                else{
                    return new Date(template[0],template[1],+template[2]-Base.standardParse(begin_time).date.getDay()+1);
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
    function post(){
        var interval=$("#entry-left-menu li.active").attr("interval");
        var date_original=$("#entry-date-picker").val();
        var post_date=postPrepare(date_original,interval);
        $.ajax({
            url:'/kpi_entries/show',
            type:'get',
            data:{
                f:$('#kpi-type-hidden').val(),
                date:post_date.toISOString()
            },
            dataType:"html",
            success:function(data){
                $("#entry-sort-list").html(data);
                Layout.refresh();
                $("#entry-sort-list td").tipsy({gravity: 'se'});
                trend(post_date);
                $("#entry-sort-list").find("table").css("table-layout","auto");
                window.setTimeout(function(){
                    $("#entry-sort-list").find("table").css("table-layout","fixed");
                },500);
            }
        })
    }
    function trend(post_date){
        var i,kpi_count=$("#entry-sort-list").children().length,kpi_id,ids=[];
        for(i=0;i<kpi_count;i++){
            kpi_id=$("#entry-sort-list").children().eq(i).attr("id");
            ids.push(kpi_id);
        }
        if(kpi_count>0){
            $.get(
                "/kpi_entries/recents",
                {
                    ids:ids,
                    time:Date.parse(post_date)
                },
                function(data){
                    for(var j=0;j<data.length;j++){
                        trend_form(data[j].id,data[j].values)
                    }
                }
            )
        }
    }
    function trend_form(id,values){
        var complete_value=[],
            current_value=$("#"+id).find(".entry-actual").val().length>0?$("#"+id).find(".entry-actual").val(): 0,
            $target=$("#"+id).find(".kpi-entry-trend");
        complete_value=Base.deepCopy(complete_value,values);
        complete_value.push(current_value);
        Sparkline.bar($target,complete_value);
        Share.recent_array[id]=complete_value;
    }
    var ENTRY={
        datepicker:{
            "90":function(){;
                this.minus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setHours(d.getHours()-1)).toWayneString().hour;
                    return new_d
                };
                this.plus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setHours(d.getHours()+1)).toWayneString().hour;
                    return new_d
                }
            },
            "100":function(){
                this.minus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setDate(d.getDate()-1)).toWayneString().day;
                    return new_d
                };
                this.plus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setDate(d.getDate()+1)).toWayneString().day;
                    return new_d
                }
            },
            "200":function(){
                this.minus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setDate(d.getDate()-7)).toWayneString().day;
                    return new_d
                };
                this.plus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setDate(d.getDate()+7)).toWayneString().day;
                    return new_d
                }
            },
            "300":function(){
                this.minus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setMonth(d.getMonth()-1)).toWayneString().month;
                    return new_d
                };
                this.plus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setMonth(d.getMonth()+1)).toWayneString().month;
                    return new_d
                }
            },
            "400":function(){
                this.minus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setMonth(d.getMonth()-3)).toWayneString().month;
                    return new_d
                };
                this.plus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setMonth(d.getMonth()+3)).toWayneString().month;
                    return new_d
                }
            },
            "500":function(){
                this.minus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setFullYear(d.getFullYear()-1)).toWayneString().year;
                    return new_d
                };
                this.plus=function(target){
                    var d=Base.standardParse(target).date;
                    var new_d=new Date(d.setFullYear(d.getFullYear()+1)).toWayneString().year;
                    return new_d
                }
            }
        }
    };

    $("#entry-date-picker").val(new Date().toWayneString()[$("#entry-left-menu li.active").attr("show_section")]);
    var interval=$("#entry-left-menu li.active").attr("interval");
    if(interval==="90"){
        require(["datetimepicker"],function(Datetimepicker){
            Datetimepicker.datetimepicker("#entry-date-picker");
            $("#entry-date-picker").datetimepicker().on("changeDate", function () {
                post();
            })
        })
    }
    else{
        require(["datepicker"],function(Datepicker){
            switch(interval){
                case "100":
                    Datepicker.datepicker_daily("#entry-date-picker");
                    $("#entry-date-picker").datepicker().on("changeDate", function () {
                        post();
                    });
                    break;
                case "200":
                    Datepicker.datepicker_weekly("#entry-date-picker");
                    $("#entry-date-picker").datepicker().on("changeDate", function () {
                        var week = $(".datepicker").find(".active").prevAll(".cw").text();
                        $("#entry-date-extra").text("Week: " + week).css("left","127px");
                        post();
                    });
                    break;
                case "300":
                    Datepicker.datepicker_monthly("#entry-date-picker");
                    $("#entry-date-picker").datepicker().on("changeDate", function () {
                        post();
                    });
                    break;
                case "400":
                    Datepicker.datepicker_quarterly("#entry-date-picker");
                    $("#entry-date-picker").datepicker().on("changeDate", function () {
                        var quarter = new Date($(this).val()).monthToQuarter();
                        $("#entry-date-extra").text("Quarter: " + quarter);
                        post();
                    });
                    break;
                case "500":
                    Datepicker.datepicker_yearly("#entry-date-picker");
                    $("#entry-date-picker").datepicker().on("changeDate", function () {
                        post();
                    });
                    break;
            }
        })
    }
    var entry=new ENTRY.datepicker[interval]();
    $("#entry-minus").on("click",function(){
        if($("#entry-date-picker").val().length>0){
            var target=$("#entry-date-picker").val();
            $("#entry-date-picker").val(entry.minus(target));
            if(interval!="90"){
                $("#entry-date-picker").datepicker("update",entry.minus(target));
            }
            extra_convert(interval);
            post();
        }
    });
    $("#entry-plus").on("click",function(){
        if($("#entry-date-picker").val().length>0){
            var target=$("#entry-date-picker").val();
            $("#entry-date-picker").val(entry.plus(target));
            if(interval!="90"){
                $("#entry-date-picker").datepicker("update",entry.plus(target));
            }
            extra_convert(interval);
            post();
        }
    });
    extra_convert(interval);
    post();
})
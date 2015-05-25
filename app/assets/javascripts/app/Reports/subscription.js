define(["jquery","icheck","mustache"],function($,iCheck,Mustache){
    function flexible(){
        var total_height=$("#wrap-main").height()-$("header").height()-1;
        var height=total_height-$("#report-subscription-header").height()-30-1 ;
        $("#subscription-list").height(height);
    }
    function parse_data(dic){
        dic.active=function(){
            if(this.active_status){
                return "active"
            }
            else{
                return ""
            }
        };
        dic.checked=function(){
            if(this.active_status){
                return "checked"
            }
            else{
                return ""
            }
        }
        var html=Mustache.render('<div class="report-item {{active}}" id="{{id}}">'+
            '<div class="left-part">'+
            '<input type="checkbox" {{checked}}/>'+
            '</div>'+
            '<div class="right-part">'+
            '<p class="name">{{name}} <i class="{{icon}}"></i></p>'+
            '<p class="desc">{{desc}}</p>'+
            '</div>'+
            '</div>',dic);
        return html;
    }
    function add_to_list(dic){
        var html=Mustache.render('<li number="{{id}}">' +
            '<a menu="{{menu}}" href="#{{menu}}">' +
            '<i class="{{icon}} mark"></i> {{name}}<i class="icon-chevron-right indicate"></i>' +
            '</a></li>',dic);
        return html;
    }

    var report_subscription_data=[
        {
            id:0,
            name:"Current Page",
            menu:"current_menu",
            desc:"There are 3 areas in this page, the title block, the index block and the icon block",
            active_status:true,
            icon:"icon-adjust"
        },
        {
            id:1,
            name:"Summary Report",
            desc:"There are 2 blocks in this page, the Plant Summary and Breakdown. There is a grey line between the 2 blocks",
            active_status:true,
            menu:"summary_report",
            icon:"icon-columns"
        },
        {
            id:2,
            name:"Station Data",
            desc:"This page should allow user to choose the period",
            active_status:true,
            menu:"station_data",
            icon:"icon-list"
        },
        {
            id:3,
            name:"Vehicle Information",
            desc:"This is Vehicle Info page",
            active_status:true,
            menu:"vehicle_info",
            icon:"icon-dashboard"
        },
        {
            id:4,
            name:"Defect",
            desc:"This is defect page",
            active_status:true,
            menu:"defects",
            icon:"icon-remove-sign"
        },
        {
            id:5,
            name:"Defect Information",
            desc:"Phase is based on the select category and have the similar field as the defect information ",
            active_status:false,
            menu:"defect_info",
            icon:"icon-plus"
        },
        {
            id:6,
            name:"Float",
            desc:"There are 2 blocks info, the vehicle info and summary info",
            active_status:false,
            icon:"icon-plus",
            menu:"float"
        },
        {
            id:7,
            name:"Daily FTQ",
            desc:"The data block only need one, which is iQ station/Vehicle Total/ NOK vehicle/ OK Vehicle/ FTQ fro the iQ station 1 to 15",
            active_status:true,
            menu:"daily_ftq",
            icon:"icon-bar-chart"
        },
        {
            id:8,
            name:"Daily DPV&SDPV",
            desc:"There are 3 selection condition, one is date",
            active_status:true,
            menu:"daily_dpv",
            icon:"icon-columns"
        },
        {
            id:9,
            name:"Daily KPI tracking",
            desc:"For the selected station, the report page will show the each day’s DPV & FTQ performance in the independent histogram chart.",
            active_status:true,
            menu:"tracking_report",
            icon:"icon-screenshot"
        },
        {
            id:10,
            name:"TOP issue",
            desc:"Search and statistics for high frequency quality issue, more detailed and more accurate",
            active_status:false,
            icon:"icon-plus",
            menu:"top_issue"
        },
        {
            id:11,
            name:"Weekly Report",
            desc:"This page will show the DPV & FTQ data in the chart for 15 iQ stations. The layout is shown as below picture",
            active_status:false,
            icon:"icon-plus",
            menu:"weekly_report"
        }
    ];
    return{
         init:function(){
             flexible();
             $(window).resize(function(){
                 flexible();
             });
             for(var i=0;i<report_subscription_data.length;i++){
                 $("#subscription-list").append(parse_data(report_subscription_data[i]));
             }
             iCheck.init();
             iCheck.if_checked("#subscription-list input[type='checkbox']",function(target){
                 var $parent=target.parents(".report-item").eq(0);
                 $parent.addClass("active");
                 var id=parseInt($parent.attr("id"));
                 $("#my-reports").append(add_to_list(report_subscription_data[id]));
             });
             iCheck.if_unchecked("#subscription-list input[type='checkbox']",function(target){
                 var $parent=target.parents(".report-item").eq(0);
                 $parent.removeClass("active");
                 $("#my-reports").find("[number="+$parent.attr("id")+"]").remove();
             });
             $("body")
                 .on("click","#report-subscription-cancel",function(){
                     window.location.reload();
                 })
             ;
         }
     }
})




